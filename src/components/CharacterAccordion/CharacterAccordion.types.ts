import { AppearanceResult } from 'types/appearance.types';
import { CharacterResult } from 'types/character.types';

type TAppearance = {
  list?: Array<AppearanceResult>;
  loading: boolean;
};

export type TProps = {
  selectedCharacter: CharacterResult;
  appearance: {
    comics: TAppearance;
    series: TAppearance;
    stories: TAppearance;
  };
};
