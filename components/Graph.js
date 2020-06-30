import Chart from "chart.js";
import PropTypes, { object } from "prop-types";
import React, { useEffect } from "react";
import useSWR from "swr";
import {
  getQuantityTypeDetails,
  getPeripheralDetails,
} from "../services/data-api";

let myLineChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'Arial', sans-serif";
Chart.defaults.global.defaultFontColor = "white";

export default function Graph(props) {
  // Initializing
  const chartRef = React.useRef(null);
  let averages = [];
  let time = [];

  // Fetching graph data
  const { data: quantity } = useSWR(
    ["Quantity", props.graph.peripherals[0].quantityTypeId],
    (key, quantityID) => getQuantityTypeDetails(quantityID)
  );

  const { data: peripheralDetails } = useSWR(
    ["Peripheral", props.graph.peripherals[0].peripheralDefinitionId],
    (key, definitionID) => getPeripheralDetails(definitionID)
  );

  // Treating data
  for (let dataPoint of props.data) {
    averages.push(dataPoint.values.average);
    time.push(dataPoint.datetimeStart);
  }

  useEffect(() => {
    function buildChart(chartRef) {
      const myChartRef = chartRef.current.getContext("2d");

      if (typeof myLineChart !== "undefined") myLineChart.destroy();

      myLineChart = new Chart(myChartRef, {
        type: props.graph.type,
        data: {
          //Bring in data
          labels: time,
          datasets: [
            {
              label: `Average (${peripheralDetails && peripheralDetails.name})`,
              data: averages,
              fill: false,
              borderColor: "#f0f",
              backgroundColor: "#f0f",
            },
          ],
        },
        options: {
          //Customize chart options
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "minute",
                  tooltipFormat: "MMM D YYYY, hh:mm:ss",
                  stepSize: 15,
                },
                gridLines: {
                  color: "rgba(256,256,256,0.2)",
                },
              },
            ],
            yAxes: [
              {
                type: "linear",
                gridLines: {
                  color: "rgba(256,256,256,0.2)",
                },
                ticks: {
                  stepSize: 1,
                },
              },
            ],
          },
          tooltips: {
            displayColors: false,
            titleFontSize: 16,
            bodyFontSize: 14,
            xPadding: 10,
            yPadding: 10,
            callbacks: {
              label: (tooltipItem) => {
                return `${tooltipItem.value} ${quantity.physicalUnitSymbol}`;
              },
            },
          },
        },
      });
    }

    buildChart(chartRef);
  }, [chartRef, averages]);

  return (
    <div>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
}

Graph.propTypes = {
  datasets: PropTypes.arrayOf(object),
  labels: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
};
