import { FC, useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Input as ChakraInput,
  Flex,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { TProps } from './Typeahead.types';
import { Spinner } from '../Loading';

const Typeahead: FC<TProps> = ({
  onChange,
  results,
  loading,
  onClickResult,
  resetOnClickResults,
}) => {
  const [value, setValue] = useState('');

  const Results = useMemo(() => {
    if (loading) {
      return <Spinner />;
    }

    return results?.map((result) => (
      <Flex
        key={result.id}
        backgroundColor="#f1f1f1"
        p={2}
        mx={2}
        alignItems="center"
        borderRadius="8px"
        gap={2}
        as="button"
        onClick={() => {
          if (resetOnClickResults) {
            setValue('');
          }
          onClickResult?.(result);
        }}
      >
        <Avatar src={result.thumbnail} /> {result.name}
      </Flex>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  return (
    <Box my={5} position="relative">
      <InputGroup>
        <ChakraInput
          placeholder="Digite o nome do super-heroí(na)"
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          value={value}
        />
        <InputRightElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputRightElement>
      </InputGroup>

      {value && (
        <Flex
          gap={2}
          flexDirection="column"
          maxHeight="500px"
          overflowY="auto"
          marginTop={2}
          py={2}
          position="absolute"
          width="100%"
          backgroundColor="white"
          boxShadow="0px 8px 32px -8px rgba(0,0,0,0.4)"
          borderRadius="8px"
        >
          {Results}
        </Flex>
      )}
    </Box>
  );
};

export default Typeahead;
