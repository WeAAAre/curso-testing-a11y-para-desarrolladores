import React, { useEffect } from 'react';

export const Tab = ({ ref, targetRef, _selected, children, ...rest }) => {
  const initializeAria = ({ tab, tabPanel }) => {
    tab.setAttribute('aria-controls', tabPanel.id);
    tab.setAttribute('aria-selected', _selected);
  };

  useEffect(() => {
    if (!targetRef.current || !ref.current) return;

    initializeAria({ tab: ref.current, tabPanel: targetRef.current });
  }, [targetRef.current, ref.current, _selected]);

  return (
    <li ref={ref} role="tab" tabIndex={_selected ? 0 : -1} {...rest}>
      {children}
    </li>
  );
};
