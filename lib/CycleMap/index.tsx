import { PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";

interface CycleMapProps {
  center: [number, number];
  path: [number, number][];
}

const pathOptions: PathOptions = {
  color: "#A22",
};

// const mapname = "cycle";
const mapname = "atlas";

function avgPoint(points: [number, number][]): [number, number] {
  return points
    .reduce(
      ([ax, ay], [x, y]) => {
        return [ax + x, ay + y];
      },
      [0, 0]
    )
    .map((v) => v / points.length) as [number, number];
}

export default function CycleMap({ center, path }: CycleMapProps) {
  return (
    <MapContainer
      style={{ width: `500px`, height: `${(500 / 16) * 9}px` }}
      center={avgPoint(path)}
      zoom={12}
      scrollWheelZoom={false}
    >
      <TileLayer
        detectRetina
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tile.thunderforest.com/${mapname}/{z}/{x}/{y}.png?apikey=c40f2241ea1d41ee8fdbb41c296cce8d`}
      />
      <Polyline pathOptions={pathOptions} positions={path} />
    </MapContainer>
  );
}
