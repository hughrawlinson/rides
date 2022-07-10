import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { SummaryActivity, StreamSet } from "strava";
import { getStravaData } from "../../lib/strava";

interface CycleProps {
  activity: SummaryActivity;
  route: StreamSet;
}

const DynamicCycleMap = dynamic(() => import("../../lib/CycleMap"), {
  ssr: false,
});

function Cycle({ activity, route }: CycleProps) {
  return (
    <article>
      <h2>{new Date(activity.start_date).toLocaleDateString()}</h2>
      <dl>
        <dd>Distance</dd>
        <dt>{(activity.distance / 1000).toFixed(2)}km</dt>
      </dl>
      <Suspense fallback={"...loading"}>
        <DynamicCycleMap
          center={activity.start_latlng}
          path={route.latlng.data}
        />
      </Suspense>
    </article>
  );
}

type CycleListPageProps =
  | {
      type: "success";
      data: NonNullable<Awaited<ReturnType<typeof getStravaData>>>;
    }
  | { type: "failed" };

export default function CycleListPage(props: CycleListPageProps) {
  if (props.type === "failed") {
    return <h1>Failed to load cycling data</h1>;
  }

  return (
    <section>
      <meta name="color-scheme" content="dark light"></meta>
      <h1>Cycles</h1>
      {props.data.map(({ activity, route }) => {
        return <Cycle key={activity.id} activity={activity} route={route} />;
      })}
    </section>
  );
}

export const getStaticProps: GetStaticProps<CycleListPageProps> = async () => {
  const stravaData = await getStravaData();

  if (stravaData) {
    return { props: { type: "success", data: stravaData } };
  }

  return { props: { type: "failed" } };
};
