import { CharacterResult } from 'types/character.types';

export type TProps = {
  name: CharacterResult['name'];
  description?: CharacterResult['description'];
  thumbnail: CharacterResult['thumbnail'];
};
