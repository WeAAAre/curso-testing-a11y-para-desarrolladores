import React from 'react';
import { TabList, Tab, TabPanel } from '../../src/components/tablist';

export const TestTabList = ({ tabs, label }) => {
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
