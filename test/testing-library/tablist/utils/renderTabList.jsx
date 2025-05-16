import React from 'react';
import { render } from '@testing-library/react';
import { TestTabList } from '../../../utils/TestTabList';

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
