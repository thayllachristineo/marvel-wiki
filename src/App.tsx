import { useEffect, useState } from 'react';
import { Container, Text, Flex } from '@chakra-ui/react';

import Input from './components/Typeahead';
import Description from './components/CharacterDescription';
import CharacterAccordion from './components/CharacterAccordion';

import {
  getCharactersByName,
  getComicsByCharacterId,
  getSeriesByCharacterId,
  getStoriesByCharacterId,
} from './services';

import { CharacterResult } from './types/character.types';
import { AppearanceResult } from './types/appearance.types';

import useNavigatorOnLine from './hooks/useNetworkStatus';

import { NoNetwork } from './Icons/NoNetwork';

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

  const isOnline = useNavigatorOnLine();

  const handleOnChange = async (characterName: string) => {
    setLoadingChar(true);
    const data = await getCharactersByName(characterName);
    setCharDataAPI(data || []);
    setLoadingChar(false);
  };

  const getComics = async (id: number) => {
    setLoadingListComics(true);
    const data = await getComicsByCharacterId(id);
    setComicsDataAPI(data || []);
    setLoadingListComics(false);
  };

  const getSeries = async (id: number) => {
    setLoadingListSeries(true);
    const data = await getSeriesByCharacterId(id);
    setSeriesDataAPI(data || []);
    setLoadingListSeries(false);
  };

  const getStories = async (id: number) => {
    setLoadingListStories(true);
    const data = await getStoriesByCharacterId(id);
    setStoriesDataAPI(data || []);
    setLoadingListStories(false);
  };

  useEffect(() => {
    if (selectedCharacterId) {
      getComics(selectedCharacterId);
      getSeries(selectedCharacterId);
      getStories(selectedCharacterId);

      setSelectedCharacter(
        charDataAPI?.find(({ id }) => id === selectedCharacterId),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCharacterId]);

  return (
    <Container>
      {!isOnline && (
        <Flex bgColor="red.300" p={4} gap={2}>
          <NoNetwork w={8} h={8} color="white" />
          <Text color="white">Você está offline</Text>
        </Flex>
      )}
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
        <div key={selectedCharacter?.id}>
          <Description
            name={selectedCharacter?.name}
            description={selectedCharacter?.description}
            thumbnail={{
              path: selectedCharacter?.thumbnail?.path,
              extension: selectedCharacter?.thumbnail?.extension,
            }}
          />
          <CharacterAccordion
            selectedCharacter={selectedCharacter}
            appearance={{
              comics: {
                list: comicsDataAPI,
                loading: loadingListComics,
              },
              series: {
                list: seriesDataAPI,
                loading: loadingListSeries,
              },
              stories: {
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
