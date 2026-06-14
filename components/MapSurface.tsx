import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "../theme";
import PetAvatar from "./PetAvatar";

type MapSurfaceProps = {
  height?: number;
  showRoute?: boolean;
  compact?: boolean;
  destinationName?: string;
  outfitId?: string;
};

export default function MapSurface({
  height = 360,
  showRoute,
  compact,
  destinationName = "Student Union",
  outfitId
}: MapSurfaceProps) {
  return (
    <View style={[styles.map, { height }, compact && styles.compactMap]}>
      <View style={[styles.street, styles.streetOne]} />
      <View style={[styles.street, styles.streetTwo]} />
      <View style={[styles.street, styles.streetThree]} />
      <View style={[styles.block, styles.blockOne]} />
      <View style={[styles.block, styles.blockTwo]} />
      <View style={[styles.block, styles.blockThree]} />
      <View style={[styles.block, styles.blockFour]} />
      {showRoute ? (
        <>
          <View style={[styles.route, styles.routeA]} />
          <View style={[styles.route, styles.routeB]} />
          <View style={[styles.route, styles.routeC]} />
        </>
      ) : null}
      <View style={styles.destination}>
        <Text style={styles.destinationText}>{destinationName}</Text>
      </View>
      <View style={compact ? styles.petCompact : styles.petMarker}>
        <PetAvatar size={compact ? 46 : 66} outfitId={outfitId} />
      </View>
      <View style={styles.floorChip}>
        <Text style={styles.floorText}>{compact ? "Mini map" : "Indoor Level 2"}</Text>
      </View>
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
  street: {
    position: "absolute",
    backgroundColor: colors.mapStreet,
    borderRadius: radius.pill
  },
  streetOne: {
    left: -20,
    right: -20,
    top: "33%",
    height: 34,
    transform: [{ rotate: "-8deg" }]
  },
  streetTwo: {
    top: -30,
    bottom: -20,
    left: "33%",
    width: 32,
    transform: [{ rotate: "12deg" }]
  },
  streetThree: {
    top: "58%",
    right: -30,
    left: "18%",
    height: 26,
    transform: [{ rotate: "24deg" }]
  },
  block: {
    position: "absolute",
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line
  },
  blockOne: {
    left: spacing.lg,
    top: spacing.lg,
    width: 92,
    height: 74
  },
  blockTwo: {
    right: spacing.lg,
    top: 58,
    width: 128,
    height: 92
  },
  blockThree: {
    left: 42,
    bottom: 42,
    width: 132,
    height: 90
  },
  blockFour: {
    right: 34,
    bottom: 28,
    width: 90,
    height: 76
  },
  route: {
    position: "absolute",
    backgroundColor: colors.accentDark,
    borderRadius: radius.pill
  },
  routeA: {
    left: "19%",
    top: "58%",
    width: 118,
    height: 8,
    transform: [{ rotate: "-20deg" }]
  },
  routeB: {
    left: "42%",
    top: "45%",
    width: 94,
    height: 8,
    transform: [{ rotate: "-64deg" }]
  },
  routeC: {
    right: "20%",
    top: "31%",
    width: 76,
    height: 8,
    transform: [{ rotate: "14deg" }]
  },
  destination: {
    position: "absolute",
    top: "18%",
    right: spacing.lg,
    backgroundColor: colors.ink,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  destinationText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800"
  },
  petMarker: {
    position: "absolute",
    left: "20%",
    bottom: "21%"
  },
  petCompact: {
    position: "absolute",
    left: "28%",
    bottom: "22%"
  },
  floorChip: {
    position: "absolute",
    left: spacing.md,
    top: spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  floorText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "800"
  }
});

