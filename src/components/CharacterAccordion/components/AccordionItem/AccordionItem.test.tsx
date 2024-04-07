import { Accordion } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { TProps } from './AccordionItem.types';
import AccordionItem from '.';

const onClickMock = jest.fn();

const defaultProps: TProps = {
  name: 'HQs',
  onClick: onClickMock,
  list: [
    {
      title: 'title',
      description: 'description',
      thumbnail: {
        path: 'path',
        extension: 'extension',
      },
    },
    {
      title: 'title 2',
      description: 'description 2',
      thumbnail: {
        path: 'path 2',
        extension: 'extension 2',
      },
    },
  ],
  loading: false,
};

const setup = (props = defaultProps) =>
  render(
    <Accordion>
      <AccordionItem {...props} />
    </Accordion>,
  );

describe('CharacterAccordion/AccordionItem', () => {
  it('should render title and description', () => {
    setup();

    const title = screen.getByText('title');
    const description = screen.getByText('description');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('should render accordion title', () => {
    setup();

    const title = screen.getByText('Aparições em HQs');

    expect(title).toBeInTheDocument();
  });

  it('should render empty results', () => {
    setup({ ...defaultProps, list: [] });

    const content = screen.getByText('Nenhuma aparição');

    expect(content).toBeInTheDocument();
  });

  it('should click on accordion', () => {
    setup({ ...defaultProps, list: undefined });

    const title = screen.getByText('Aparições em HQs');

    fireEvent.click(title);

    expect(onClickMock).toHaveBeenCalled();
  });

  it('should render spinner', () => {
    setup({ ...defaultProps, loading: true, list: undefined });

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toBeInTheDocument();
  });
});
