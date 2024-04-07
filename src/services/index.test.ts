import fetchAndCache from 'lib/fetchAndCache';
import {
  getCharactersByName,
  getComicsByCharacterId,
  getStoriesByCharacterId,
  getSeriesByCharacterId,
} from '.';

jest.mock('lib/fetchAndCache');

jest.spyOn(global.console, 'error');

describe('Character Services', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCharactersByName', () => {
    it('should fetch characters by name and return results', async () => {
      const name = 'Spider-Man';
      const expectedResponse = [{ id: 1, name: 'Spider-Man' }];

      (fetchAndCache as jest.Mock).mockResolvedValue({
        json: jest
          .fn()
          .mockResolvedValue({ data: { results: expectedResponse } }),
      });

      const characters = await getCharactersByName(name);

      expect(characters).toEqual(expectedResponse);
      expect(fetchAndCache).toHaveBeenCalledWith({
        url: expect.stringContaining(name),
        cacheKey: expect.stringContaining(name),
      });
    });

    it('should return empty array if name is not provided', async () => {
      const characters = await getCharactersByName('');
      expect(characters).toEqual([]);
      expect(fetchAndCache).not.toHaveBeenCalled();
    });

    it('should throw error if fetchAndCache fails', async () => {
      const name = 'Spider-Man';

      const error = new Error('Fetch failed');

      (fetchAndCache as jest.Mock).mockRejectedValue(error);

      await getCharactersByName(name);

      expect(console.error).toHaveBeenCalledWith(error);
    });
  });

  describe('getComicsByCharacterId', () => {
    it('should fetch comics by character ID and return results', async () => {
      const characterId = 1;
      const expectedResponse = [{ id: 1, title: 'Comic 1' }];

      (fetchAndCache as jest.Mock).mockResolvedValue({
        json: jest
          .fn()
          .mockResolvedValue({ data: { results: expectedResponse } }),
      });

      const comics = await getComicsByCharacterId(characterId);

      expect(comics).toEqual(expectedResponse);
      expect(fetchAndCache).toHaveBeenCalledWith({
        url: expect.stringContaining(String(characterId)),
        cacheKey: expect.stringContaining(String(characterId)),
      });
    });

    it('should throw error if fetchAndCache fails', async () => {
      const characterId = 1;

      const error = new Error('Fetch failed');

      (fetchAndCache as jest.Mock).mockRejectedValue(error);

      await getComicsByCharacterId(characterId);

      expect(console.error).toHaveBeenCalledWith(error);
    });
  });

  describe('getStoriesByCharacterId', () => {
    it('should fetch stories by character ID and return results', async () => {
      const characterId = 1;
      const expectedResponse = [{ id: 1, title: 'Story 1' }];

      (fetchAndCache as jest.Mock).mockResolvedValue({
        json: jest
          .fn()
          .mockResolvedValue({ data: { results: expectedResponse } }),
      });

      const stories = await getStoriesByCharacterId(characterId);

      expect(stories).toEqual(expectedResponse);
      expect(fetchAndCache).toHaveBeenCalledWith({
        url: expect.stringContaining(String(characterId)),
        cacheKey: expect.stringContaining(String(characterId)),
      });
    });

    it('should throw error if fetchAndCache fails', async () => {
      const characterId = 1;

      const error = new Error('Fetch failed');

      (fetchAndCache as jest.Mock).mockRejectedValue(error);

      await getStoriesByCharacterId(characterId);

      expect(console.error).toHaveBeenCalledWith(error);
    });
  });

  describe('getSeriesByCharacterId', () => {
    it('should fetch series by character ID and return results', async () => {
      const characterId = 1;
      const expectedResponse = [{ id: 1, title: 'Series 1' }];

      (fetchAndCache as jest.Mock).mockResolvedValue({
        json: jest
          .fn()
          .mockResolvedValue({ data: { results: expectedResponse } }),
      });

      const series = await getSeriesByCharacterId(characterId);

      expect(series).toEqual(expectedResponse);
      expect(fetchAndCache).toHaveBeenCalledWith({
        url: expect.stringContaining(String(characterId)),
        cacheKey: expect.stringContaining(String(characterId)),
      });
    });

    it('should throw error if fetchAndCache fails', async () => {
      const characterId = 1;

      const error = new Error('Fetch failed');

      (fetchAndCache as jest.Mock).mockRejectedValue(error);

      await getSeriesByCharacterId(characterId);

      expect(console.error).toHaveBeenCalledWith(error);
    });
  });
});
