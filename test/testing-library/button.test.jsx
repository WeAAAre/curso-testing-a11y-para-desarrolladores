import React from 'react';
import { describe, afterAll } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { convertAxeToSarif } from 'axe-sarif-converter';
import * as fs from 'fs';
import * as util from 'util';
import path from 'path';
import { Button } from '../../src/components/button/Button';

describe('Button', () => {
  afterAll(async () => {
    const { container } = render(<Button />);

    const axeResult = await axe(container, {
      reporter: 'no-passes',
    });
    axeResult.url = `file://${path.resolve('./src/components/button/Button.jsx')}`;
    const sarifResults = convertAxeToSarif(axeResult);
    await util.promisify(fs.writeFile)(
      './reports/button.sarif',
      JSON.stringify(sarifResults),
      { encoding: 'utf8' },
    );
  });
});
