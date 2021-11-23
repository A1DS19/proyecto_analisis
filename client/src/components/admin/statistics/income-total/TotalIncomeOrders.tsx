import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import React from 'react';
import { TotalIncomeOrders as TotalIncomeOrdersType } from '../../../../app/admin/statistics/statisticsSlice';

interface TotalIncomeOrdersProps {
  totalIncomeOrders: TotalIncomeOrdersType;
}

export const TotalIncomeOrders: React.FC<TotalIncomeOrdersProps> = ({
  totalIncomeOrders,
}): JSX.Element => {
  return (
    <React.Fragment>
      <Stat>
        <StatLabel fontSize='lg'>Ganancia monetaria</StatLabel>
        <StatNumber>₡{totalIncomeOrders.totalRevenue}</StatNumber>
        <StatHelpText>
          Cantidad total de órdenes {totalIncomeOrders.totalOrders}
        </StatHelpText>
      </Stat>
    </React.Fragment>
  );
};
