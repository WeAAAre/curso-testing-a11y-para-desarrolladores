import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { Slider } from '../../src/components';

test.describe('Slider', () => {
  const step = 0.5;
  const min = 0;
  const max = 100;
  const startAt = 50;

  test.beforeEach(async ({ mount }) => {
    await mount(
      <Slider
        name="Volume"
        step={step}
        min={min}
        max={max}
        startAt={startAt}
      />,
    );
  });

  test.describe('Keyboard Interaction', () => {
    // https://www.w3.org/WAI/ARIA/apg/patterns/slider/
    test('Right Arrow: Increase the value of the slider by one step.', async ({
      page,
    }) => {
      const sliderLocator = page.getByRole('slider');
      const originalValue = Number(await sliderLocator.inputValue());

      await sliderLocator.focus();
      await page.keyboard.press('ArrowRight');

      const currentValue = Number(await sliderLocator.inputValue());
      expect(currentValue).toEqual(originalValue + step);
    });

    test('Up Arrow: Increase the value of the slider by one step.', async ({
      page,
    }) => {
      const sliderLocator = page.getByRole('slider');
      const originalValue = Number(await sliderLocator.inputValue());

      await sliderLocator.focus();
      await page.keyboard.press('ArrowUp');

      const currentValue = Number(await sliderLocator.inputValue());
      expect(currentValue).toEqual(originalValue + step);
    });

    test('Left Arrow: Decrease the value of the slider by one step.', async ({
      page,
    }) => {
      const sliderLocator = page.getByRole('slider');
      const originalValue = Number(await sliderLocator.inputValue());

      await sliderLocator.focus();
      await page.keyboard.press('ArrowLeft');

      const currentValue = Number(await sliderLocator.inputValue());
      expect(currentValue).toEqual(originalValue - step);
    });

    test('Down Arrow: Decrease the value of the slider by one step.', async ({
      page,
    }) => {
      const sliderLocator = page.getByRole('slider');
      const originalValue = Number(await sliderLocator.inputValue());

      await sliderLocator.focus();
      await page.keyboard.press('ArrowDown');

      const currentValue = Number(await sliderLocator.inputValue());
      expect(currentValue).toEqual(originalValue - step);
    });

    test('Home: Set the slider to the first allowed value in its range.', async ({
      page,
    }) => {
      const sliderLocator = page.getByRole('slider');

      await sliderLocator.focus();
      await page.keyboard.press('Home');

      const currentValue = Number(await sliderLocator.inputValue());
      expect(currentValue).toEqual(min);
    });

    test('End: Set the slider to the last allowed value in its range.', async ({
      page,
    }) => {
      const sliderLocator = page.getByRole('slider');

      await sliderLocator.focus();
      await page.keyboard.press('End');

      const currentValue = Number(await sliderLocator.inputValue());
      expect(currentValue).toEqual(max);
    });

    // Not applicable
    test.skip('Page Up (Optional): Increase the slider value by an amount larger than the step change made by Up Arrow.', async () => {});

    // Not applicable
    test.skip('Page Down (Optional): Decrease the slider value by an amount larger than the step change made by Down Arrow.', async () => {});
  });

  test.describe('Semantics', () => {
    test('has proper accessible structure', async ({ page }) => {
      await expect(page.getByRole('slider')).toMatchAriaSnapshot(`
              - slider "Volume"
            `);
    });
  });
});
