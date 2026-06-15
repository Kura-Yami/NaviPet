import React, { useMemo } from "react";
import { Platform, StyleSheet, View } from "react-native";

import { CSULB, CSULB_ZOOM, MAPBOX_STYLE, MAPBOX_TOKEN } from "../data/mapbox";
import { colors, radius } from "../theme";

// react-native-webview ships only a native implementation; requiring it on web
// throws. Load it lazily so the web bundle (which uses the iframe fallback
// below) never touches the native module.
let WebView: React.ComponentType<{ source: { html: string }; style?: object; originWhitelist?: string[]; scrollEnabled?: boolean }> | null = null;
if (Platform.OS !== "web") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  WebView = require("react-native-webview").WebView;
}

type MapboxMapProps = {
  height?: number;
  compact?: boolean;
  fill?: boolean;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  markerLabel?: string;
};

// White paw glyph (MaterialCommunityIcons "paw" path) used inside the marker.
const PAW_SVG = `<svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M8.35 3C9.53 2.83 10.78 4.12 11.14 5.9C11.5 7.67 10.85 9.25 9.67 9.43C8.5 9.61 7.24 8.32 6.87 6.54C6.5 4.77 7.17 3.19 8.35 3M15.5 3C16.69 3.19 17.35 4.77 17 6.54C16.62 8.32 15.37 9.61 14.19 9.43C13 9.25 12.35 7.67 12.72 5.9C13.08 4.12 14.33 2.83 15.5 3M3 7.6C4.14 7.11 5.69 7.92 6.5 9.42C7.27 10.92 7 12.54 5.86 13.04C4.72 13.53 3.17 12.72 2.37 11.21C1.61 9.71 1.86 8.09 3 7.6M21 7.6C22.14 8.09 22.39 9.71 21.63 11.21C20.83 12.72 19.28 13.53 18.14 13.04C17 12.54 16.73 10.92 17.5 9.42C18.31 7.92 19.86 7.11 21 7.6M19.33 18.38C19.37 19.32 18.65 20.36 17.79 20.75C16 21.57 13.88 19.87 11.97 19.87C10.07 19.87 7.93 21.64 6.16 20.75C5.2 20.27 4.5 19.18 4.67 18.13C4.88 16.79 6.45 16.05 7.43 15.13C8.69 13.94 9.69 12.07 11.97 12.07C14.25 12.07 15.29 13.92 16.5 15.13C17.5 16.12 19.27 16.97 19.33 18.38Z"/></svg>`;

function buildHtml(longitude: number, latitude: number, zoom: number, label: string) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<link href="https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css" rel="stylesheet" />
<script src="https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.js"></script>
<style>
  html, body, #map { margin: 0; padding: 0; height: 100%; width: 100%; }
  #map { background: #f1f3f4; }
  .you-marker { display: flex; flex-direction: column; align-items: center; }
  .you-bubble {
    background: #fff; border: 1px solid #c4c6d0; border-radius: 9999px;
    padding: 5px 13px; margin-bottom: 8px;
    color: #00244e; font-size: 12px; font-weight: 600; letter-spacing: 0.48px;
    font-family: -apple-system, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
    white-space: nowrap;
  }
  .you-pin {
    position: relative; width: 48px; height: 48px; border-radius: 9999px;
    background: #f5a623; border: 2px solid #fff;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
  }
  .you-pin::after {
    content: ""; position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%);
    width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent;
    border-top: 10px solid #f5a623;
  }
</style>
</head>
<body>
<div id="map"></div>
<script>
  mapboxgl.accessToken = ${JSON.stringify(MAPBOX_TOKEN)};
  var map = new mapboxgl.Map({
    container: "map",
    style: ${JSON.stringify(MAPBOX_STYLE)},
    center: [${longitude}, ${latitude}],
    zoom: ${zoom},
    attributionControl: false
  });
  map.addControl(new mapboxgl.AttributionControl({ compact: true }));
  var el = document.createElement("div");
  el.className = "you-marker";
  el.innerHTML = '<div class="you-bubble">${label}</div><div class="you-pin">${PAW_SVG}</div>';
  new mapboxgl.Marker({ element: el, anchor: "bottom" })
    .setLngLat([${longitude}, ${latitude}])
    .addTo(map);
</script>
</body>
</html>`;
}

export default function MapboxMap({
  height = 360,
  compact,
  fill,
  latitude = CSULB.latitude,
  longitude = CSULB.longitude,
  zoom = CSULB_ZOOM,
  markerLabel = "You"
}: MapboxMapProps) {
  const html = useMemo(
    () => buildHtml(longitude, latitude, zoom, markerLabel),
    [longitude, latitude, zoom, markerLabel]
  );

  return (
    <View
      style={
        fill ? styles.fillMap : [styles.map, { height }, compact && styles.compactMap]
      }
    >
      {Platform.OS === "web" ? (
        // On web, react-native-web renders through react-dom, so a raw iframe
        // mounts the same Mapbox GL JS document the native WebView uses.
        <iframe
          title="Campus map"
          srcDoc={html}
          style={{ border: "none", width: "100%", height: "100%" }}
        />
      ) : WebView ? (
        <WebView
          source={{ html }}
          originWhitelist={["*"]}
          scrollEnabled={false}
          style={styles.webview}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    backgroundColor: colors.map,
    borderRadius: radius.lg,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: colors.line
  },
  compactMap: {
    borderRadius: radius.md
  },
  fillMap: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.map,
    overflow: "hidden"
  },
  webview: {
    flex: 1,
    backgroundColor: colors.map
  }
});
