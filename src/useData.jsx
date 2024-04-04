import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://raw.githubusercontent.com/JBreitenbr/Africa-DataViz/main/src/Data/Derived Data/df_choro.csv';

const row = d => {
  return d;
};

export const useData = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};