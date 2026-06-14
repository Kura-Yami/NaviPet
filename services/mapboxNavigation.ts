import { vivianEngineeringMap } from "../data/indoorMapData";

declare const process: {
  env: {
    EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN?: string;
  };
};

export type CampusCoordinate = {
  latitude: number;
  longitude: number;
};

export type CampusRouteStep = {
  id: string;
  instruction: string;
  distanceMeters: number;
};

export type CampusRoute = {
  distanceMeters: number;
  durationSeconds: number;
  coordinates: CampusCoordinate[];
  steps: CampusRouteStep[];
};

export const csulbEngineeringStart: CampusCoordinate = {
  latitude: 33.78295,
  longitude: -118.11588
};

export const vivianEngineeringEntrance: CampusCoordinate = {
  latitude: vivianEngineeringMap.mapboxCenter.latitude,
  longitude: vivianEngineeringMap.mapboxCenter.longitude
};

const fallbackRouteCoordinates: CampusCoordinate[] = [
  csulbEngineeringStart,
  { latitude: 33.78318, longitude: -118.11535 },
  { latitude: 33.78345, longitude: -118.11476 },
  vivianEngineeringEntrance
];

export const getMapboxAccessToken = () => process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

export const hasMapboxAccessToken = () => getMapboxAccessToken().trim().length > 0;

export const formatRouteDistance = (meters: number) => {
  if (meters >= 1609) {
    return `${(meters / 1609.344).toFixed(1)} mi`;
  }

  return `${Math.max(1, Math.round(meters * 3.28084))} ft`;
};

export const formatRouteDuration = (seconds: number) => {
  const minutes = Math.max(1, Math.round(seconds / 60));
  return `${minutes} min`;
};

export const getFallbackCampusRoute = (): CampusRoute => ({
  distanceMeters: 132,
  durationSeconds: 175,
  coordinates: fallbackRouteCoordinates,
  steps: [
    {
      id: "outdoor-quad",
      instruction: "Head east toward the Vivian Engineering Center entrance.",
      distanceMeters: 56
    },
    {
      id: "entrance",
      instruction: "Enter Vivian and switch to the indoor floor map.",
      distanceMeters: 76
    }
  ]
});

export async function fetchCampusWalkingRoute(
  start: CampusCoordinate = csulbEngineeringStart,
  destination: CampusCoordinate = vivianEngineeringEntrance
): Promise<CampusRoute> {
  const token = getMapboxAccessToken();

  if (!token) {
    throw new Error("Missing Mapbox access token.");
  }

  const coordinates = `${start.longitude},${start.latitude};${destination.longitude},${destination.latitude}`;
  const url =
    `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinates}` +
    `?alternatives=false&geometries=geojson&overview=full&steps=true&access_token=${token}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Mapbox route request failed with ${response.status}.`);
  }

  const payload = await response.json();
  const route = payload.routes?.[0];

  if (!route?.geometry?.coordinates?.length) {
    throw new Error("Mapbox did not return a walking route.");
  }

  return {
    distanceMeters: route.distance,
    durationSeconds: route.duration,
    coordinates: route.geometry.coordinates.map(([longitude, latitude]: [number, number]) => ({
      latitude,
      longitude
    })),
    steps:
      route.legs?.[0]?.steps?.slice(0, 4).map((step: any, index: number) => ({
        id: `${index}-${step.maneuver?.type ?? "step"}`,
        instruction: step.maneuver?.instruction ?? "Continue on route.",
        distanceMeters: step.distance ?? 0
      })) ?? []
  };
}

export function buildMapboxStaticRouteUrl(route: CampusRoute, width = 720, height = 360) {
  const token = getMapboxAccessToken();

  if (!token) {
    return "";
  }

  const lineFeature = {
    type: "Feature",
    properties: {
      stroke: "#F97316",
      "stroke-width": 5,
      "stroke-opacity": 0.95
    },
    geometry: {
      type: "LineString",
      coordinates: route.coordinates.map((coordinate) => [
        coordinate.longitude,
        coordinate.latitude
      ])
    }
  };

  const overlay = `geojson(${encodeURIComponent(JSON.stringify(lineFeature))})`;
  const startPin = `pin-s+0EA5A4(${csulbEngineeringStart.longitude},${csulbEngineeringStart.latitude})`;
  const destinationPin = `pin-l+F97316(${vivianEngineeringEntrance.longitude},${vivianEngineeringEntrance.latitude})`;

  return (
    "https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/" +
    `${overlay},${startPin},${destinationPin}/auto/${width}x${height}@2x` +
    `?padding=48,48,48,48&access_token=${token}`
  );
}
