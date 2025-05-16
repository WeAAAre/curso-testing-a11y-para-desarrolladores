import React, { useEffect, useRef } from 'react';
import { focusable } from 'tabbable';

export const TabPanel = ({ id, originId, children, ...restProps }) => {
  const { _selected, ...rest } = restProps;
  const ref = useRef();

  const initializeAria = ({ tabId, tabPanel }) => {
    tabPanel.setAttribute('aria-labelledby', tabId);
  };

  useEffect(() => {
    if (!ref.current) return;

    initializeAria({
      tabId: originId,
      tabPanel: ref.current,
    });
    if (focusable(ref.current).length === 0)
      ref.current.setAttribute('tabindex', 0);
  }, [ref.current, _selected]);

  return (
    <div role="tabpanel" ref={ref} id={id} hidden={!_selected} {...rest}>
      {children}
    </div>
  );
};
