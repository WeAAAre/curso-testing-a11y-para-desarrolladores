import React, { Children, cloneElement, isValidElement, useState } from 'react';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
// eslint-disable-next-line no-unused-vars
import tablistStyles from './tablist.module.css';

export const TabList = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const childrenArray = Children.toArray(children);
  const tabs = [];
  const tabPanels = [];

  childrenArray.forEach((child) => {
    if (!isValidElement(child)) return;

    if (child.type === Tab) {
      tabs.push(child);
    } else if (child.type === TabPanel) {
      tabPanels.push(child);
    }
  });

  const handleKeyDown = (event) => {
    let newIndex = -1;

    switch (event.key) {
      case 'ArrowLeft':
        newIndex = selectedIndex - 1;
        break;
      case 'ArrowRight':
        newIndex = selectedIndex + 1;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabPanels.length - 1;
        break;
      default:
        return;
    }

    if (newIndex < 0) newIndex = tabPanels.length - 1;
    if (newIndex >= tabPanels.length) newIndex = 0;

    setSelectedIndex(newIndex);
    const newSelectedTabId = tabs.at(newIndex).props.id;
    document.getElementById(newSelectedTabId).focus();
    event.preventDefault();
  };
  return (
    <div>
      <ul role="tablist" onKeyDown={handleKeyDown}>
        {tabs.map((tab, index) =>
          cloneElement(tab, {
            onClick: () => setSelectedIndex(index),
            _selected: selectedIndex === index,
          }),
        )}
      </ul>

      {tabPanels.map((tabPanel, index) =>
        cloneElement(tabPanel, {
          _selected: selectedIndex === index,
        }),
      )}
    </div>
  );
};
