import { Flex, Spinner as ChakraSpinner } from '@chakra-ui/react';

export const Spinner = () => {
  return (
    <Flex justify="center" p={4}>
      <ChakraSpinner data-testid="spinner" />
    </Flex>
  );
};
