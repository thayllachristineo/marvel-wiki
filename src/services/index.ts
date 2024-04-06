import { md5 } from 'js-md5';
import { CharacterResponse } from '../@types/character.types';
import { AppearanceResponse } from '../@types/appearance.types';

const PRIVATE_KEY = import.meta.env.VITE_API_PRIVATE_KEY;
const PUBLIC_KEY = import.meta.env.VITE_API_PUBLIC_KEY;
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

const generateHash = () => md5(`${Date.now()}${PRIVATE_KEY}${PUBLIC_KEY}`);
const setAuthParams = `ts=${Date.now()}&apikey=${PUBLIC_KEY}&hash=${generateHash()}`;

export const getCharactersByName = async (name: string) => {
  if (!name) return [];

  try {
    const url = `${BASE_URL}?nameStartsWith=${name}&${setAuthParams}`;
    const response = await fetch(url);
    const json = (await response.json()) as CharacterResponse;
    return json?.data?.results || [];
  } catch (error) {
    console.error(error);
  }
};

export const getComicsByCharacterId = async (id: number) => {
  try {
    const url = `${BASE_URL}/${id}/comics?${setAuthParams}`;
    const response = await fetch(url);
    const json = (await response.json()) as AppearanceResponse;
    return json?.data?.results;
  } catch (error) {
    console.error(error);
  }
};

export const getStoriesByCharacterId = async (id: number) => {
  try {
    const url = `${BASE_URL}/${id}/stories?${setAuthParams}`;
    const response = await fetch(url);
    const json = (await response.json()) as AppearanceResponse;
    return json?.data?.results;
  } catch (error) {
    console.error(error);
  }
};

export const getSeriesByCharacterId = async (id: number) => {
  try {
    const url = `${BASE_URL}/${id}/series?${setAuthParams}`;
    const response = await fetch(url);
    const json = (await response.json()) as AppearanceResponse;
    return json?.data?.results;
  } catch (error) {
    console.error(error);
  }
};
