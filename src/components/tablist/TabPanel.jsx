import React, { useEffect } from 'react';

export const TabPanel = ({ ref, originRef, _selected, children, ...rest }) => {
  const initializeAria = ({ tab, tabPanel }) => {
    tabPanel.setAttribute('aria-labelledby', tab.id);
  };

  useEffect(() => {
    if (!originRef.current || !ref.current) return;

    initializeAria({ tab: originRef.current, tabPanel: ref.current });
  }, [originRef.current, ref.current, _selected]);

  return (
    <div role="tabpanel" ref={ref} hidden={!_selected} {...rest}>
      {children}
    </div>
  );
};
