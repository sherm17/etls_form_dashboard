import * as React from "react";
import * as d3 from "d3";

// order is success, failed, no response


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
  const successIndex = 0;
  const failedIndex = 1;
  const noResponseIndex = 2;


  return pie.map((slice, index) => {
    const successColor = "#3cbc33";
    const failedColor = "#e64432";
    const noResponseColor = "#e6e610";

    let sliceColor;

    if (index === successIndex) {
      sliceColor = successColor
    } else if (index === failedIndex) {
      sliceColor = failedColor
    } else {
      sliceColor = noResponseColor
    }
    return <path d={arc(slice)} key={index} fill={sliceColor} />;
  });
};


export default PieChart;

