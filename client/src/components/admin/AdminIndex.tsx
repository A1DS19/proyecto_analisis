import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React from 'react';
import { InventoryIndex } from './inventory/InventoryIndex';
import { CategoryIndex } from './categories/CategoryIndex';
import { UsersIndex } from './users/UsersIndex';
import { OrdersIndex } from './orders/OrdersIndex';
import { StatisticsIndex } from './statistics/StatisticsIndex';
import { PromotionsIndex } from './promotions/PromotionsIndex';

interface AdminIndexProps {}

export const AdminIndex: React.FC<AdminIndexProps> = (): JSX.Element => {
  return (
    <Tabs isFitted variant='enclosed' my={2}>
      <TabList my={2}>
        <Tab>Estadisticas</Tab>
        <Tab>Inventario</Tab>
        <Tab>Promociones</Tab>
        <Tab>Categorías</Tab>
        <Tab>Ordenes</Tab>
        <Tab>Usuarios</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <StatisticsIndex />
        </TabPanel>

        <TabPanel>
          <InventoryIndex />
        </TabPanel>

        <TabPanel>
          <PromotionsIndex />
        </TabPanel>

        <TabPanel>
          <CategoryIndex />
        </TabPanel>

        <TabPanel>{<OrdersIndex />}</TabPanel>

        <TabPanel>{<UsersIndex />}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
