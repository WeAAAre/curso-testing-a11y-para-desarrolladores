import React, { useEffect, useRef } from 'react';

export const TabPanel = ({ id, originId, _selected, children, ...rest }) => {
  const ref = useRef();

  const initializeAria = ({ tabId, tabPanel }) => {
    tabPanel.setAttribute('aria-labelledby', tabId);
  };

  useEffect(() => {
    if (!ref.current) return;

    initializeAria({ tabId: originId, tabPanel: ref.current });
  }, [ref.current, _selected]);

  return (
    <div role="tabpanel" ref={ref} id={id} hidden={!_selected} {...rest}>
      {children}
    </div>
  );
};
