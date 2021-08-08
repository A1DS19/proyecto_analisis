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
      <Image
        rounded='lg'
        my={4}
        src='https://ufidelitas.sharepoint.com/sites/SC-630AnlisisyModeladodeRequerimientosKN/Documentos%20compartidos/Grupo%202%20-%20Juan%20Jose/WhatsApp%20Image%202021-08-01%20at%204.35.30%20PM.jpeg'
      />
    </React.Fragment>
  );
};
