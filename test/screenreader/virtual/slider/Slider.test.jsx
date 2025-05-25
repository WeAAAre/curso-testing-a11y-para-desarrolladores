import React from 'react';
import { beforeEach, afterEach, it, describe, expect } from 'vitest';
import { VIRTUAL_SCREENREADER_RESERVED } from '../constants';
import { virtual } from '@guidepup/virtual-screen-reader';
import { userEvent } from '@storybook/test';
import { render } from '@testing-library/react';
import { Slider } from '../../../../src/components';

/*
https://www.magentaa11y.com/checklist-web/range-slider/

2 - Desktop screenreader
- WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver) AND I use the tab key to move focus to a range slider
    - I HEAR Its purpose is clear
    - I HEAR It identifies itself as a range
    - I HEAR Its label is read with the input
    - I HEAR Its current value
- Then when I use the up/down/left/right arrow keys I HEAR the value is changed one step
*/
const step = 0.5;
const min = 0;
const max = 100;
const startAt = 50;
const label = 'Volume';

describe('Slider', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  beforeEach(async () => {
    const { container } = render(
      <Slider name={label} step={step} min={min} max={max} startAt={startAt} />,
    );

    await virtual.start({ container });
    await virtual.interact();
  });

  describe('WHEN I use a desktop screenreader (NVDA, JAWS, VoiceOver)', () => {
    describe('AND I use the tab key to move focus to a range slider', () => {
      beforeEach(async () => {
        await userEvent.tab();
      });

      it('I HEAR Its purpose is clear', async () => {
        expect(await virtual.lastSpokenPhrase()).toContain(label);
      });

      it('I HEAR It identifies itself as a range', async () => {
        expect(await virtual.lastSpokenPhrase()).toContain(
          VIRTUAL_SCREENREADER_RESERVED.SLIDER,
        );
      });

      it('I HEAR Its label is read with the input', async () => {
        expect(await virtual.lastSpokenPhrase()).toContain(label);
      });

      it('I HEAR Its current value', async () => {
        expect(await virtual.lastSpokenPhrase()).toContain(startAt);
      });

      // It is difficult to test with testing-library. See https://github.com/testing-library/user-event/issues/871
      it.skip('WHEN I use the left arrow keys I HEAR the value is changed one step', async () => {});
      it.skip('WHEN I use the right arrow keys I HEAR the value is changed one step', async () => {});
    });
  });
});
