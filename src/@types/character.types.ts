export interface CharacterResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: CharactererData;
}

export interface CharactererData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: CharacterResult[];
}

export interface CharacterResult {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: CharacterThumbnail;
  resourceURI: string;
  comics: CharactererAppears;
  series: CharactererAppears;
  stories: CharactererAppears;
  events: CharactererAppears;
  urls: Array<{ type: string; url: string }>;
}

export interface CharacterThumbnail {
  path: string;
  extension: string;
}

export interface CharactererAppears {
  available: number;
  collectionURI: string;
  items: Array<{ resourceURI: string; name: string; type?: string }>;
  returned: number;
}
