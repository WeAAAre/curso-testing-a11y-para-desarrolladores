import '../src/components/styles.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    a11y: { test: 'error', rules: [{ id: 'region', enabled: false }] },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
