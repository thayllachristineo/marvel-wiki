import { render, screen } from '@testing-library/react';
import { TProps } from './CharacterAccordion.types';
import CharacterAccordion from '.';

const onClickMock = jest.fn();

const defaultProps: TProps = {
  selectedCharacter: {
    id: 1,
    name: 'name',
    description: 'description',
    thumbnail: {
      path: 'path',
      extension: 'extension',
    },
  },
  appearance: {
    comics: {
      onClick: onClickMock,
      list: [
        {
          id: 1,
          title: 'comics title',
          description: 'comics description',
          thumbnail: {
            path: 'comics path',
            extension: 'comics extension',
          },
        },
      ],
      loading: false,
    },
    series: {
      onClick: onClickMock,
      list: [],
      loading: false,
    },
    stories: {
      onClick: onClickMock,
      list: [],
      loading: false,
    },
  },
};

const setup = (props = defaultProps) =>
  render(<CharacterAccordion {...props} />);

describe('CharacterAccordion/ContentItem', () => {
  it('should render comics', () => {
    setup();

    const title = screen.getByText('Aparições em HQs');
    const contentTitle = screen.getByText('comics title');
    const contentDescription = screen.getByText('comics description');

    expect(title).toBeInTheDocument();
    expect(contentTitle).toBeInTheDocument();
    expect(contentDescription).toBeInTheDocument();
  });

  it('should render series', () => {
    setup();

    const title = screen.getByText('Aparições em Séries');

    expect(title).toBeInTheDocument();
  });

  it('should render stories', () => {
    setup();

    const title = screen.getByText('Aparições em Stories');

    expect(title).toBeInTheDocument();
  });
});
