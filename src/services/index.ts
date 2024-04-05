import { md5 } from 'js-md5';

const PRIVATE_KEY = import.meta.env.VITE_API_PRIVATE_KEY;
const PUBLIC_KEY = import.meta.env.VITE_API_PUBLIC_KEY;
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

const generateHash = () => md5(`${Date.now()}${PRIVATE_KEY}${PUBLIC_KEY}`);
const setAuthParams = `ts=${Date.now()}&apikey=${PUBLIC_KEY}&hash=${generateHash()}`;

export const getCharacterByName = async (name: string) => {
  try {
    const url = `${BASE_URL}?name=${name}&${setAuthParams}`;
    const response = await fetch(url);
    const {
      data: { results },
    } = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getComicsByCharacterId = async (id: number) => {
  try {
    const url = `${BASE_URL}/${id}/comics?${setAuthParams}`;
    const response = await fetch(url);
    const {
      data: { results },
    } = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getStoriesByCharacterId = async (id: number) => {
  try {
    const url = `${BASE_URL}/${id}/stories?${setAuthParams}`;
    const response = await fetch(url);
    const {
      data: { results },
    } = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getSeriesByCharacterId = async (id: number) => {
  try {
    const url = `${BASE_URL}/${id}/series?${setAuthParams}`;
    const response = await fetch(url);
    const {
      data: { results },
    } = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
};
