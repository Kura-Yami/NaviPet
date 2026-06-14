import React, { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  buildMapboxStaticRouteUrl,
  CampusRoute,
  fetchCampusWalkingRoute,
  formatRouteDistance,
  formatRouteDuration,
  getFallbackCampusRoute,
  hasMapboxAccessToken
} from "../services/mapboxNavigation";
import { colors, radius, spacing } from "../theme";

type RouteStatus = "loading" | "live" | "fallback" | "missing-token";

type MapboxCampusRouteProps = {
  height?: number;
  compact?: boolean;
  showSteps?: boolean;
};

export default function MapboxCampusRoute({
  height = 252,
  compact,
  showSteps
}: MapboxCampusRouteProps) {
  const [route, setRoute] = useState<CampusRoute>(() => getFallbackCampusRoute());
  const [status, setStatus] = useState<RouteStatus>(
    hasMapboxAccessToken() ? "loading" : "missing-token"
  );
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadRoute() {
      if (!hasMapboxAccessToken()) {
        setStatus("missing-token");
        return;
      }

      try {
        setStatus("loading");
        const nextRoute = await fetchCampusWalkingRoute();

        if (!cancelled) {
          setRoute(nextRoute);
          setStatus("live");
        }
      } catch {
        if (!cancelled) {
          setRoute(getFallbackCampusRoute());
          setStatus("fallback");
        }
      }
    }

    void loadRoute();

    return () => {
      cancelled = true;
    };
  }, []);

  const mapUrl = useMemo(() => buildMapboxStaticRouteUrl(route), [route]);
  const hasLiveMap = Boolean(mapUrl) && !imageFailed;
  const statusText =
    status === "live"
      ? "Mapbox walking route"
      : status === "loading"
        ? "Loading Mapbox route"
        : status === "missing-token"
          ? "Mapbox token missing"
          : "Offline campus route";

  return (
    <View style={styles.wrap}>
      <View style={[styles.mapShell, { height }, compact && styles.compactShell]}>
        {hasLiveMap ? (
          <Image
            source={{ uri: mapUrl }}
            style={styles.mapImage}
            resizeMode="cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <View style={styles.fallbackMap}>
            <View style={[styles.fallbackPath, styles.fallbackPathOne]} />
            <View style={[styles.fallbackPath, styles.fallbackPathTwo]} />
            <View style={styles.startDot} />
            <View style={styles.endDot}>
              <Ionicons name="flag" size={15} color="#FFFFFF" />
            </View>
          </View>
        )}

        <View style={styles.mapHeader}>
          <View>
            <Text style={styles.eyebrow}>CSULB campus route</Text>
            <Text style={styles.title}>To Vivian Engineering Center</Text>
          </View>
          <View style={styles.mapboxPill}>
            <Ionicons name="map" size={14} color={colors.ink} />
            <Text style={styles.mapboxText}>Mapbox</Text>
          </View>
        </View>

        <View style={styles.statsBar}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{formatRouteDuration(route.durationSeconds)}</Text>
            <Text style={styles.statLabel}>Outdoor ETA</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{formatRouteDistance(route.distanceMeters)}</Text>
            <Text style={styles.statLabel}>To entrance</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{status === "live" ? "Live" : "Plan"}</Text>
            <Text style={styles.statLabel}>{statusText}</Text>
          </View>
        </View>
      </View>

      {showSteps ? (
        <View style={styles.steps}>
          {route.steps.slice(0, 3).map((step, index) => (
            <View key={step.id} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepCopy}>
                <Text style={styles.stepInstruction}>{step.instruction}</Text>
                <Text style={styles.stepDistance}>{formatRouteDistance(step.distanceMeters)}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md
  },
  mapShell: {
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: "#DCE7DC",
    borderWidth: 1,
    borderColor: colors.line,
    position: "relative"
  },
  compactShell: {
    borderRadius: radius.md
  },
  mapImage: {
    width: "100%",
    height: "100%"
  },
  fallbackMap: {
    flex: 1,
    backgroundColor: colors.map,
    position: "relative"
  },
  fallbackPath: {
    position: "absolute",
    height: 9,
    borderRadius: radius.pill,
    backgroundColor: colors.accentDark
  },
  fallbackPathOne: {
    left: "18%",
    top: "58%",
    width: "40%",
    transform: [{ rotate: "-24deg" }]
  },
  fallbackPathTwo: {
    left: "50%",
    top: "39%",
    width: "28%",
    transform: [{ rotate: "-12deg" }]
  },
  startDot: {
    position: "absolute",
    left: "16%",
    top: "61%",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.teal,
    borderWidth: 3,
    borderColor: "#FFFFFF"
  },
  endDot: {
    position: "absolute",
    right: "19%",
    top: "33%",
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.accentDark,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF"
  },
  mapHeader: {
    position: "absolute",
    left: spacing.md,
    top: spacing.md,
    right: spacing.md,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md
  },
  eyebrow: {
    color: colors.accentDark,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  title: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 2
  },
  mapboxPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  mapboxText: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: "900"
  },
  statsBar: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    borderRadius: radius.md,
    backgroundColor: "rgba(255,255,255,0.94)",
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm
  },
  stat: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: spacing.xs
  },
  statValue: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "900"
  },
  statLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "800",
    marginTop: 2,
    textAlign: "center"
  },
  statDivider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: colors.line
  },
  steps: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    gap: spacing.md
  },
  stepRow: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center"
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center"
  },
  stepNumberText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "900"
  },
  stepCopy: {
    flex: 1
  },
  stepInstruction: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800"
  },
  stepDistance: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2
  }
});
