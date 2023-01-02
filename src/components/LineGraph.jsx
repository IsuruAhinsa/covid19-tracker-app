import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import numeral from "numeral";

const LineGraph = () => {
	const [data, setData] = useState({});

	const buildChartData = (data, casesType = "cases") => {
		const chartData = [];
		let lastDataPoint;

		for (let date in data.cases) {
			if (lastDataPoint) {
				const newDataPoint = {
					x: date,
					y: data[casesType][date] - lastDataPoint,
				};

				chartData.push(newDataPoint);
			}
			lastDataPoint = data[casesType][date];
		}

		return chartData;
	};

	useEffect(() => {
		const fetchData = async () => {
			await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
				.then((response) => response.json())
				.then((data) => {
					let chartData = buildChartData(data, "cases");
					setData(chartData);
				});
		};
		fetchData();
	}, []);

	const lineData = {
		datasets: [
			{
				label: "Cases",
				data: data,
				backgroundColor: "rgba(204,16,52,0.5)",
				fill: true,
				borderColor: "#CC1034",
			},
		],
	};

	const options = {
		legend: {
			display: false,
		},
		elements: {
			point: {
				radius: 0,
			},
		},
		maintainAspectRatio: true,
		scales: {
			y: {
				
				grid: {
					display: false
				},
				ticks: {
					callback: function(value, index, values) {
						return numeral(value).format("0a");
					}
				}
			}
		},
		plugins: {
			tooltip: {
				enabled: true,
				mode: "index",
				intersect: false
			}
		}
	};

	return <Line data={lineData} options={options} />;
};

export default LineGraph;
