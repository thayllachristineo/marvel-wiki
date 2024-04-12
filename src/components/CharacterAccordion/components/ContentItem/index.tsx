import { Box, Heading, Image, Text, useMediaQuery } from '@chakra-ui/react';
import { FC } from 'react';

import { TProps } from './ContentItem.types';

const ContentItem: FC<TProps> = ({
  title,
  description,
  textObjects,
  thumbnail,
}) => {
  const [tabletQuery] = useMediaQuery('(min-width: 768px)');
  const [mobileQuery] = useMediaQuery('(max-width: 767px)');

  const imageNotFound =
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

  const imageSrc = `${thumbnail?.path}.${thumbnail?.extension}`;

  const image = imageSrc !== imageNotFound ? imageSrc : undefined;

  const text = description || textObjects?.[0]?.text;

  const gridSize = tabletQuery ? '.5fr 1fr' : '1fr';

  const Thumbnail = () => {
    return (
      thumbnail &&
      image && (
        <Box display={{ base: 'flex', md: 'block' }} justifyContent="center">
          <Image
            src={imageSrc}
            alt={`${title}`}
            fallbackSrc="https://via.placeholder.com/125x180"
            mb={{ base: 5, md: 0 }}
            width={{ base: '200px', md: '180px' }}
          />
        </Box>
      )
    );
  };

  return (
    <Box my={4}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: thumbnail && image && gridSize,
          gap: '1rem',
        }}
      >
        {tabletQuery && <Thumbnail />}

        <div>
          {mobileQuery && <Thumbnail />}
          <Heading as="h4" size="sm">
            {title}
          </Heading>
          {text && <Text>{text}</Text>}
        </div>
      </div>
    </Box>
  );
};

export default ContentItem;
