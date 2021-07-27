import React from 'react';
import { StatsHeader } from './StatsHeader';
import { StatsBody } from './StatsBody';

interface StatisticsIndexProps {}

export const StatisticsIndex: React.FC<StatisticsIndexProps> = (): JSX.Element => {
  return (
    <React.Fragment>
      <StatsHeader />
      <StatsBody />
    </React.Fragment>
  );
};
