export interface AppearanceResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: AppearanceData;
}

export interface AppearanceData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: AppearanceResult[];
}

export interface AppearanceResult {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: Array<{ type: string; language: string; text: string }>;
  resourceURI: string;
  urls: Array<{ type: string; url: string }>;
  thumbnail: { path: string; extension: string };
  images: Array<{ path: string; extension: string }>;
}
