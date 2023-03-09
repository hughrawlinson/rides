import "dotenv/config";
import { DetailedActivity, Strava, StreamSet, SummaryActivity } from "strava";

function ensureAvailable<T>(v: T | undefined): v is T {
  if (typeof v === undefined) {
    throw new Error("Value unavailable");
  }
  return true;
}

const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } =
  process.env;

export async function getStravaData(): Promise<SummaryActivity[]> {
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

    return activities;
  } catch (e) {
    console.error(e);
  }
  throw new Error("Failed to load activity from Strava");
}

export async function getStravaActivityAndMap(
  id: number
): Promise<{ activity: DetailedActivity; stream: StreamSet } | null> {
  if (!id) {
    return null;
  }

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
    const activity = await strava.activities.getActivityById({ id });
    const stream = await strava.streams.getActivityStreams({
      id,
      keys: ["latlng"],
    });
    return { activity, stream };
  } catch (e) {
    console.error(e);
  }
  throw new Error("Failed to load activity from Strava");
}
