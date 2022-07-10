import { getStravaData } from "../lib/strava";

console.log(JSON.stringify(await getStravaData(), null, 2));
