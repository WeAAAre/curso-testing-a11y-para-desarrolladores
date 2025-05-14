import React from 'react';
import { render } from '@testing-library/react';
import { TabList, Tab, TabPanel } from '../../src/components/tablist';

/**
 * @typedef {Object} TabData
 * @property {string} name - The name of the tab.
 * @property {React.ReactNode} content - The content to display in the TabPanel.
 */
/**
 * Renders a TabList with given tabs.
 *
 * @param {{ tabs: TabData[] }} props - The props object.
 * @returns {Promise<import('@testing-library/react').RenderResult>} The render result.
 */
export const renderTabList = ({ tabs = [] }) => {
  return render(<TestTabList tabs={tabs} />);
};

const TestTabList = ({ tabs }) => {
  return (
    <TabList>
      {tabs.map(({ name }) => {
        const idBase = `${name.replaceAll(' ', '')}`;
        return (
          <Tab id={`${idBase}_tab`} targetId={`${idBase}_panel`} key={idBase}>
            {name}
          </Tab>
        );
      })}

      {tabs.map(({ content }, index) => {
        const idBase = `${tabs[index].name.replaceAll(' ', '')}`;
        return (
          <TabPanel
            id={`${idBase}_panel`}
            originId={`${idBase}_tab`}
            key={idBase}
          >
            {content}
          </TabPanel>
        );
      })}
    </TabList>
  );
};
