import { vivianEngineeringMap } from "../data/indoorMapData";

declare const process: {
  env: Record<string, string | undefined>;
};

export type MapboxSceneConfig = {
  provider: "mapbox";
  center: [number, number];
  zoom: number;
  pitch: number;
  buildingId: string;
};

export type MultisetVpsConfig = {
  provider: "multiset";
  mapType: "map" | "map-set";
  mapCode: string;
  confidenceThreshold: number;
  iosSupported: false;
  androidWebXrRequired: true;
};

export type IndoorProviderConfig = {
  mapbox: MapboxSceneConfig;
  multiset: MultisetVpsConfig;
};

export const indoorProviderConfig: IndoorProviderConfig = {
  mapbox: {
    provider: "mapbox",
    center: [
      vivianEngineeringMap.mapboxCenter.longitude,
      vivianEngineeringMap.mapboxCenter.latitude
    ],
    zoom: vivianEngineeringMap.mapboxCenter.zoom,
    pitch: vivianEngineeringMap.mapboxCenter.pitch,
    buildingId: vivianEngineeringMap.id
  },
  multiset: {
    provider: "multiset",
    mapType: vivianEngineeringMap.multiset.mapType,
    mapCode: vivianEngineeringMap.multiset.mapCode,
    confidenceThreshold: vivianEngineeringMap.multiset.confidenceThreshold,
    iosSupported: false,
    androidWebXrRequired: true
  }
};

export const getIndoorProviderReadiness = () => ({
  hasMapboxToken: Boolean(process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN),
  hasMultisetClientId: Boolean(process.env.EXPO_PUBLIC_MULTISET_CLIENT_ID),
  hasMultisetClientSecret: Boolean(process.env.EXPO_PUBLIC_MULTISET_CLIENT_SECRET),
  hasMultisetMapCode: indoorProviderConfig.multiset.mapCode !== "VIVIAN_ENGINEERING_CENTER_MAP_SET"
});
