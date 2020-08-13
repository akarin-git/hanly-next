import L from "leaflet";
import { Map, Marker, TileLayer } from "react-leaflet";

function PersonMap({ longitude, latitude }) {
  const pinIcon = L.icon({
    iconUrl:
      "https://res.cloudinary.com/kiyopikko/image/upload/v1561616038/marker_di3ojx.svg",
    shadowUrl:
      "https://res.cloudinary.com/kiyopikko/image/upload/v1561616038/marker-shadow_cpdzbh.png",
    iconSize: [18, 25],
    iconAnchor: [0, 0],
    shadowSize: [26, 20],
    shadowAnchor: [0, -5],
  });
  const position = [latitude, longitude];

  return (
    <Map center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" maxZoom={19} />
      <Marker position={position} icon={pinIcon} />
    </Map>
  );
}

export default React.memo(PersonMap);
