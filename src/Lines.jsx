export const Lines=({startX,endX,startY,endY,strokeColor})=>{return<><line x1={startX} y1={startY} x2={endX} y2={startY} stroke={strokeColor}></line>
<line x1={startX} y1={endY} x2={endX} y2={endY} stroke={strokeColor}></line>
  <line x1={startX} y1={startY} x2={startX} y2={endY} stroke={strokeColor}></line>
<line x1={endX} y1={startY} x2={endX} y2={endY} stroke={strokeColor}></line></>}