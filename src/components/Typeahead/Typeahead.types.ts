type TResult = {
  id: string | number;
  name: string;
  thumbnail?: string;
};

export type TProps = {
  onChange: (value: string) => void;
  onClickResult?: (result: TResult) => void;
  loading?: boolean;
  results?: Array<TResult>;
  resetOnClickResults?: boolean;
};
