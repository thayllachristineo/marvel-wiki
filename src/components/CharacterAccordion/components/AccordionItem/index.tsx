import {
  AccordionItem as ChakraAccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Divider,
  Text,
} from '@chakra-ui/react';
import { FC, useMemo } from 'react';

import { TProps } from './AccordionItem.types';

import ContentList from '../ContentItem';
import { Spinner } from 'components/Loading';

const AccordionItem: FC<TProps> = ({ name, onClick, list, loading }) => {
  const Listings = useMemo(() => {
    if (!list?.length) return <Text>Nenhuma aparição</Text>;
    return list?.map(
      ({ title, description, textObjects, thumbnail }, index) => (
        <div key={`${title}-${index}`}>
          <ContentList
            title={title}
            description={description}
            textObjects={textObjects}
            thumbnail={thumbnail}
          />
          {index < list?.length - 1 && <Divider />}
        </div>
      ),
    );
  }, [list]);

  return (
    <ChakraAccordionItem p={0}>
      {({ isExpanded }) => (
        <>
          <AccordionButton
            onClick={() => !isExpanded && !list && onClick()}
            px={1}
            py={2}
          >
            <Heading as="h3" size="md">
              Participação em {name}
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel p={1}>
            {loading ? <Spinner /> : <>{Listings}</>}
          </AccordionPanel>
        </>
      )}
    </ChakraAccordionItem>
  );
};

export default AccordionItem;
