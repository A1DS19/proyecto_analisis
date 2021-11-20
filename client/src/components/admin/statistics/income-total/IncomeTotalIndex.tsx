import { Flex } from '@chakra-ui/react';
import React from 'react';
import { TotalIncomeOrders as TotalIncomeOrdersType } from '../../../../app/admin/statistics/statisticsSlice';
import { TotalIncomeOrders } from './TotalIncomeOrders';
import { TotalOrdersExpress } from './TotalOrdersExpress';
import { TotalOrdersPickup } from './TotalOrdersPickup';

interface IncomeTotalIndexProps {
  totalIncomeOrders: TotalIncomeOrdersType;
  amountOrdersExpress: number;
  amountOrdersPickup: number;
}

export const IncomeTotalIndex: React.FC<IncomeTotalIndexProps> = ({
  totalIncomeOrders,
  amountOrdersExpress,
  amountOrdersPickup,
}): JSX.Element => {
  return (
    <React.Fragment>
      <Flex textAlign='center'>
        <TotalOrdersPickup
          amountOrdersPickup={amountOrdersPickup}
          totalIncomeOrders={totalIncomeOrders}
        />
        <TotalIncomeOrders totalIncomeOrders={totalIncomeOrders} />
        <TotalOrdersExpress
          amountOrdersExpress={amountOrdersExpress}
          totalIncomeOrders={totalIncomeOrders}
        />
      </Flex>
    </React.Fragment>
  );
};
