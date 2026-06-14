import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { vivianEngineeringMap } from "../data/indoorMapData";
import { colors, radius, spacing } from "../theme";

export type VerificationState = "idle" | "scanning" | "localized" | "unavailable";

type MultisetCameraPanelProps = {
  state: VerificationState;
  confidence?: number;
  floorLabel?: string;
  height?: number;
  compact?: boolean;
  showProviderCode?: boolean;
  onVerify?: () => void;
};

const copy = {
  idle: {
    title: "Ready for visual check",
    detail: "Point toward a hallway marker",
    icon: "scan"
  },
  scanning: {
    title: "Checking surroundings",
    detail: "Matching camera frame to VEC scan",
    icon: "radio"
  },
  localized: {
    title: "Location verified",
    detail: "Route is aligned to indoor map",
    icon: "checkmark-circle"
  },
  unavailable: {
    title: "VPS unavailable",
    detail: "Use floor map until camera check returns",
    icon: "alert-circle"
  }
} as const;

export default function MultisetCameraPanel({
  state,
  confidence = 0.38,
  floorLabel = "L2",
  height = 284,
  compact,
  showProviderCode = true,
  onVerify
}: MultisetCameraPanelProps) {
  const content = copy[state];
  const clampedConfidence = Math.min(Math.max(confidence, 0), 1);

  return (
    <View style={styles.wrap}>
      <View style={[styles.cameraFrame, { height }, compact && styles.compactFrame]}>
        <View style={styles.scanGrid}>
          {[0, 1, 2, 3].map((line) => (
            <View key={line} style={[styles.scanLine, { top: `${22 + line * 16}%` }]} />
          ))}
          {[0, 1, 2].map((line) => (
            <View key={line} style={[styles.verticalLine, { left: `${28 + line * 18}%` }]} />
          ))}
        </View>

        <View style={styles.targetBox}>
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />
        </View>

        <View style={styles.cameraTopBar}>
          <View style={styles.liveDot} />
          <Text style={styles.cameraLabel}>Multiset VPS</Text>
          <Text style={styles.floorBadge}>{floorLabel}</Text>
        </View>

        <View style={[styles.cameraBottomBar, compact && styles.compactCameraBottomBar]}>
          <Ionicons name={content.icon} size={18} color="#FFFFFF" />
          <View style={styles.statusTextWrap}>
            <Text style={styles.statusTitle}>{content.title}</Text>
            <Text style={styles.statusDetail}>{content.detail}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.metaRow, compact && styles.compactMetaRow]}>
        <View style={styles.confidenceWrap}>
          <View style={styles.confidenceHeader}>
            <Text style={styles.metaLabel}>Confidence</Text>
            <Text style={styles.confidenceValue}>{Math.round(clampedConfidence * 100)}%</Text>
          </View>
          <View style={styles.confidenceTrack}>
            <View style={[styles.confidenceFill, { width: `${clampedConfidence * 100}%` }]} />
          </View>
        </View>
        <Pressable onPress={onVerify} style={[styles.verifyButton, compact && styles.compactVerifyButton]}>
          <Ionicons name="camera" size={18} color={colors.ink} />
          <Text style={styles.verifyText}>{state === "localized" ? "Recheck" : "Verify"}</Text>
        </Pressable>
      </View>

      {showProviderCode ? (
        <View style={styles.providerRow}>
          <Text style={styles.providerText}>{vivianEngineeringMap.multiset.mapCode}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md
  },
  cameraFrame: {
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#263244",
    position: "relative"
  },
  compactFrame: {
    borderRadius: 0,
    borderWidth: 0
  },
  scanGrid: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.44
  },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.22)"
  },
  verticalLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "rgba(255,255,255,0.16)"
  },
  targetBox: {
    position: "absolute",
    left: "22%",
    right: "22%",
    top: "28%",
    bottom: "26%"
  },
  cornerTopLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 34,
    height: 34,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: colors.accent
  },
  cornerTopRight: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 34,
    height: 34,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderColor: colors.accent
  },
  cornerBottomLeft: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 34,
    height: 34,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: colors.accent
  },
  cornerBottomRight: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 34,
    height: 34,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: colors.accent
  },
  cameraTopBar: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    top: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  liveDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.green
  },
  cameraLabel: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    flex: 1
  },
  floorBadge: {
    color: colors.ink,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    overflow: "hidden",
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    fontSize: 11,
    fontWeight: "900"
  },
  cameraBottomBar: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    borderRadius: radius.md,
    backgroundColor: "rgba(0,0,0,0.52)",
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  compactCameraBottomBar: {
    bottom: 82
  },
  statusTextWrap: {
    flex: 1
  },
  statusTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900"
  },
  statusDetail: {
    color: "rgba(255,255,255,0.74)",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  compactMetaRow: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    zIndex: 5,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md
  },
  confidenceWrap: {
    flex: 1,
    gap: spacing.xs
  },
  confidenceHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  metaLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  confidenceValue: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "900"
  },
  confidenceTrack: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.line,
    overflow: "hidden"
  },
  confidenceFill: {
    height: "100%",
    borderRadius: radius.pill,
    backgroundColor: colors.green
  },
  verifyButton: {
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm
  },
  compactVerifyButton: {
    height: 40,
    paddingHorizontal: spacing.md
  },
  verifyText: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "900"
  },
  providerRow: {
    borderRadius: radius.md,
    backgroundColor: colors.surfaceWarm,
    borderWidth: 1,
    borderColor: colors.accentSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  providerText: {
    color: colors.accentDark,
    fontSize: 11,
    fontWeight: "900"
  }
});
