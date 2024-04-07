import { render, screen } from '@testing-library/react';
import { TProps } from './CharacterDescription.types';
import CharacterDescription from '.';

const defaultProps: TProps = {
  name: 'title',
  description: 'description',
  thumbnail: {
    path: 'path',
    extension: 'extension',
  },
};

const setup = (props = defaultProps) =>
  render(<CharacterDescription {...props} />);

describe('CharacterDescription', () => {
  it('should render component', () => {
    setup();

    const title = screen.getByText('title');
    const description = screen.getByText('description');
    const image = screen.getByAltText('title') as HTMLImageElement;

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it('should render component without description', () => {
    setup({ ...defaultProps, description: undefined });

    const title = screen.getByText('title');
    const description = screen.getByText('Sem descrição');
    const image = screen.getByAltText('title') as HTMLImageElement;

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
