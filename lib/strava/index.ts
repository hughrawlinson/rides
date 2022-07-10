import "dotenv/config";
import { Strava } from "strava";

function ensureAvailable<T>(v: T | undefined): v is T {
  if (typeof v === undefined) {
    throw new Error("Value unavailable");
  }
  return true;
}

const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } =
  process.env;

export async function getStravaData() {
  if (!ensureAvailable<string>(STRAVA_CLIENT_ID)) {
    throw new Error("No good big bad");
  }

  if (!ensureAvailable<string>(STRAVA_CLIENT_SECRET)) {
    throw new Error("No good big bad");
  }

  if (!ensureAvailable<string>(STRAVA_REFRESH_TOKEN)) {
    throw new Error("No good big bad");
  }

  const config = {
    client_id: STRAVA_CLIENT_ID,
    client_secret: STRAVA_CLIENT_SECRET,
    refresh_token: STRAVA_REFRESH_TOKEN,
  };

  const strava = new Strava(config);

  try {
    const activities = await strava.activities.getLoggedInAthleteActivities();

    const activitiesWithStreams = (
      await Promise.all(
        activities.map(async (activity) => ({
          activity,
          route: await strava.streams.getActivityStreams({
            id: activity.id,
            keys: ["latlng"],
          }),
        }))
      )
    ).filter(Boolean);

    return activitiesWithStreams;
  } catch (e) {
    console.log(e);
  }
}
