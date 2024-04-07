import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { TProps } from './CharacterDescription.types';

const CharacterDescription: FC<TProps> = ({
  name,
  description,
  thumbnail: { path, extension },
}) => {
  const thumb = `${path}.${extension}`;

  return (
    <Flex align="center" justify="space-between" gap={2} mb={4}>
      <Box>
        <Heading mb={2}>{name}</Heading>
        <Text>{description || 'Sem descrição'}</Text>
      </Box>
      <Image borderRadius="full" boxSize="150px" src={thumb} alt={name} />
    </Flex>
  );
};

export default CharacterDescription;
