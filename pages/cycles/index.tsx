import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { SummaryActivity, StreamSet } from "strava";
import { getStravaData } from "../../lib/strava";

interface CycleProps {
  id: SummaryActivity["id"];
  elapsed_time: SummaryActivity["elapsed_time"];
  moving_time: SummaryActivity["moving_time"];
  start_date: SummaryActivity["start_date"];
  distance: SummaryActivity["distance"];
  average_speed: SummaryActivity["average_speed"];
  route: StreamSet["latlng"]["data"];
}

const DynamicCycleMap = dynamic(() => import("../../lib/CycleMap"), {
  ssr: false,
});

function Cycle(props: CycleProps) {
  const {
    elapsed_time,
    moving_time,
    start_date,
    distance,
    average_speed,
    route,
  } = props;
  const elapsed_hours = Math.floor(elapsed_time / 60 / 60);
  const moving_hours = Math.floor(moving_time / 60 / 60);
  return (
    <article
      style={{
        margin: "80px 0",
      }}
    >
      <div
        style={{
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
        <Suspense fallback={"...loading"}>
          <DynamicCycleMap path={route} />
        </Suspense>
      </div>
    </article>
  );
}

type CycleListPageProps =
  | {
      type: "success";
      cycles: CycleProps[];
    }
  | { type: "failed" };

export default function CycleListPage(props: CycleListPageProps) {
  if (props.type === "failed") {
    return <h1>Failed to load cycling data</h1>;
  }

  return (
    <section
      style={{
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1>Cycles</h1>
      {props.cycles.map(({ id, route, ...props }) => {
        return <Cycle key={id} id={id} {...props} route={route} />;
      })}
    </section>
  );
}

export const getStaticProps: GetStaticProps<CycleListPageProps> = async () => {
  const stravaData = await getStravaData();

  if (stravaData) {
    const dataProps: CycleProps[] = stravaData?.map(({ activity, route }) => ({
      id: activity.id,
      elapsed_time: activity.elapsed_time,
      moving_time: activity.moving_time,
      start_date: activity.start_date,
      distance: activity.distance,
      route: route.latlng.data,
      average_speed: activity.average_speed,
    }));

    return { props: { type: "success", cycles: dataProps } };
  }

  return { props: { type: "failed" } };
};
