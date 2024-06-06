import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Indicator } from '../types';

interface ChartProps {
  data: Indicator[];
  xDataKey: string;
  yDataKeys: string[];
  colors: string[];
  timeGranularity: string;
}

interface AggregatedData {
  date: string;
  [key: string]: number | string;
}

const aggregateData = (data: Indicator[], xDataKey: string, timeGranularity: string, yDataKeys: string[]): AggregatedData[] => {
  const aggregatedData: Record<string, AggregatedData> = {};

  data.forEach((item) => {
    const date = new Date((item as any)[xDataKey]);
    let key: string;

    switch (timeGranularity) {
      case 'monthly':
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
        break;
      case 'yearly':
        key = `${date.getFullYear()}`;
        break;
      default:
        key = date.toISOString().split('T')[0];
        break;
    }

    if (!aggregatedData[key]) {
      aggregatedData[key] = { date: key };
    }

    yDataKeys.forEach((yKey) => {
      if (!aggregatedData[key][yKey]) {
        aggregatedData[key][yKey] = 0;
      }
      aggregatedData[key][yKey] += (item as any)[yKey];
    });
  });

  console.log('AggregatedData');
  console.log(aggregatedData);

  return Object.values(aggregatedData);
};

const formatXAxis = (tickItem: string, timeGranularity: string) => {
  const date = new Date(tickItem);
  if (isNaN(date.getTime())) return tickItem;

  switch (timeGranularity) {
    case 'monthly':
      return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    case 'yearly':
      return date.getFullYear().toString();
    default:
      return date.toLocaleDateString();
  }
};

const Chart: React.FC<ChartProps> = ({ data, xDataKey, yDataKeys, colors, timeGranularity }) => {
  const aggregatedData = useMemo(
    () => aggregateData(data, xDataKey, timeGranularity, yDataKeys),
    [data, xDataKey, timeGranularity, yDataKeys]
  );

  const getBarSize = () => {
    switch (timeGranularity) {
      case 'monthly':
        return 20;
      case 'yearly':
        return 40;
      default:
        return 10;
    }
  };

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={aggregatedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(tickItem) => formatXAxis(tickItem, timeGranularity)} />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <YAxis yAxisId="gender_parity" orientation="right" scale="auto" domain={[0, 10]} />
        <Tooltip />
        <Legend />
        {yDataKeys.map((key, index) => {
          if (["female_headcount", "male_headcount"].indexOf(key) !== -1) {
            return <Bar yAxisId="right" type="monotone" dataKey={key} fill={colors[index % colors.length]} key={`${key}-${index}`} barSize={getBarSize()} />  
          }
          if (["gender_parity_ratio"].indexOf(key) !== -1) {
            return <Bar yAxisId="gender_parity" type="monotone" dataKey={key} fill={colors[index % colors.length]} key={`${key}-${index}`} barSize={getBarSize()} />  
          }
          
          return <Bar yAxisId="left" type="monotone" dataKey={key} fill={colors[index % colors.length]} key={`${key}-${index}`} barSize={getBarSize()} />
    })}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;