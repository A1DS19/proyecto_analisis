import React from 'react';
import { StatsHeader } from './StatsHeader';
import { StatsBody } from './StatsBody';
import { Image } from '@chakra-ui/react';

interface StatisticsIndexProps {}

export const StatisticsIndex: React.FC<StatisticsIndexProps> = (): JSX.Element => {
  return (
    <React.Fragment>
      <StatsHeader />
      <StatsBody />
      <Image rounded='lg' my={4} src='/mentira.jpeg' />
    </React.Fragment>
  );
};
