import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';

interface FullSpinnerProps {}

export const FullSpinner: React.FC<FullSpinnerProps> = ({}): JSX.Element => {
  return (
    <Box textAlign='center' margin='0 auto' my='50%'>
      <Spinner size='xl' thickness='4px' />
    </Box>
  );
};
