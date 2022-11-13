import { Cycle } from "../../../lib/CycleComponent";
import { getStravaActivityAndMap } from "../../../lib/strava";

export default async function CyclePage({
  params,
}: {
  params: Record<string, string>;
}) {
  var { id } = params;
  const { activity, stream } = await getStravaActivityAndMap(parseInt(id));
  return <Cycle {...activity} route={stream.latlng.data} />;
}
