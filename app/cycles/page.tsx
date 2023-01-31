import { getStravaData } from "../../lib/strava";
import { Cycle, CycleProps } from "../../lib/CycleComponent";

export default async function CycleListPage() {
  const stravaData = await getStravaData();
  console.log(stravaData.map((d) => d.id));

  const props: CycleProps[] = stravaData?.map((activity) => ({
    id: activity.id,
    elapsed_time: activity.elapsed_time,
    moving_time: activity.moving_time,
    start_date: activity.start_date,
    distance: activity.distance,
    average_speed: activity.average_speed,
    location_city: activity.location_city,
    elev_low: activity.elev_low,
    elev_high: activity.elev_high,
  }));

  return (
    <section
      style={{
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1>Cycles</h1>
      {props
        .map(({ id, ...props }) => {
          return Boolean(id) && <Cycle key={id} id={id} {...props} />;
        })
        .filter(Boolean)}
    </section>
  );
}
