import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { outfits } from "../data/mockData";
import { colors, radius } from "../theme";

type PetAvatarProps = {
  size?: number;
  outfitId?: string;
  label?: string;
};

export default function PetAvatar({ size = 112, outfitId = "csulb-tee", label }: PetAvatarProps) {
  const outfit = outfits.find((item) => item.id === outfitId) ?? outfits[0];
  const faceSize = size;

  return (
    <View style={styles.wrap}>
      <View style={[styles.pet, { width: faceSize, height: faceSize, borderRadius: faceSize / 2 }]}>
        <View style={[styles.ear, styles.leftEar, { backgroundColor: outfit.color }]} />
        <View style={[styles.ear, styles.rightEar, { backgroundColor: outfit.color }]} />
        <View style={styles.eyeRow}>
          <View style={styles.eye} />
          <View style={styles.eye} />
        </View>
        <View style={styles.nose} />
        <View style={styles.mouth} />
        <View style={[styles.outfitBadge, { backgroundColor: outfit.color }]}>
          <MaterialCommunityIcons name={outfit.icon as never} size={Math.max(16, size * 0.17)} color="#FFFFFF" />
        </View>
      </View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center"
  },
  pet: {
    backgroundColor: colors.accentSoft,
    borderWidth: 4,
    borderColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  ear: {
    width: 32,
    height: 32,
    borderRadius: 16,
    position: "absolute",
    top: 7
  },
  leftEar: {
    left: 4
  },
  rightEar: {
    right: 4
  },
  eyeRow: {
    flexDirection: "row",
    gap: 18,
    marginTop: 12
  },
  eye: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.ink
  },
  nose: {
    marginTop: 12,
    width: 14,
    height: 10,
    borderRadius: 7,
    backgroundColor: colors.accentDark
  },
  mouth: {
    width: 28,
    height: 12,
    borderBottomWidth: 3,
    borderColor: colors.ink,
    borderRadius: radius.pill,
    marginTop: 2
  },
  outfitBadge: {
    position: "absolute",
    right: -4,
    bottom: -2,
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 3,
    borderColor: colors.surface,
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 8,
    fontWeight: "700"
  }
});

