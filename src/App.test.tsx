import { fireEvent, render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';

const setup = () =>
  render(
    <ChakraProvider>
      <App />
    </ChakraProvider>,
  );

jest.mock('services', () => ({
  getCharactersByName: jest.fn(() =>
    Promise.resolve([
      {
        id: 1,
        name: 'hulk',
        description: 'hulk description',
      },
    ]),
  ),
  getComicsByCharacterId: jest.fn(() =>
    Promise.resolve([
      {
        id: 1,
        title: 'comics title',
        description: 'comics description',
      },
    ]),
  ),
  getSeriesByCharacterId: jest.fn(() =>
    Promise.resolve([
      {
        id: 1,
        title: 'series title',
        description: 'series description',
      },
    ]),
  ),
  getStoriesByCharacterId: jest.fn(() =>
    Promise.resolve([
      {
        id: 1,
        title: 'stories title',
        description: 'stories description',
      },
    ]),
  ),
}));

describe('CharacterAccordion/ContentItem', () => {
  it('should render offline status', () => {
    Object.defineProperty(window, 'navigator', {
      value: { onLine: false },
      writable: true,
    });

    setup();

    const offlineMessage = screen.getByText('Você está offline');
    expect(offlineMessage).toBeInTheDocument();
  });

  it('should click typeahead result', async () => {
    setup();

    const typeahead = screen.getByPlaceholderText(
      'Digite o nome do super-heroí(na)',
    );

    fireEvent.change(typeahead, { target: { value: 'hulk' } });

    const result = await screen.findByText('hulk');

    fireEvent.click(result);

    const description = await screen.findByText('hulk description');

    expect(description).toBeInTheDocument();
  });

  it('should open appearances', async () => {
    setup();

    const typeahead = screen.getByPlaceholderText(
      'Digite o nome do super-heroí(na)',
    );

    fireEvent.change(typeahead, { target: { value: 'hulk' } });

    const result = await screen.findByText('hulk');

    fireEvent.click(result);

    const comics = screen.getByText('Aparições em HQs');
    const series = screen.getByText('Aparições em Séries');
    const stories = screen.getByText('Aparições em Stories');

    fireEvent.click(comics);
    fireEvent.click(series);
    fireEvent.click(stories);

    const comic = await screen.findByText('comics title');
    const serie = await screen.findByText('series title');
    const story = await screen.findByText('stories title');

    expect(comic).toBeInTheDocument();
    expect(serie).toBeInTheDocument();
    expect(story).toBeInTheDocument();
  });
});
