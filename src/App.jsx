import React from 'react';
import {useState} from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import { useCodes } from './useCodes';
import {dimsDict} from './Data/Derived Data/dimsDict';
import {dimArr,calcQuantiles,yearArr,colorSchemes,dimBij,cntNames} from './utils';
import {clause} from './getClause';
import { Choropleth } from './Choropleth';
import {Legend} from './Legend';
import {Lines} from './Lines';
import { Barchart } from './Barchart';
import { Buttongroup } from './Buttongroup';

export default function App() {

let [width, setWidth]=useState(window.innerWidth);
let [height, setHeight]=useState(window.innerHeight);

  let [dim,setDim]=useState("life_expectancy")

  let [country,setCountry]=useState("Africa (all countries)")
  let [year,setYear]=useState('2021');
const handleResize = () => useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
setHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

  const worldAtlas = useWorldAtlas();
  const data = useData();
  const codes = useCodes();
  const handleChange1 = (event) => {
  setDim(event.target.value);
};
const handleChange2 = (event) => {
  setCountry(event.target.value);
};

  if (!worldAtlas || !data || !codes) {
    return <pre>Loading...</pre>;
  }

  const numericCodeByAlphaCode = new Map();
  codes.forEach(code => {
    const alpha3Code = code['alpha-3'];
    const numericCode = code['country-code'];
    numericCodeByAlphaCode.set(alpha3Code, numericCode);
  });

  const filteredData = data.filter(d => d.Year === year);

  const rowByNumericCode = new Map();
  filteredData.forEach(d => {
    const alpha3Code = d.Code;
    const numericCode = numericCodeByAlphaCode.get(alpha3Code);
    rowByNumericCode.set(numericCode, d);
  });

  const colorValue = d => d[dim];

  const colorScale = d3.scaleSequential(colorSchemes[dim]).domain([
    dimsDict[dim]["mini"],dimsDict[dim]["maxi"]
  ]);
let boundary;
if(width<height){
  if(width<500){
    boundary=0.78*width;
  }
  else {
    boundary=0.4*width;
  }
}
else if(width<1050){boundary=0.3*width;}
else if(width < 1350){boundary=0.25*width;}
else {boundary=0.2*width;}
let dimScale=d3.scaleLinear().domain([dimsDict[dim]["mini"],dimsDict[dim]["maxi"]]).range([40,boundary]);
  let maxi=dimScale(dimsDict[dim]["maxi"]);
  return (<div style={{display:"flex",flexDirection:"column"}}><h2>Africa in Data</h2>
    <div id="dropdown-wrapper"><select id="selectButton1" value={dim} onChange={handleChange1}>
  {dimArr.map(function(item) {
      return (
        <option value={item} key={item}>
          {dimBij[item]}
        </option>
      )
    })}
</select>
    <select id="selectButton2" value={country} onChange={handleChange2}>
{cntNames.map(function(item) {
      return (
        <option value={item} key={item}>
          {item}
        </option>
      )
    })}
</select></div>
  <div><svg id="canvas"  height={height} width={width} style={{backgroundColor:"beige"}}>
  <g id="topgroup" transform={width>1350 && width>height?"translate(130,60) scale(1.5)":width>1050 && width>height?"translate(70,60) scale(1.3)":width>700 && width>height?"translate(20,60) scale(1.25)":width>700 && width<height?"translate(130,40) scale(1.2)":"scale(0.96) translate(15,0)"}><Lines startX={10} endX={maxi+70} startY={0} endY={280}
    strokeColor={colorScale(dimsDict[dim]["maxi"])}                                   />
   {country=="Seychelles" && dim=="unemployment"|| ["Eritrea","Somalia"].includes(country) && dim=="afofi"||["Egypt", "Mozambique", "Somalia", "Seychelles","Liberia"].includes(country) && dim=="hiv"||["Burundi", "Eritrea", "Equatorial Guinea"].includes(country) && dim=="undernourish"?(<text x={boundary/2} y="80" >no data</text>): (<Barchart
        dimsDict={dimsDict}
        dim={dim}
        country={country}
        colorScale={colorScale}
        dimScale= {dimScale}
        clause={clause}
        />)}
  </g>

  <g id="supergroup"  transform= 
      {width>1350 && width>height?"translate(830,-265) scale(1.5)":width>1050 && width>height?"translate(650,-215) scale(1.3)":width>700 && width>height?              "translate(510,-210) scale(1.25)":width>700 && width<height?"scale(1.2) translate(110,130)":"scale(0.96) translate(15,100)"} >
     < Lines startX={10} endX={maxi+70} startY={215} endY={495}
    strokeColor={colorScale(dimsDict[dim]["maxi"])}                                   />
      <Legend
        dimsDict={dimsDict}
        dim={dim}
        colorScale={colorScale}
        calcQuantiles={calcQuantiles}/>
      <Choropleth
        worldAtlas={worldAtlas}
        rowByNumericCode={rowByNumericCode}
        colorScale={colorScale}
        colorValue={colorValue}
        setCountry={setCountry}
      />
    <Buttongroup
      yearArr={yearArr}
      colorScale={colorScale}
      year={year}
      setYear={setYear}
      dimsDict={dimsDict}
      dim={dim}
      />
    </g> 
    </svg></div></div>
  );
};

