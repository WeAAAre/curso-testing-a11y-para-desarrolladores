import '../src/components/styles.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    a11y: { test: 'error' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
