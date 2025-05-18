import React from 'react';
import { TabList, TabPanel, Tab } from './index';

const meta = {
  component: () => {
    return (
      <TabList label={'Actividades'}>
        <Tab id="tab_1" targetId={'tabpanel_1'}>
          Actividad uno
        </Tab>
        <Tab id="tab_2" targetId={'tabpanel_2'}>
          Actividad dos
        </Tab>
        <TabPanel id="tabpanel_1" originId={'tab_1'}>
          Contenido uno
        </TabPanel>

        <TabPanel id="tabpanel_2" originId={'tab_2'}>
          Contenido dos
        </TabPanel>
      </TabList>
    );
  },
};

export default meta;

export const Primary = {
  args: {},
};
