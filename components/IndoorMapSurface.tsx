import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getIndoorFloor, vivianEngineeringMap } from "../data/indoorMapData";
import { colors, radius, spacing } from "../theme";
import PetAvatar from "./PetAvatar";

type IndoorMapSurfaceProps = {
  height?: number;
  compact?: boolean;
  showRoute?: boolean;
  destinationName?: string;
  selectedFloorId?: string;
  onFloorChange?: (floorId: string) => void;
  viewMode?: "flat" | "stacked";
  outfitId?: string;
};

const roomColors = {
  lab: "#C7E7FF",
  classroom: "#D9F8D9",
  office: "#FFE1B8",
  hall: "#F5F0FF",
  service: "#EAECF0",
  connector: "#FFF1C7"
};

export default function IndoorMapSurface({
  height = 360,
  compact,
  showRoute,
  destinationName = "VEC 214",
  selectedFloorId = "level-2",
  onFloorChange,
  viewMode = "flat",
  outfitId
}: IndoorMapSurfaceProps) {
  const selectedFloor = getIndoorFloor(selectedFloorId);
  const floors =
    viewMode === "stacked"
      ? vivianEngineeringMap.floors
      : [selectedFloor];

  return (
    <View style={[styles.wrap, { height }, compact && styles.compactWrap]}>
      <View style={styles.campusRibbon}>
        <View>
          <Text style={styles.campusLabel}>{vivianEngineeringMap.campus}</Text>
          <Text style={styles.buildingName}>{vivianEngineeringMap.name}</Text>
        </View>
        <View style={styles.providerPill}>
          <Ionicons name="cube" size={14} color={colors.ink} />
          <Text style={styles.providerText}>Mapbox 3D</Text>
        </View>
      </View>

      <View style={[styles.floorScene, viewMode === "stacked" && styles.stackedScene]}>
        {floors.map((floor, index) => {
          const isActive = floor.id === selectedFloor.id;
          const stackedOffset = viewMode === "stacked" ? (floors.length - index - 1) * 26 : 0;

          return (
            <View
              key={floor.id}
              style={[
                styles.floorPlate,
                compact && styles.compactPlate,
                viewMode === "stacked" && {
                  bottom: 18 + stackedOffset,
                  left: 18 + stackedOffset * 0.55,
                  right: 18 - stackedOffset * 0.2,
                  opacity: isActive ? 1 : 0.72,
                  transform: [{ rotate: "-2deg" }]
                },
                viewMode === "flat" && styles.flatPlate,
                isActive && styles.activeFloorPlate
              ]}
            >
              <View style={styles.floorHeader}>
                <Text style={styles.floorLabel}>{floor.label}</Text>
                <Text style={styles.floorName}>{floor.name}</Text>
              </View>

              <View style={styles.mainHall} />
              <View style={styles.crossHall} />

              {floor.rooms.map((room) => (
                <View
                  key={room.id}
                  style={[
                    styles.room,
                    {
                      left: `${room.x}%`,
                      top: `${room.y}%`,
                      width: `${room.width}%`,
                      height: `${room.height}%`,
                      backgroundColor: roomColors[room.type]
                    }
                  ]}
                >
                  {!compact && isActive ? <Text style={styles.roomText}>{room.shortName}</Text> : null}
                </View>
              ))}

              {showRoute && isActive ? (
                <>
                  <View style={[styles.route, styles.routeOne]} />
                  <View style={[styles.route, styles.routeTwo]} />
                  <View style={[styles.route, styles.routeThree]} />
                  <View style={styles.destinationPin}>
                    <Ionicons name="flag" size={15} color="#FFFFFF" />
                  </View>
                  <View style={compact ? styles.petCompact : styles.petMarker}>
                    <PetAvatar size={compact ? 40 : 58} outfitId={outfitId} />
                  </View>
                </>
              ) : null}
            </View>
          );
        })}
      </View>

      <View style={styles.destinationChip}>
        <Ionicons name="location" size={14} color={colors.accentDark} />
        <Text style={styles.destinationText}>{destinationName}</Text>
      </View>

      {!compact ? (
        <View style={styles.floorControls}>
          {vivianEngineeringMap.floors
            .slice()
            .reverse()
            .map((floor) => {
              const active = floor.id === selectedFloor.id;

              return (
                <Pressable
                  key={floor.id}
                  onPress={() => onFloorChange?.(floor.id)}
                  style={[styles.floorButton, active && styles.floorButtonActive]}
                  accessibilityLabel={`Show ${floor.name}`}
                >
                  <Text style={[styles.floorButtonText, active && styles.floorButtonTextActive]}>
                    {floor.label}
                  </Text>
                </Pressable>
              );
            })}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#F4F7F2",
    borderRadius: radius.lg,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: colors.line
  },
  compactWrap: {
    borderRadius: radius.md
  },
  campusRibbon: {
    position: "absolute",
    left: spacing.md,
    top: spacing.md,
    right: spacing.md,
    zIndex: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  campusLabel: {
    color: colors.accentDark,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  buildingName: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  providerPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.line
  },
  providerText: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: "900"
  },
  floorScene: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    top: 72,
    bottom: spacing.md
  },
  stackedScene: {
    top: 86
  },
  floorPlate: {
    position: "absolute",
    borderRadius: radius.md,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderWidth: 1,
    borderColor: colors.line,
    overflow: "hidden",
    minHeight: 188
  },
  compactPlate: {
    minHeight: 120
  },
  flatPlate: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  activeFloorPlate: {
    borderColor: colors.accent,
    borderWidth: 2
  },
  floorHeader: {
    position: "absolute",
    left: spacing.md,
    top: spacing.md,
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  floorLabel: {
    color: colors.ink,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    overflow: "hidden",
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    fontSize: 11,
    fontWeight: "900"
  },
  floorName: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900"
  },
  mainHall: {
    position: "absolute",
    left: "12%",
    right: "10%",
    top: "48%",
    height: 22,
    borderRadius: radius.pill,
    backgroundColor: colors.mapStreet
  },
  crossHall: {
    position: "absolute",
    left: "49%",
    top: "18%",
    bottom: "14%",
    width: 20,
    borderRadius: radius.pill,
    backgroundColor: colors.mapStreet
  },
  room: {
    position: "absolute",
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: "rgba(24,32,51,0.12)",
    alignItems: "center",
    justifyContent: "center"
  },
  roomText: {
    color: colors.ink,
    fontSize: 10,
    fontWeight: "900"
  },
  route: {
    position: "absolute",
    height: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.accentDark
  },
  routeOne: {
    left: "20%",
    top: "70%",
    width: "28%",
    transform: [{ rotate: "-13deg" }]
  },
  routeTwo: {
    left: "45%",
    top: "53%",
    width: "24%",
    transform: [{ rotate: "-62deg" }]
  },
  routeThree: {
    left: "59%",
    top: "30%",
    width: "19%",
    transform: [{ rotate: "3deg" }]
  },
  destinationPin: {
    position: "absolute",
    left: "74%",
    top: "24%",
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accentDark,
    alignItems: "center",
    justifyContent: "center"
  },
  petMarker: {
    position: "absolute",
    left: "17%",
    top: "61%"
  },
  petCompact: {
    position: "absolute",
    left: "18%",
    top: "58%"
  },
  destinationChip: {
    position: "absolute",
    left: spacing.md,
    bottom: spacing.md,
    zIndex: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  destinationText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "900"
  },
  floorControls: {
    position: "absolute",
    right: spacing.md,
    top: 82,
    zIndex: 5,
    gap: spacing.sm
  },
  floorButton: {
    width: 42,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center"
  },
  floorButtonActive: {
    backgroundColor: colors.ink,
    borderColor: colors.ink
  },
  floorButtonText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "900"
  },
  floorButtonTextActive: {
    color: "#FFFFFF"
  }
});
