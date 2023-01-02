import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const sortData = (data) => {
	const sortedData = [...data];

	return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

const casesTypeColors = {
	cases: {
		hex: "#CC1034",
		multiplier: 300,
	},
	recovered: {
		hex: "#7DD71D",
		multiplier: 200,
	},
	deaths: {
		hex: "#FB4443",
		multiplier: 1500,
	},
};

// draw circle on the map with interactive popups
export const showDataOnMap = (data, casesType = "cases") => {
	return data.map((country, index) => (
		<Circle
			key={index}
			center={[country.countryInfo.lat, country.countryInfo.long]}
			fillOpacity={0.4}
			pathOptions={{
				color: casesTypeColors[casesType].hex,
				fillColor: casesTypeColors[casesType].hex,
			}}
			radius={
				Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
			}
		>
			<Popup>
				<div className="info-container">
					<div
						className="info-flag"
						style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
					/>
					<div className="info-countryName">{country.country}</div>
					<div>Cases: {numeral(country.cases).format("0,0")}</div>
					<div>Recovered: {numeral(country.recovered).format("0,0")}</div>
					<div>Death: {numeral(country.deaths).format("0,0")}</div>
				</div>
			</Popup>
		</Circle>
	));
};
