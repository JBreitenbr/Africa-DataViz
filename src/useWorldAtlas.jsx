import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

export const useWorldAtlas = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(jsonUrl).then(topology => {
      const {countries} = topology.objects;

let africodes=['012', '024', '204', '072', '854', '108', '132', '120', '140', '148', '174', '178', '180', '384', '262', '818', '226', '232', '748', '231', '266', '270', '288', '324', '624', '404', '426', '430', '434', '450', '454', '466', '478', '480', '504', '508', '516', '562', '566', '646', '678', '686', '690', '694', '706', '710', '728', '729', '834', '768', '788', '800', '732', '894', '716']

let newArray=countries.geometries.filter(el=>africodes.includes(el.id));
let countries2={}

countries2["type"]="GeometryCollection";
 countries2["geometries"]=newArray; 
      setData({
        countries: feature(topology, countries2),
      });
    });
  }, []);
  return data;
};