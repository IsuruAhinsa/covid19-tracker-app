import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { CssBaseline, Grid } from "@mui/material";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import { Box } from "@mui/system";
import { sortData } from "./utils";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState("worldwide");
	const [country, setCountry] = useState(selectedCountry);
	const [tableData, setTableData] = useState([]);
	const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -10.4796 });
	const [mapZoom, setMapZoom] = useState(3);
	const [mapCountries, setMapCountries] = useState([]);
	const [casesType, setCasesType] = useState("cases");

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));
					setCountries(countries);
					const sortedData = sortData(data);
					setTableData(sortedData);
					setMapCountries(data);
				});
		};
		getCountriesData();
	}, []);

	const changeCountry = async (event) => {
		const countryCode = event.target.value;
		const url =
			countryCode === "worldwide"
				? `https://disease.sh/v3/covid-19/all`
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;

		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setSelectedCountry(countryCode);
				setCountry(data);
				setMapCenter({
					lat: Number(data.countryInfo.lat),
					lng: Number(data.countryInfo.long),
				});
				setMapZoom(4);
			});
	};

	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((response) => response.json())
			.then((data) => {
				setCountry(data);
			});
	}, []);

	return (
		<Grid container component="main" spacing={1} padding={3}>
			<CssBaseline />
			<Grid item xs={9}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<h3>Covid 19 Dashboard Tracker</h3>
					<FormControl sx={{ m: 1, minWidth: 200 }}>
						<Select
							displayEmpty
							value={selectedCountry}
							onChange={changeCountry}
							size="small"
						>
							<MenuItem value="worldwide">
								<em>Worldwide</em>
							</MenuItem>
							{countries.map((country, index) => (
								<MenuItem key={index} value={country.value}>
									{country.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<InfoBox
						onClick={(e) => setCasesType("cases")}
						title="Cases"
						cases={country.todayCases}
						total={country.cases}
					/>
					<InfoBox
						onClick={(e) => setCasesType("recovered")}
						title="Recovered"
						cases={country.todayRecovered}
						total={country.recovered}
					/>
					<InfoBox
						onClick={(e) => setCasesType("deaths")}
						title="Death"
						cases={country.todayDeaths}
						total={country.deaths}
					/>
				</Box>
				<Box>
					<Map
						center={mapCenter}
						zoom={mapZoom}
						countries={mapCountries}
						casesType={casesType}
					/>
				</Box>
			</Grid>
			<Grid item xs={3}>
				<Box>
					<h4>Live cases by country</h4>
					<Table countries={tableData} />
					<h4>Worldwide New Cases</h4>
					<LineGraph />
				</Box>
			</Grid>
		</Grid>
	);
}

export default App;
