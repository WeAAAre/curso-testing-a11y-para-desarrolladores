import { describe, it, expect } from 'vitest';
import { renderTabList } from '../tablist/utils/renderTabList';
import { axe, toHaveNoViolations } from 'jest-axe';
import { convertAxeToSarif } from 'axe-sarif-converter';
import * as fs from 'fs';
import * as util from 'util';
import path from 'path';

describe('TabList', () => {
  const tabs = [
    {
      name: 'First tab',
      content: 'Content of the first tab',
    },
    {
      name: 'Second tab',
      content: 'Content of the second tab',
    },
  ];

  describe('axe-core', () => {
    expect.extend(toHaveNoViolations);

    it('should have no violations', async () => {
      const { container } = renderTabList({ tabs });

      const axeResult = await axe(container, {
        reporter: 'no-passes',
      });
      axeResult.url = `file://${path.resolve(
        './src/components/tablist/TabList.jsx',
      )}`;
      const sarifResults = convertAxeToSarif(axeResult);
      await util.promisify(fs.writeFile)(
        './reports/tablist.sarif',
        JSON.stringify(sarifResults),
        { encoding: 'utf8' },
      );
      expect(axeResult).toHaveNoViolations();
    });
  });
});
