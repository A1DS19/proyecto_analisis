import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import React from 'react';
import { TotalIncomeOrders } from '../../../../app/admin/statistics/statisticsSlice';

interface TotalOrdersExpressProps {
  amountOrdersExpress: number;
  totalIncomeOrders: TotalIncomeOrders;
}

export const TotalOrdersExpress: React.FC<TotalOrdersExpressProps> = ({
  amountOrdersExpress,
  totalIncomeOrders,
}): JSX.Element => {
  return (
    <React.Fragment>
      <Stat>
        <StatLabel fontSize='lg'>Total órdenes express</StatLabel>
        <StatNumber>{amountOrdersExpress}</StatNumber>
        <StatHelpText>
          Porcentage sobre total de órdenes{' '}
          {Math.floor((amountOrdersExpress / totalIncomeOrders.totalOrders) * 100)}%
        </StatHelpText>
      </Stat>
    </React.Fragment>
  );
};
