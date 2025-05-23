import { beforeEach, afterEach, it, describe, expect } from 'vitest';
import { VIRTUAL_SCREENREADER_RESERVED } from '../constants';
import { virtual } from '@guidepup/virtual-screen-reader';
import { renderTabList } from './utils/renderTabList';
import { userEvent } from '@storybook/test';
import { screen, waitFor } from '@testing-library/react';

/*
https://www.magentaa11y.com/checklist-web/tab-panel/

Desktop screenreader
- WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND 
  - I use the tab key to move focus to a tab
  - I HEAR Its label and purpose is clear
  - I HEAR It identifies itself as a tab
  - I HEAR It expresses its state (selected/pressed/checked)
- IF TAB ACTIVATION IS MANUAL when I use the left/right arrow keys I HEAR focus moves to other tabs and I use the spacebar or enter key to activate the tab
- IF TAB ACTIVATION IS AUTOMATIC when I use the left/right arrow keys I HEAR the tab is activated
- THEN when I use the tab key I HEAR focus moves to the activated tab panel
*/
const tabs = [
  {
    name: 'First tab',
    content: 'Content of the first tab',
  },
  {
    name: 'Second tab',
    content: 'Content of the second tab',
  },
];
const label = 'The tabs';

describe('TabList', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  beforeEach(async () => {
    const { container } = renderTabList({ tabs, label });

    await virtual.start({ container });
    await virtual.interact();
  });

  describe('WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver)', () => {
    describe('AND I use the tab key to move focus to a tab', () => {
      beforeEach(async () => {
        await userEvent.tab();
      });

      it('I HEAR Its label and purpose is clear', async () => {
        expect(await virtual.lastSpokenPhrase()).toContain(
          await virtual.itemText(),
        );
      });

      it('I HEAR It identifies itself as a tab', async () => {
        expect(await virtual.lastSpokenPhrase()).toContain(
          VIRTUAL_SCREENREADER_RESERVED.TAB,
        );
      });

      it('I HEAR It expresses its state (selected/pressed/checked)', async () => {
        expect(await virtual.lastSpokenPhrase()).toContain(
          VIRTUAL_SCREENREADER_RESERVED.SELECTED,
        );
      });

      describe('THEN when I use the tab key', () => {
        it('I HEAR focus moves to the activated tab panel', async () => {
          await virtual.press('Tab');

          expect(await virtual.lastSpokenPhrase()).toContain(
            VIRTUAL_SCREENREADER_RESERVED.TABPANEL,
          );
        });
      });

      describe('IF TAB ACTIVATION IS AUTOMATIC', () => {
        describe('when I use the left/right arrow keys', () => {
          it('I HEAR the tab is activated', async () => {
            await userEvent.keyboard('{arrowright}');

            const tabpanels = await screen.getAllByRole('tabpanel', {
              hidden: true,
            });

            await waitFor(() => expect(tabpanels[1]).toBeVisible());
          });
        });
      });
    });
  });
});
