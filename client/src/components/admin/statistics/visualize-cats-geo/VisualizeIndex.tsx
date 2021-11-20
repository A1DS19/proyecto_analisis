import React from 'react';
import {
  CategoriesWithAmount,
  GeoZoneExpress,
} from '../../../../app/admin/statistics/statisticsSlice';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { VisualizeCategories } from './VisualizeCategories';
import { VisualizeGeo } from './VisualizeGeo';

interface VisualizeIndexProps {
  categoriesWithAmount: CategoriesWithAmount[];
  geoZoneExpress: GeoZoneExpress[];
}

export const VisualizeIndex: React.FC<VisualizeIndexProps> = ({
  categoriesWithAmount,
  geoZoneExpress,
}): JSX.Element => {
  return (
    <React.Fragment>
      <Flex mb={3} justifyContent='space-around'>
        <Heading size='md'>Categorias por la cantidad de órdenes</Heading>
        <Heading size='md'>Ordenes express por zona geografica</Heading>
      </Flex>

      <Flex>
        <VisualizeCategories categoriesWithAmount={categoriesWithAmount} />
        <VisualizeGeo geoZoneExpress={geoZoneExpress} />
      </Flex>
    </React.Fragment>
  );
};
