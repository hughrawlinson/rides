import Link from "next/link";
import { StreamSet, SummaryActivity } from "strava";
import CycleMap from "../CycleMap";

export interface CycleProps {
  id: SummaryActivity["id"];
  elapsed_time: SummaryActivity["elapsed_time"];
  moving_time: SummaryActivity["moving_time"];
  start_date: SummaryActivity["start_date"];
  distance: SummaryActivity["distance"];
  average_speed: SummaryActivity["average_speed"];
  location_city: SummaryActivity["location_city"];
  elev_low: SummaryActivity["elev_low"];
  elev_high: SummaryActivity["elev_high"];
  route?: StreamSet["latlng"]["data"];
}

export function Cycle(props: CycleProps) {
  const {
    id,
    elapsed_time,
    moving_time,
    start_date,
    distance,
    average_speed,
    location_city,
    elev_low,
    elev_high,
    route,
  } = props;
  const elapsed_hours = Math.floor(elapsed_time / 60 / 60);
  const moving_hours = Math.floor(moving_time / 60 / 60);
  return (
    <Link href={`/cycles/${id}`}>
      <article
        style={{
          margin: "80px 0",
        }}
      >
        <div
          style={{
            borderRadius: "4px",
            backdropFilter: "invert(4%)",
            padding: "20px 40px 40px 40px",
            borderTop: "1px solid #AAA",
            borderLeft: "1px solid #AAA",
            borderRight: "1px solid #AAA",
          }}
        >
          <h2>{new Date(start_date).toLocaleDateString()}</h2>
          <table>
            <tbody>
              <tr>
                <td>Distance</td>
                <td>{(distance / 1000).toFixed(0)}km</td>
              </tr>
              <tr>
                <td>Time</td>
                <td>
                  {elapsed_hours >= 1 ? `${elapsed_hours}h` : ""}
                  {((elapsed_time / 60) % 60).toFixed(0)}m
                </td>
              </tr>
              <tr>
                <td>Moving Time</td>
                <td>
                  {moving_hours >= 1 ? `${moving_hours}h` : ""}
                  {((moving_time / 60) % 60).toFixed(0)}m
                </td>
              </tr>
              <tr>
                <td>Average Speed</td>
                <td>{((average_speed / 1000) * 60 * 60).toFixed(2)}km/h</td>
              </tr>
              {location_city && (
                <tr>
                  <td>City</td>
                  <td>{location_city}</td>
                </tr>
              )}
              <tr>
                <td>Elevation</td>
                <td>
                  Between {elev_low}m below and {elev_high}m above sea level
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          style={{
            paddingLeft: "0.5px",
            borderBottom: "1px solid #AAA",
            borderLeft: "1px solid #AAA",
            borderRight: "1px solid #AAA",
          }}
        >
          {route && <CycleMap path={route} />}
        </div>
      </article>
    </Link>
  );
}
