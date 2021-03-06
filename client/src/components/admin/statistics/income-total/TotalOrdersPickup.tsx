import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import React from 'react';
import { TotalIncomeOrders } from '../../../../app/admin/statistics/statisticsSlice';

interface TotalOrdersPickupProps {
  amountOrdersPickup: number;
  totalIncomeOrders: TotalIncomeOrders;
}

export const TotalOrdersPickup: React.FC<TotalOrdersPickupProps> = ({
  amountOrdersPickup,
  totalIncomeOrders,
}): JSX.Element => {
  return (
    <React.Fragment>
      <Stat>
        <StatLabel fontSize='lg'>Total órdenes en sitio</StatLabel>
        <StatNumber>{amountOrdersPickup}</StatNumber>
        <StatHelpText>
          Porcentaje sobre total de órdenes{' '}
          {Math.floor((amountOrdersPickup / totalIncomeOrders.totalOrders) * 100)}%
        </StatHelpText>
      </Stat>
    </React.Fragment>
  );
};
