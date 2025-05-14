import React, { useEffect, useRef } from 'react';

export const Tab = ({ id, targetId, _selected, children, ...rest }) => {
  const ref = useRef();
  const initializeAria = ({ tab, tabPanelId }) => {
    tab.setAttribute('aria-controls', tabPanelId);
    tab.setAttribute('aria-selected', _selected);
  };

  useEffect(() => {
    if (!ref.current) return;

    initializeAria({ tab: ref.current, tabPanelId: targetId });
  }, [ref.current, _selected]);

  return (
    <li ref={ref} id={id} role="tab" tabIndex={_selected ? 0 : -1} {...rest}>
      {children}
    </li>
  );
};
