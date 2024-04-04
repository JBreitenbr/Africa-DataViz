export const Legend = ({
  dimsDict,
  dim,
  colorScale,
  calcQuantiles
}) =>
  calcQuantiles(dimsDict[dim]["mini"],dimsDict[dim]["maxi"]).map((d,i) => (
    <><rect
      className="legend"
      y={225}
      x={(2*i+1)*18+5}
      height={0.9*16.5}
      width= {2*18}
      fill={colorScale(d)}
    ></rect>
    <text style={{fontSize:`${0.45*16.5}px`}} x={(2*i+1.5)*18+1} y={225+1.5*16.5}>{d}</text></>
  ));