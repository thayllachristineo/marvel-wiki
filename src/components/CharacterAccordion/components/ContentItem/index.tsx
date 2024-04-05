import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { TProps } from './ContentItem.types';

const ContentItem: FC<TProps> = ({
  title,
  description,
  textObjects,
  thumbnail,
}) => {
  const imageSrc = `${thumbnail?.path}.${thumbnail?.extension}`;
  const text = description || textObjects?.[0]?.text;

  return (
    <Box my={4}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: thumbnail ? '130px 2fr' : '1fr',
          gap: '1rem',
        }}
      >
        {thumbnail && (
          <div>
            <Image
              src={imageSrc}
              alt={`${title}`}
              fallbackSrc="https://via.placeholder.com/125x180"
            />
          </div>
        )}
        <div>
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
