import React, { useRef } from 'react';
import { TabList, TabPanel, Tab } from './index';

const meta = {
  component: () => {
    const tab1 = useRef();
    const tab2 = useRef();
    const tabPanel1 = useRef();
    const tabPanel2 = useRef();

    return (
      <TabList>
        <Tab ref={tab1} targetRef={tabPanel1}>
          Tab 1
        </Tab>
        <Tab ref={tab2} targetRef={tabPanel2}>
          Tab 2
        </Tab>
        <TabPanel ref={tabPanel1} originRef={tab1}>
          Tab content 1
        </TabPanel>

        <TabPanel ref={tabPanel2} originRef={tab2}>
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
