export interface CharacterResponse {
  code: number;
  status: string;
  data: CharactererData;
}

export interface CharactererData {
  results: CharacterResult[];
}

export interface CharacterResult {
  id: number;
  name: string;
  description: string;
  thumbnail: CharacterThumbnail;
}

export interface CharacterThumbnail {
  path: string;
  extension: string;
}

export interface CharactererAppears {
  available: number;
  items: Array<{ resourceURI: string; name: string; type?: string }>;
}
