export interface AppearanceResponse {
  code: number;
  status: string;
  data: AppearanceData;
}

export interface AppearanceData {
  results: AppearanceResult[];
}

export interface AppearanceResult {
  id: number;
  title: string;
  description?: string;
  textObjects?: Array<{ type: string; language: string; text: string }>;
  thumbnail?: { path: string; extension: string };
  images?: Array<{ path: string; extension: string }>;
}
