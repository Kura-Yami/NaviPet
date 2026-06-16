// Mapbox configuration for NaviPet.
//
// The Mapbox *public* token (pk.*) is read from EXPO_PUBLIC_MAPBOX_TOKEN, which
// Expo inlines from the local .env file at build time (see .env.example). It is
// kept out of source control — set it in .env, never hard-code it here.
export const MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN ?? "";

// Default map style. streets-v12 is the standard 2D street map that matches the
// "Maps (2D)" frame.
export const MAPBOX_STYLE = "mapbox://styles/mapbox/streets-v12";

export type GeoPoint = {
  name: string;
  latitude: number;
  longitude: number;
};

// California State University, Long Beach — campus center. This is the focus
// point the map opens on and where the "You" pet marker is dropped.
export const CSULB: GeoPoint = {
  name: "CSU Long Beach",
  latitude: 33.7838,
  longitude: -118.1141
};

// Default zoom level when opening the map on campus.
export const CSULB_ZOOM = 15;
