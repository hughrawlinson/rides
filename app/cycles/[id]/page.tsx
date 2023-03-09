import { Cycle } from "../../../lib/CycleComponent";
import { getStravaActivityAndMap } from "../../../lib/strava";

export default async function CyclePage({
  params,
}: {
  params: Record<string, string>;
}) {
  const { id } = params;
  if (!id) {
    return <h1>Big problems, id {id} does not work!</h1>;
  }
  const result = await getStravaActivityAndMap(parseInt(id));
  if (!result) {
    return <h1>Got nothing back????</h1>;
  }
  const { activity, stream } = result;
  return <Cycle {...activity} route={stream.latlng.data} />;
}
