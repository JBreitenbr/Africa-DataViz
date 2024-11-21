export const Buttongroup = ({
  yearArr,
  colorScale,
  year,
  setYear,
  dimsDict,
  dim
}) =>
  yearArr.map((d,i) => (
    <><rect
      y={468}
      x={(2*i+1)*15+8}
      height={0.9*16.5}
      width= {2*15}
      stroke="darkgrey"
      fill={year==d?"lightgrey":"white"}
    ></rect>
    <text style={{fontSize:`${0.5*16.5}px`}} onClick={()=>setYear(d)} x={(2*i+1.5)*15+6} y={478}>{d}</text></>
  ));