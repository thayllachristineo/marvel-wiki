import { AppearanceResult } from '../../../../@types/appearance.types';

export type TList = {
  title: AppearanceResult['title'];
  description?: AppearanceResult['description'];
  textObjects?: AppearanceResult['textObjects'];
  thumbnail: AppearanceResult['thumbnail'];
};

export type TProps = {
  name: string;
  onClick: () => void;
  list?: Array<TList>;
  loading?: boolean;
};
