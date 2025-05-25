import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Slider } from '../../../src/components/index';
import { axe, toHaveNoViolations } from 'jest-axe';
import { convertAxeToSarif } from 'axe-sarif-converter';
import * as fs from 'fs';
import * as util from 'util';
import path from 'path';

describe('Slider', () => {
  describe('axe-core', () => {
    expect.extend(toHaveNoViolations);

    it('should have no violations', async () => {
      const { container } = render(<Slider name={'Volume'} />);

      const axeResult = await axe(container, {
        reporter: 'no-passes',
      });
      axeResult.url = `file://${path.resolve(
        './src/components/slider/Slider.jsx',
      )}`;
      const sarifResults = convertAxeToSarif(axeResult);
      await util.promisify(fs.writeFile)(
        './reports/slider.sarif',
        JSON.stringify(sarifResults),
        { encoding: 'utf8' },
      );
      expect(axeResult).toHaveNoViolations();
    });
  });
});
