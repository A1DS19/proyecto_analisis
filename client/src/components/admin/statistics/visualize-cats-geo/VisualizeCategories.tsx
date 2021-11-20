import React from 'react';
import { CategoriesWithAmount } from '../../../../app/admin/statistics/statisticsSlice';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';
import { capitalizeWords } from '../../../../util/functions';

interface VisualizeCategoriesProps {
  categoriesWithAmount: CategoriesWithAmount[];
}

export const VisualizeCategories: React.FC<VisualizeCategoriesProps> = ({
  categoriesWithAmount,
}): JSX.Element => {
  const cleanData = categoriesWithAmount.map((data) => {
    return { name: capitalizeWords(data._id.replaceAll('_', ' ')), value: data.amount };
  });

  return (
    <React.Fragment>
      <ResponsiveContainer width='100%' height={200}>
        <PieChart width={500} height={500}>
          <Pie
            dataKey='value'
            isAnimationActive={false}
            data={cleanData}
            cx='50%'
            cy='50%'
            outerRadius={80}
            fill='#8884d8'
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};
