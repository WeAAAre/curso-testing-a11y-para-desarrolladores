import { describe, it, expect } from 'vitest';
import { renderTabList } from '../../utils/renderTabList';

describe('TabList', () => {
  it('should match snapshot', async () => {
    const { container } = renderTabList({
      tabs: [
        {
          name: 'Primera tab',
          content: 'Contenido de la primera tab',
        },
        {
          name: 'Segunda tab (no seleccionada)',
          content: 'Contenido de la segunda tab',
        },
      ],
    });

    expect(container).toMatchSnapshot();
  });
});
