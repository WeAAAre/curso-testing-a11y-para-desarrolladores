import React from 'react';
import { describe, afterAll } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { convertAxeToSarif } from 'axe-sarif-converter';
import * as fs from 'fs';
import * as util from 'util';
import path from 'path';
import { Link } from '../../src/components/link/Link';

describe('Link', () => {
  afterAll(async () => {
    const { container } = render(<Link />);

    const axeResult = await axe(container, {
      reporter: 'no-passes',
    });
    axeResult.url = `file://${path.resolve('./src/components/link/Link.jsx')}`;
    const sarifResults = convertAxeToSarif(axeResult);
    await util.promisify(fs.writeFile)(
      './reports/link.sarif',
      JSON.stringify(sarifResults),
      { encoding: 'utf8' },
    );
  });
});
