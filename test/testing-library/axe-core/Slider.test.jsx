import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Slider } from '../../../src/components/index';
import { axe, toHaveNoViolations } from 'jest-axe';

describe('Slider', () => {
  describe('axe-core', () => {
    expect.extend(toHaveNoViolations);

    it('should have no violations', async () => {
      const { container } = render(<Slider name={'Volume'} />);

      const axeResult = await axe(container, {
        reporter: 'no-passes',
      });

      expect(axeResult).toHaveNoViolations();
    });
  });
});
