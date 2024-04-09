import { Accordion } from '@chakra-ui/react';
import { FC } from 'react';

import { TProps } from './CharacterAccordion.types';
import CharacterAccordionItem from './components/AccordionItem';

const CharacterAccordion: FC<TProps> = ({
  selectedCharacter,
  appearance: { comics, series, stories } = {},
}) => {
  const accordionItems = [
    {
      name: 'Quadrinhos',
      onClick: () => comics?.onClick(selectedCharacter.id),
      list: comics?.list,
      loading: comics?.loading,
    },
    {
      name: 'Séries de Quadrinhos',
      onClick: () => series?.onClick(selectedCharacter.id),
      list: series?.list,
      loading: series?.loading,
    },
    {
      name: 'Histórias em Quadrinhos',
      onClick: () => stories?.onClick(selectedCharacter.id),
      list: stories?.list,
      loading: stories?.loading,
    },
  ];

  return (
    <Accordion allowMultiple>
      {accordionItems.map(({ name, onClick, list, loading }) => (
        <CharacterAccordionItem
          key={name}
          name={name}
          onClick={onClick}
          list={list}
          loading={loading}
        />
      ))}
    </Accordion>
  );
};

export default CharacterAccordion;
