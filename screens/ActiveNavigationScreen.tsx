import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import IndoorMapSurface from "../components/IndoorMapSurface";
import MultisetCameraPanel, { VerificationState } from "../components/MultisetCameraPanel";
import { useAppState } from "../data/AppState";
import { vivianEngineeringMap } from "../data/indoorMapData";
import { destinations } from "../data/mockData";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "ActiveNavigation">;

export default function ActiveNavigationScreen({ navigation, route }: Props) {
  const { selectedOutfitId } = useAppState();
  const { height } = useWindowDimensions();
  const [mode, setMode] = useState<"Camera" | "Map">("Camera");
  const [verificationState, setVerificationState] = useState<VerificationState>("idle");
  const [confidence, setConfidence] = useState(0.38);
  const destination =
    destinations.find((item) => item.id === route.params.destinationId) ?? destinations[0];
  const activeFloorId = destination.floorId ?? "level-2";
  const viewportHeight = Math.max(330, Math.min(470, height * 0.48));

  const handleVerify = () => {
    setVerificationState("scanning");
    setConfidence(0.46);

    setTimeout(() => {
      setVerificationState("localized");
      setConfidence(0.82);
    }, 900);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.turnBanner}>
          <View style={styles.turnIcon}>
            <Ionicons name="arrow-forward" size={30} color="#FFFFFF" />
          </View>
          <View style={styles.turnCopy}>
            <Text style={styles.turnDistance}>In 45 ft</Text>
            <Text style={styles.turnInstruction}>Turn right at the elevator core</Text>
            <Text style={styles.turnNext}>Then continue to {destination.name}</Text>
          </View>
        </View>

        <View style={styles.viewport}>
          {mode === "Camera" ? (
            <MultisetCameraPanel
              state={verificationState}
              confidence={confidence}
              floorLabel={destination.floor.replace("Level ", "L")}
              height={viewportHeight}
              compact
              showProviderCode={false}
              onVerify={handleVerify}
            />
          ) : (
            <IndoorMapSurface
              height={viewportHeight}
              showRoute
              selectedFloorId={activeFloorId}
              viewMode="stacked"
              destinationName={destination.name}
              outfitId={selectedOutfitId}
            />
          )}

          <View style={styles.viewportTools}>
            <Pressable style={styles.toolButton} accessibilityLabel="Recenter route">
              <Ionicons name="locate" size={20} color={colors.ink} />
            </Pressable>
            <Pressable style={styles.toolButton} accessibilityLabel="Toggle compass">
              <Ionicons name="compass" size={20} color={colors.ink} />
            </Pressable>
          </View>

          <View style={styles.floorRail}>
            {vivianEngineeringMap.floors
              .slice()
              .reverse()
              .map((floor) => {
                const active = floor.id === activeFloorId;

                return (
                  <View key={floor.id} style={[styles.floorPill, active && styles.floorPillActive]}>
                    <Text style={[styles.floorPillText, active && styles.floorPillTextActive]}>
                      {floor.label}
                    </Text>
                  </View>
                );
              })}
          </View>
        </View>

        <View style={styles.routeSheet}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetTopRow}>
            <View>
              <Text style={styles.eta}>{destination.eta}</Text>
              <Text style={styles.sheetMeta}>
                {destination.distance} - {destination.building}
              </Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate("MainTabs", { screen: "Map" })}
              style={styles.endButton}
            >
              <Text style={styles.endButtonText}>End</Text>
            </Pressable>
          </View>

          <View style={styles.segmented}>
            {(["Camera", "Map"] as const).map((item) => (
              <Pressable
                key={item}
                onPress={() => setMode(item)}
                style={[styles.segmentItem, mode === item && styles.segmentActive]}
              >
                <Ionicons
                  name={item === "Camera" ? "camera" : "map"}
                  size={16}
                  color={mode === item ? colors.ink : colors.muted}
                />
                <Text style={[styles.segmentText, mode === item && styles.segmentActiveText]}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.stepList}>
            <View style={styles.stepRow}>
              <View style={styles.stepGlyph}>
                <Ionicons name="walk" size={18} color={colors.ink} />
              </View>
              <View style={styles.stepBody}>
                <Text style={styles.stepTitle}>Follow the highlighted corridor</Text>
                <Text style={styles.stepMeta}>Stay on {destination.floor} after visual check</Text>
              </View>
            </View>
            <View style={styles.stepRow}>
              <View style={styles.stepGlyph}>
                <Ionicons name="flag" size={18} color={colors.ink} />
              </View>
              <View style={styles.stepBody}>
                <Text style={styles.stepTitle}>Arrive at {destination.name}</Text>
                <Text style={styles.stepMeta}>NaviPet will confirm at the doorway</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    flex: 1,
    backgroundColor: colors.background
  },
  turnBanner: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.green,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    zIndex: 4
  },
  turnIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center"
  },
  turnCopy: {
    flex: 1
  },
  turnDistance: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 13,
    fontWeight: "900"
  },
  turnInstruction: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 27
  },
  turnNext: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 2
  },
  viewport: {
    flex: 1,
    marginTop: -spacing.sm,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#111827"
  },
  viewportTools: {
    position: "absolute",
    right: spacing.md,
    top: spacing.lg,
    gap: spacing.sm
  },
  toolButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.94)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.line
  },
  floorRail: {
    position: "absolute",
    left: spacing.md,
    top: spacing.lg,
    gap: spacing.sm
  },
  floorPill: {
    width: 44,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center"
  },
  floorPillActive: {
    backgroundColor: colors.ink,
    borderColor: colors.ink
  },
  floorPillText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "900"
  },
  floorPillTextActive: {
    color: "#FFFFFF"
  },
  routeSheet: {
    marginHorizontal: spacing.md,
    marginTop: -spacing.xl,
    marginBottom: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    gap: spacing.md,
    zIndex: 6
  },
  sheetHandle: {
    alignSelf: "center",
    width: 42,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.line
  },
  sheetTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  eta: {
    color: colors.green,
    fontSize: 28,
    fontWeight: "900"
  },
  sheetMeta: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 2
  },
  endButton: {
    minWidth: 72,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: "#FFE4E1",
    borderWidth: 1,
    borderColor: "#FFC9C4",
    alignItems: "center",
    justifyContent: "center"
  },
  endButtonText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "900"
  },
  segmented: {
    flexDirection: "row",
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceWarm,
    borderWidth: 1,
    borderColor: colors.accentSoft,
    padding: 3
  },
  segmentItem: {
    flex: 1,
    minHeight: 38,
    borderRadius: radius.pill,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs
  },
  segmentActive: {
    backgroundColor: colors.accent
  },
  segmentText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "900"
  },
  segmentActiveText: {
    color: colors.ink,
    fontWeight: "900"
  },
  stepList: {
    gap: spacing.md
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  stepGlyph: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center"
  },
  stepBody: {
    flex: 1
  },
  stepTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "900"
  },
  stepMeta: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2
  }
});
