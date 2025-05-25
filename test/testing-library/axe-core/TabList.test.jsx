import { describe, it, expect } from 'vitest';
import { renderTabList } from '../tablist/utils/renderTabList';
import { axe, toHaveNoViolations } from 'jest-axe';

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

      expect(axeResult).toHaveNoViolations();
    });
  });
});
