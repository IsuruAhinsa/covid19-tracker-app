import { MapContainer, TileLayer } from "react-leaflet";
import { showDataOnMap } from "../utils";
import "./Map.css";

const Map = ({ center, zoom, countries, casesType }) => {
	return (
		<div className="map">
			<MapContainer center={center} zoom={zoom} scrollWheelZoom={false} >
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				{showDataOnMap(countries, casesType)}
			</MapContainer>
		</div>
	);
};

export default Map;