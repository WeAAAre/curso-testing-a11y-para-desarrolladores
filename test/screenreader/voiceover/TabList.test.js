import { expect } from '@playwright/test';
import { voiceOverTest as test } from '@guidepup/playwright';
import { VOICEOVER_RESERVED } from './constants';
const { beforeEach, afterEach, describe } = test;

/*
https://www.magentaa11y.com/web/

2 - Desktop screenreader
- WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
- I use the tab key to move focus to a tab
  - I HEAR Its label and purpose is clear
  - I HEAR It identifies itself as a tab
  - I HEAR It expresses its state (selected/pressed/checked)
- IF TAB ACTIVATION IS MANUAL when I use the left/right arrow keys I HEAR focus moves to other tabs and I use the spacebar or enter key to activate the tab
- IF TAB ACTIVATION IS AUTOMATIC when I use the left/right arrow keys I HEAR the tab is activated
- THEN when I use the tab key I HEAR focus moves to the activated tab panel
*/

describe('TabList', () => {
  afterEach(async ({ voiceOver }) => {
    await voiceOver.stop();
  });

  beforeEach(async ({ page, voiceOver }) => {
    await voiceOver.detect()
    await page.goto(
      './iframe.html?args=&globals=&id=components-tablist--primary&viewMode=story',
      {
        waitUntil: 'domcontentloaded',
      },
    );
    await expect(page.locator('[role="tablist"]')).toBeVisible();
    await page.locator('body').focus();
  });

  describe('WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver)', () => {
    describe('AND I use the tab key to move focus to a tab', () => {
      beforeEach(async ({ voiceOver }) => {
        await voiceOver.press('Tab');
      });

      test('I HEAR Its label and purpose is clear', async ({ voiceOver }) => {
        expect(await voiceOver.lastSpokenPhrase()).toContain(
          await voiceOver.itemText(),
        );
      });

      test('I HEAR It identifies itself as a tab', async ({ voiceOver }) => {
        expect(await voiceOver.lastSpokenPhrase()).toContain(
          VOICEOVER_RESERVED.TAB,
        );
      });

      test('I HEAR It expresses its state (selected/pressed/checked)', async ({
        voiceOver,
      }) => {
        expect(await voiceOver.lastSpokenPhrase()).toContain(
          VOICEOVER_RESERVED.SELECTED,
        );
      });

      describe('THEN when I use the tab key', () => {
        test('I HEAR focus moves to the activated tab panel', async ({
          voiceOver,
        }) => {
          await voiceOver.press('Tab');

          expect(await voiceOver.lastSpokenPhrase()).toContain(
            VOICEOVER_RESERVED.TABPANEL,
          );
        });
      });

      describe('IF TAB ACTIVATION IS AUTOMATIC', () => {
        describe('when I use the left/right arrow keys', () => {
          test('I HEAR the tab is activated', async ({ voiceOver, page }) => {
            await voiceOver.perform(
              voiceOver.keyboardCommands.interactWithItem,
            );
            await page.keyboard.press('ArrowRight');

            const tabpanels = await page
              .getByRole('tabpanel', {
                includeHidden: true,
              })
              .all();
            expect(tabpanels[1]).toBeVisible();
          });
        });
      });
    });
  });
});
