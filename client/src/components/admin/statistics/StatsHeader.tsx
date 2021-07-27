import React from 'react';
import {
  Container,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';

interface StatsHeaderProps {}

export const StatsHeader: React.FC<StatsHeaderProps> = (): JSX.Element => {
  return (
    <Container maxW='container.sm' bg='gray.700' padding={3} borderRadius='lg'>
      <StatGroup>
        <Stat>
          <StatLabel>Ingresos mensuales</StatLabel>
          <StatNumber>₡15,000,000</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Ingresos diarios</StatLabel>
          <StatNumber>₡1,000,000</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total ordenes mensuales</StatLabel>
          <StatNumber>1000</StatNumber>
        </Stat>
      </StatGroup>
    </Container>
  );
};
