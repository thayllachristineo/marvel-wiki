import { AppearanceResult } from 'types/appearance.types';

export type TProps = {
  title: AppearanceResult['title'];
  description?: AppearanceResult['description'];
  textObjects?: AppearanceResult['textObjects'];
  thumbnail?: AppearanceResult['thumbnail'];
};
