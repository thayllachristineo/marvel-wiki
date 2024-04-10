import { Accordion } from '@chakra-ui/react';
import { FC } from 'react';

import { TProps } from './CharacterAccordion.types';
import CharacterAccordionItem from './components/AccordionItem';

const CharacterAccordion: FC<TProps> = ({
  appearance: { comics, series, stories } = {},
}) => {
  const accordionItems = [
    {
      name: 'Quadrinhos',
      list: comics?.list,
      loading: comics?.loading,
    },
    {
      name: 'Séries de Quadrinhos',
      list: series?.list,
      loading: series?.loading,
    },
    {
      name: 'Histórias em Quadrinhos',
      list: stories?.list,
      loading: stories?.loading,
    },
  ];

  return (
    <Accordion allowMultiple>
      {accordionItems.map(({ name, list, loading }) => (
        <CharacterAccordionItem
          key={name}
          name={name}
          list={list}
          loading={loading}
        />
      ))}
    </Accordion>
  );
};

export default CharacterAccordion;
