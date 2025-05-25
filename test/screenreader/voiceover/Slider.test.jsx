import { voiceOverTest as test } from '@guidepup/playwright';
import { VOICEOVER_RESERVED } from './constants';
import { expect } from '@playwright/test';
const { beforeEach, afterEach, describe } = test;

/*
https://www.magentaa11y.com/checklist-web/range-slider/

2 - Desktop screenreader
- WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND I use the tab key to move focus to a range slider
    - I HEAR Its purpose is clear
    - I HEAR It identifies itself as a range
    - I HEAR Its label is read with the input
    - I HEAR Its current value
- Then when I use the up/down/left/right arrow keys I HEAR the value is changed one step
*/
describe('Slider', () => {
  afterEach(async ({ voiceOver }) => {
    await voiceOver.stop();
  });

  beforeEach(async ({ page }) => {
    await page.goto(
      './iframe.html?args=&globals=&id=components-slider--primary&viewMode=story',
      {
        waitUntil: 'domcontentloaded',
      },
    );
    await expect(page.getByRole('slider')).toBeVisible();
    await page.locator('body').focus();
  });

  describe('WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver)', () => {
    describe('AND I use the tab key to move focus to a range slider', () => {
      beforeEach(async ({ voiceOver }) => {
        await voiceOver.press('Tab');
      });

      test('I HEAR Its purpose is clear', async ({ voiceOver }) => {
        expect(await voiceOver.lastSpokenPhrase()).toContain(
          await voiceOver.itemText(),
        );
      });

      test('I HEAR It identifies itself as a range', async ({ voiceOver }) => {
        expect(await voiceOver.lastSpokenPhrase()).toContain(
          VOICEOVER_RESERVED.SLIDER,
        );
      });

      test('I HEAR Its label is read with the input', async ({ voiceOver }) => {
        expect(await voiceOver.lastSpokenPhrase()).toContain(
          await voiceOver.itemText(),
        );
      });

      test('I HEAR Its current value', async ({ voiceOver, page }) => {
        const currentValue = await page.getByRole('slider').inputValue();
        expect(await voiceOver.lastSpokenPhrase()).toContain(currentValue);
      });

      test('WHEN I use the left arrow keys I HEAR the value is changed one step', async ({
        voiceOver,
        page,
      }) => {
        const sliderLocator = page.getByRole('slider');
        const originalValue = await sliderLocator.inputValue();
        await voiceOver.perform(voiceOver.keyboardCommands.interactWithItem);
        await voiceOver.press('ArrowDown');

        // min
        expect(await sliderLocator.inputValue()).toBe(originalValue);
      });

      test('WHEN I use the right arrow keys I HEAR the value is changed one step', async ({
        page,
        voiceOver,
      }) => {
        const sliderLocator = page.getByRole('slider');
        const step = await sliderLocator.getAttribute('step');
        const originalValue = await sliderLocator.inputValue();

        await voiceOver.perform(voiceOver.keyboardCommands.interactWithItem);
        await page.keyboard.press('ArrowUp');

        const increasedValue = Number(originalValue) + Number(step);
        expect(await sliderLocator.inputValue()).toBe(
          increasedValue.toString(),
        );
      });
    });
  });
});
