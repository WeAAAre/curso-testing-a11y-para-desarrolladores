import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { TestTabList } from '../utils/TestTabList';

test.describe('TabList', () => {
  /** @type {import('@playwright/experimental-ct-react').MountResult} */
  let locator = null;
  const tabListConfig = {
    tabs: [
      {
        name: 'First tab',
        content: 'Content of the first tab',
      },
      {
        name: 'Second tab',
        content: 'Content of the second tab',
      },
    ],
    label: 'Test label',
  };

  test.beforeEach(async ({ mount }) => {
    locator = await mount(<TestTabList {...tabListConfig} />);
  });

  test.describe('Keyboard Interaction', () => {
    // https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
    test.describe('Tab', () => {
      test('When focus moves into the tab list, places focus on the active tab element.', async () => {
        const tab = locator.getByRole('tab').first();
        const tabPanel = locator.getByRole('tabpanel');

        await tabPanel.press('Shift+Tab');

        expect(tab).toBeFocused();
      });

      test('When the tab list contains the focus, moves focus to the next element in the page tab sequence outside the tablist, which is the tabpanel unless the first element containing meaningful content inside the tabpanel is focusable.', async () => {
        const tab = locator.getByRole('tab').first();
        const tabPanel = locator.getByRole('tabpanel').first();

        await tab.press('Tab');

        await expect(tabPanel).toBeFocused();
      });
    });

    test.describe('When focus is on a tab element in a horizontal tab list:', () => {
      /* 
        Note
        1. It is recommended that tabs activate automatically when they receive focus as long as their associated tab panels 
        are displayed without noticeable latency. This typically requires tab panel content to be preloaded. 
        Otherwise, automatic activation slows focus movement, which significantly hampers users' ability to navigate efficiently 
        across the tab list. For additional guidance, see Deciding When to Make Selection Automatically Follow Focus.
        2. When a tab list has its aria-orientation set to vertical:
            1. Down Arrow performs as Right Arrow is described above.
            2. Up Arrow performs as Left Arrow is described above.
        3. If the tab list is horizontal, it does not listen for Down Arrow or Up Arrow so those keys can provide their normal 
        browser scrolling functions even when focus is inside the tab list.
        4. When the tabpanel does not contain any focusable elements or the first element with content is not focusable, the 
        tabpanel should set tabindex="0" to include it in the tab sequence of the page.
        */
      test('Left Arrow: moves focus to the previous tab. If focus is on the first tab, moves focus to the last tab. Optionally, activates the newly focused tab (See note above).', async () => {
        const tabList = locator.getByRole('tablist');
        const tabs = await locator.getByRole('tab').all();
        const tabPanels = await locator
          .getByRole('tabpanel', { includeHidden: true })
          .all();

        // When focus is on first tab
        await tabs[0].press('ArrowLeft');

        await expect(tabs[tabs.length - 1]).toBeFocused();
        await expect(tabPanels[tabs.length - 1]).toBeVisible();

        // When focus is not on first tab
        await tabList.press('ArrowLeft');

        await expect(tabs[tabs.length - 2]).toBeFocused();
        await expect(tabPanels[tabs.length - 2]).toBeVisible();
      });

      test('Right Arrow: Moves focus to the next tab. If focus is on the last tab element, moves focus to the first tab. Optionally, activates the newly focused tab (See note above).', async () => {
        const tabs = await locator.getByRole('tab').all();
        const tabPanels = await locator
          .getByRole('tabpanel', { includeHidden: true })
          .all();

        // When focus is not on last tab
        await tabs[tabs.length - 2].press('ArrowRight');

        await expect(tabs[tabs.length - 1]).toBeFocused();
        await expect(tabPanels[tabs.length - 1]).toBeVisible();

        // When focus is on last tab
        await tabs[tabs.length - 1].press('ArrowRight');

        await expect(tabs[0]).toBeFocused();
        await expect(tabPanels[0]).toBeVisible();
      });
    });

    test.describe('When focus is on a tab in a tablist with either horizontal or vertical orientation:', () => {
      // It does not apply:
      // - tabs are automatically activated.
      // - no optional navigation was implemented
      // - no tabs with associated popup menus
      test.skip('Space or Enter: Activates the tab if it was not activated automatically on focus.', () => {});
      test.skip('Home (Optional): Moves focus to the first tab. Optionally, activates the newly focused tab (See note below).', () => {});
      test.skip('End (Optional): Moves focus to the last tab. Optionally, activates the newly focused tab (See note below).', () => {});
      test.skip('Shift + F10: If the tab has an associated popup menu, opens the menu.', () => {});
      test.skip('Delete (Optional): If deletion is allowed, deletes (closes) the current tab element and its associated tab panel, sets focus on the tab following the tab that was closed, and optionally activates the newly focused tab. If there is not a tab that followed the tab that was deleted, e.g., the deleted tab was the right-most tab in a left-to-right horizontal tab list, sets focus on and optionally activates the tab that preceded the deleted tab. If the application allows all tabs to be deleted, and the user deletes the last remaining tab in the tab list, the application moves focus to another element that provides a logical work flow. As an alternative to Delete, or in addition to supporting Delete, the delete function is available in a context menu.', () => {});
    });
  });

  test.describe('Semantics', () => {
    test('has proper accessible structure', async () => {
      await expect(locator.getByRole('tablist')).toMatchAriaSnapshot(`
              - tablist "Test label":
                  - tab "First tab" [selected]
                  - tab "Second tab"
            `);
    });
  });
});
