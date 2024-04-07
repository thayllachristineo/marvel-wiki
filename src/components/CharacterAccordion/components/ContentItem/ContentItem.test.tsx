import { render, screen } from '@testing-library/react';
import { TProps } from './ContentItem.types';
import ContentItem from '.';

const defaultProps: TProps = {
  title: 'title',
  description: 'description',
};

const setup = (props = defaultProps) => render(<ContentItem {...props} />);

describe('CharacterAccordion/ContentItem', () => {
  it('should render title and description', () => {
    setup();

    const title = screen.getByText('title');
    const description = screen.getByText('description');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('should render placeholder thumbnail', () => {
    setup({
      ...defaultProps,
      thumbnail: { path: 'path', extension: 'extension' },
    });

    const image = screen.getByRole('img') as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://via.placeholder.com/125x180');
  });
});
