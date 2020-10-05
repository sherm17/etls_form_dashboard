import * as React from "react";
import * as d3 from "d3";

const PieChart = ({ data }) => {
  const height = 400;
  const width = 400;

  let pie = d3.pie()(data);

  return (
    <div className="pie-chart" style={{textAlign: "center"}}>
      <svg height={height} width={width}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          <Slice pie={pie} />
        </g>
      </svg>
    </div>
  );
}


// Create a slice of the pie chart. 
const Slice = props => {
  let { pie } = props;
  let arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(100);

  // Slice color is based 
  const successStatusIndex = 0;
  const failedStatusIndex = 1;
  const noResponseIndex = 2;
  const runningStatusIndex = 3;
  
  return pie.map((slice, index) => {
    const successColor = "#3cbc33";
    const failedColor = "#e64432";
    const noResponseColor = "#e6e610";
    const runningColor = "#fac32d";

    let sliceColor;

    if (index === successStatusIndex) {
      sliceColor = successColor;
    } else if (index === failedStatusIndex) {
      sliceColor = failedColor;
    } else if (index === noResponseIndex) {
      sliceColor = noResponseColor;
    } else if (index === runningStatusIndex) {
      sliceColor = runningColor;
    }
    return <path d={arc(slice)} key={index} fill={sliceColor} />;
  });
};


export default PieChart;

