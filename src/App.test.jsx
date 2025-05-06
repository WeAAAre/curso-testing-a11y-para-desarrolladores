import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('should update counter', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(<App />);
    const counterButton = getByRole('button', {
      name: 'Increment',
    });

    await user.click(counterButton);

    expect(getByText('Count: 1')).toBeDefined();
  });
});
