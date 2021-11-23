import React from 'react';
import { GeoZoneExpress } from '../../../../app/admin/statistics/statisticsSlice';
import { capitalizeWords } from '../../../../util/functions';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

interface VisualizeGeoProps {
  geoZoneExpress: GeoZoneExpress[];
}

export const VisualizeGeo: React.FC<VisualizeGeoProps> = ({
  geoZoneExpress,
}): JSX.Element => {
  const cleanData = geoZoneExpress.map((data) => {
    return { name: capitalizeWords(data._id.replaceAll('_', ' ')), value: data.amount };
  });

  return (
    <React.Fragment>
      <ResponsiveContainer width='100%' height={250}>
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
