import { fireEvent, render, screen } from '@testing-library/react';
import { TProps } from './Typeahead.types';
import Typeahead from '.';

const onChangeMock = jest.fn();
const onClickResultMock = jest.fn();

const defaultProps: TProps = {
  onChange: onChangeMock,
  onClickResult: onClickResultMock,
  loading: false,
  resetOnClickResults: false,
  results: [
    {
      id: 1,
      name: 'result 1',
      thumbnail: 'path',
    },
  ],
};

const setup = (props = defaultProps) => render(<Typeahead {...props} />);

describe('Typeahead', () => {
  it('should render component', () => {
    setup();

    const input = screen.getByPlaceholderText(
      'Digite o nome do super-heroí(na)',
    );

    fireEvent.change(input, { target: { value: 'hulk' } });

    expect(onChangeMock).toHaveBeenCalledWith('hulk');
  });

  it('should render results', () => {
    setup();

    const input = screen.getByPlaceholderText(
      'Digite o nome do super-heroí(na)',
    );

    fireEvent.change(input, { target: { value: 'hulk' } });

    const result = screen.getByText('result 1');

    expect(result).toBeInTheDocument();
  });

  it('should click on results without reset', () => {
    setup();

    const input = screen.getByPlaceholderText(
      'Digite o nome do super-heroí(na)',
    );

    fireEvent.change(input, { target: { value: 'hulk' } });

    const result = screen.getByText('result 1');

    fireEvent.click(result);

    expect(onClickResultMock).toHaveBeenCalledWith({
      id: 1,
      name: 'result 1',
      thumbnail: 'path',
    });
  });

  it('should click on results with reset', () => {
    setup({ ...defaultProps, resetOnClickResults: true });

    const input = screen.getByPlaceholderText(
      'Digite o nome do super-heroí(na)',
    );

    fireEvent.change(input, { target: { value: 'hulk' } });

    const result = screen.getByText('result 1');

    fireEvent.click(result);

    expect(input).toHaveValue('');
  });

  it('should render empty results', () => {
    setup({ ...defaultProps, results: [] });

    const input = screen.getByPlaceholderText(
      'Digite o nome do super-heroí(na)',
    );

    fireEvent.change(input, { target: { value: 'hulk' } });

    const result = screen.getByText('Nenhum resultado');

    expect(result).toBeInTheDocument();
  });

  it('should render loading', () => {
    setup({ ...defaultProps, loading: true });

    const input = screen.getByPlaceholderText(
      'Digite o nome do super-heroí(na)',
    );

    fireEvent.change(input, { target: { value: 'hulk' } });

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toBeInTheDocument();
  });
});
