import { expect } from '@playwright/test';
import { voiceOverTest } from '@guidepup/playwright';

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

voiceOverTest.describe('TabList', () => {
  voiceOverTest.beforeEach(async ({ page, voiceOver }) => {
    await page.goto(
      './iframe.html?args=&globals=&id=components-tablist--primary&viewMode=story',
      {
        waitUntil: 'load',
      },
    );
    await expect(page.locator('[role="tablist"]')).toBeVisible();
    await voiceOver.next();
  });

  voiceOverTest.describe(
    'WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver)',
    () => {
      voiceOverTest.describe(
        'AND I use the tab key to move focus to a tab',
        () => {
          voiceOverTest(
            'I HEAR Its label and purpose is clear',
            async ({ voiceOver }) => {
              await voiceOver.press('Tab', {});

              expect(await voiceOver.lastSpokenPhrase()).toContain(
                'Actividades',
              );
            },
          );

          voiceOverTest(
            'I HEAR It identifies itself as a tab',
            async ({ voiceOver }) => {
              await voiceOver.press('Tab', {});

              expect(await voiceOver.lastSpokenPhrase()).toContain('tabulador');
            },
          );

          voiceOverTest(
            'I HEAR It expresses its state (selected/pressed/checked)',
            async ({ voiceOver }) => {
              await voiceOver.press('Tab', {});

              expect(await voiceOver.lastSpokenPhrase()).toContain(
                'seleccionado',
              );
            },
          );
        },
      );
    },
  );
});
