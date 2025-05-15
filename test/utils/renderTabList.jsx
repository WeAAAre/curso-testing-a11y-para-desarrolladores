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
 * @param {{ tabs: TabData[], label: string }} props - Object containing the tablist label and the tabs.
 * @returns {import('@testing-library/react').RenderResult} The render result from testing library.
 */
export const renderTabList = (props) => {
  return render(<TestTabList {...props} />);
};

const TestTabList = ({ tabs, label }) => {
  return (
    <TabList label={label}>
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
