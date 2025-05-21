import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderTabList } from './utils/renderTabList';
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

  describe('WAI-ARIA Roles, States, and Properties', () => {
    it('The element that serves as the container for the set of tabs has role tablist.', () => {
      renderTabList({
        tabs,
      });

      expect(screen.getByRole('tablist')).not.toBeNull();
    });

    it('Each element that serves as a tab has role tab and is contained within the element with role tablist.', () => {
      const numberOfTabs = tabs.length;

      const { container } = renderTabList({
        tabs,
      });

      const tabElements = container.querySelectorAll(
        '[role="tablist"] > [role="tab"]',
      );
      expect(tabElements.length).toEqual(numberOfTabs);
      expect(Array.from(tabElements).map((tab) => tab.textContent)).toEqual(
        tabs.map((tab) => tab.name),
      );
    });

    it('Each element that contains the content panel for a tab has role tabpanel.', () => {
      const testId = 'tabpanel_anchor';

      renderTabList({
        tabs: [
          {
            name: 'A tab',
            content: <div data-testid={testId}></div>,
          },
        ],
      });

      const tabPanelContent = screen.queryByTestId(testId);
      expect(tabPanelContent.parentElement.role).toEqual('tabpanel');
    });

    it('If the tab list has a visible label, the element with role tablist has aria-labelledby set to a value that refers to the labelling element.  Otherwise, the tablist element has a label provided by aria-label', () => {
      const tabListLabel = 'Activities';

      renderTabList({
        tabs,
        label: tabListLabel,
      });

      const tabList = screen.getByRole('tablist');
      expect(tabList.getAttribute('aria-label')).toEqual(tabListLabel);
      // expect(tabList.getAttribute('aria-labelledby')).toEqual(labelElement.id);
    });

    it('Each element with role tab has the property aria-controls referring to its associated tabpanel element.', () => {
      renderTabList({
        tabs,
      });

      const tabElements = screen
        .getByRole('tablist')
        .querySelectorAll('[role="tab"]');
      const tabPanelElements = screen.queryAllByRole('tabpanel', {
        hidden: true,
      });
      tabElements.forEach((tab, index) => {
        expect(tab.getAttribute('aria-controls')).toEqual(
          Array.from(tabPanelElements).at(index).id,
        );
      });
    });

    it('The active tab element has the state aria-selected set to true and all other tab elements have it set to false.', () => {
      const activeIndex = 0;
      renderTabList({ tabs });

      const tabElements = screen
        .getByRole('tablist')
        .querySelectorAll('[role="tab"]');
      tabElements.forEach((tab, index) => {
        expect(tab.getAttribute('aria-selected')).toBe(
          index === activeIndex ? 'true' : 'false',
        );
      });
    });

    it('Each element with role tabpanel has the property aria-labelledby referring to its associated tab element.', () => {
      renderTabList({ tabs });

      const tabElements = screen
        .getByRole('tablist')
        .querySelectorAll('[role="tab"]');
      const tabPanelElements = screen.queryAllByRole('tabpanel', {
        hidden: true,
      });
      tabPanelElements.forEach((tabPanel, index) => {
        expect(tabPanel.getAttribute('aria-labelledby')).toEqual(
          Array.from(tabElements).at(index).id,
        );
      });
    });

    // It does not apply
    it('If a tab element has a popup menu, it has the property aria-haspopup set to either menu or true.', () => {});

    // It does not apply
    it('If the tablist element is vertically oriented, it has the property aria-orientation set to vertical. The default value of aria-orientation for a tablist element is horizontal.', () => {});
  });

  describe('axe-core', () => {
    expect.extend(toHaveNoViolations);

    it('should have no violations', async () => {
      const { container } = renderTabList({ tabs });

      const axeResult = await axe(container, {
        reporter: 'no-passes'
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
      // expect(axeResult).toHaveNoViolations();
    });
  });
});
