import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React from 'react';

interface AdminIndexProps {}

export const AdminIndex: React.FC<AdminIndexProps> = ({}): JSX.Element => {
  return (
    <Tabs isFitted variant='enclosed' my={2}>
      <TabList my={2}>
        <Tab>Estadisticas</Tab>
        <Tab>Inventario</Tab>
        <Tab>Ordenes</Tab>
        <Tab>Usuarios</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>estadisticas</p>
        </TabPanel>

        <TabPanel>
          <p>inventario</p>
        </TabPanel>

        <TabPanel>
          <p>ordenes</p>
        </TabPanel>

        <TabPanel>
          <p>usuarios</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
