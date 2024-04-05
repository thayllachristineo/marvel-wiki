import { useEffect, useState } from 'react';
import { Container } from '@chakra-ui/react';

import Input from './components/Typeahead';
import Description from './components/CharacterDescription';
import CharacterAccordion from './components/CharacterAccordion';

import {
  getCharactersByName,
  getComicsByCharacterId,
  getSeriesByCharacterId,
  getStoriesByCharacterId,
} from './services';
import { CharacterResult } from './@types/character.types';
import { AppearanceResult } from './@types/appearance.types';

const App = () => {
  const [charDataAPI, setCharDataAPI] = useState<Array<CharacterResult>>([]);
  const [comicsDataAPI, setComicsDataAPI] = useState<
    Array<AppearanceResult> | undefined
  >();
  const [seriesDataAPI, setSeriesDataAPI] = useState<
    Array<AppearanceResult> | undefined
  >();
  const [storiesDataAPI, setStoriesDataAPI] = useState<
    Array<AppearanceResult> | undefined
  >();

  const [selectedCharacter, setSelectedCharacter] = useState<CharacterResult>();
  const [selectedCharacterId, setSelectedCharacterId] = useState<number>();

  const [loadingChar, setLoadingChar] = useState<boolean>(false);
  const [loadingListComics, setLoadingListComics] = useState<boolean>(false);
  const [loadingListSeries, setLoadingListSeries] = useState<boolean>(false);
  const [loadingListStories, setLoadingListStories] = useState<boolean>(false);

  const handleOnChange = async (characterName: string) => {
    setLoadingChar(true);
    const data = await getCharactersByName(characterName);
    setCharDataAPI(data || []);
    setLoadingChar(false);
  };

  const handleOnClickComics = async (id: number) => {
    setLoadingListComics(true);
    const data = await getComicsByCharacterId(id);
    setComicsDataAPI(data || []);
    setLoadingListComics(false);
  };

  const handleOnClickSeries = async (id: number) => {
    setLoadingListSeries(true);
    const data = await getSeriesByCharacterId(id);
    setSeriesDataAPI(data || []);
    setLoadingListSeries(false);
  };

  const handleOnClickStories = async (id: number) => {
    setLoadingListStories(true);
    const data = await getStoriesByCharacterId(id);
    setStoriesDataAPI(data || []);
    setLoadingListStories(false);
  };

  useEffect(() => {
    if (selectedCharacterId) {
      setComicsDataAPI(undefined);
      setSeriesDataAPI(undefined);
      setStoriesDataAPI(undefined);
      setSelectedCharacter(
        charDataAPI?.find(({ id }) => id === selectedCharacterId),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCharacterId]);

  return (
    <Container>
      <Input
        onChange={handleOnChange}
        onClickResult={({ id }) => setSelectedCharacterId(id as number)}
        results={charDataAPI?.map((char) => ({
          id: char.id,
          name: char.name,
          thumbnail: `${char.thumbnail?.path}.${char.thumbnail?.extension}`,
        }))}
        loading={loadingChar}
        resetOnClickResults
      />
      {selectedCharacter && (
        <div key={selectedCharacter.id}>
          <Description
            name={selectedCharacter.name}
            description={selectedCharacter.description}
            thumbnail={{
              path: selectedCharacter.thumbnail.path,
              extension: selectedCharacter.thumbnail.extension,
            }}
          />
          <CharacterAccordion
            selectedCharacter={selectedCharacter}
            appearance={{
              comics: {
                onClick: handleOnClickComics,
                list: comicsDataAPI,
                loading: loadingListComics,
              },
              series: {
                onClick: handleOnClickSeries,
                list: seriesDataAPI,
                loading: loadingListSeries,
              },
              stories: {
                onClick: handleOnClickStories,
                list: storiesDataAPI,
                loading: loadingListStories,
              },
            }}
          />
        </div>
      )}
    </Container>
  );
};

export default App;
