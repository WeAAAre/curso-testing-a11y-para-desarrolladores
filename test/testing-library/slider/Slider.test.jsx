import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Slider } from '../../../src/components/index';
import { userEvent } from '@storybook/test';

describe('Slider', () => {
  describe('WAI-ARIA Roles, States, and Properties', () => {
    it('The element serving as the focusable slider control has role slider.', async () => {
      const { getByRole } = render(<Slider name="Volume" />);

      await userEvent.tab();

      const focusableSliderControl = document.activeElement;

      //   expect(focusableSliderControl.role).toBe('slider');
      // It is recommended to use input and type range instead:
      // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/slider_role
      expect(getByRole('slider'));
      expect(focusableSliderControl.tagName).toBe('INPUT');
      expect(focusableSliderControl.getAttribute('type')).toBe('range');
    });

    it('The slider element has the aria-valuenow property set to a decimal value representing the current value of the slider.', async () => {
      render(<Slider name="Volume" min={0.5} />);

      await userEvent.tab();

      const focusableSliderControl = document.activeElement;

      // Equivalent is value
      // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-valuenow
      expect(focusableSliderControl.getAttribute('value')).toBe('0.5');
    });

    it('The slider element has the aria-valuemin property set to a decimal value representing the minimum allowed value of the slider.', async () => {
      render(<Slider name="Volume" min={0.5} />);

      await userEvent.tab();

      const focusableSliderControl = document.activeElement;

      // Equivalent is min
      // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-valuemin
      expect(focusableSliderControl.getAttribute('min')).toBe('0.5');
    });

    it('The slider element has the aria-valuemax property set to a decimal value representing the maximum allowed value of the slider.', async () => {
      render(<Slider name="Volume" max={0.5} />);

      await userEvent.tab();

      const focusableSliderControl = document.activeElement;

      // Equivalent is max
      // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-valuemax
      expect(focusableSliderControl.getAttribute('max')).toBe('0.5');
    });

    // Not applicable
    it.skip('If the value of aria-valuenow is not user-friendly, e.g., the day of the week is represented by a number, the aria-valuetext property is set to a string that makes the slider value understandable, e.g., "Monday".', () => {});

    it('If the slider has a visible label, it is referenced by aria-labelledby on the slider element. Otherwise, the slider element has a label provided by aria-label.', () => {
      const { getByRole } = render(<Slider name="Volume" max={0.5} />);

      expect(
        getByRole('slider', {
          name: 'Volume',
        }),
      );
    });

    // Not applicable
    it.skip('If the slider is vertically oriented, it has aria-orientation set to vertical. The default value of aria-orientation for a slider is horizontal.', () => {});
  });
});
