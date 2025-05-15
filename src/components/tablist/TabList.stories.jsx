import React from 'react';
import { TabList, TabPanel, Tab } from './index';

const meta = {
  component: () => {
    return (
      <TabList label={'tab story'}>
        <Tab id="tab_1" targetId={'tabpanel_1'}>
          Tab 1
        </Tab>
        <Tab id="tab_2" targetId={'tabpanel_2'}>
          Tab 2
        </Tab>
        <TabPanel id="tabpanel_1" originId={'tab_1'}>
          Tab content 1
        </TabPanel>

        <TabPanel id="tabpanel_2" originId={'tab_2'}>
          Tab content 2
        </TabPanel>
      </TabList>
    );
  },
};

export default meta;

export const Primary = {
  args: {},
};
