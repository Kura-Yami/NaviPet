import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Outfit } from "../data/mockData";
import { colors, radius, shadows, spacing } from "../theme";

type OutfitCardProps = {
  outfit: Outfit;
  selected?: boolean;
  purchased?: boolean;
  onPress: () => void;
};

export default function OutfitCard({ outfit, selected, purchased, onPress }: OutfitCardProps) {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.selected]}>
      <View style={[styles.iconWrap, { backgroundColor: outfit.color }]}>
        <MaterialCommunityIcons name={outfit.icon as never} size={26} color="#FFFFFF" />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {outfit.name}
      </Text>
      <Text style={styles.price}>{purchased ? "Owned" : `${outfit.price} gems`}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    minHeight: 132,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.soft
  },
  selected: {
    borderColor: colors.accentDark,
    backgroundColor: colors.accentSoft
  },
  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md
  },
  name: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800"
  },
  price: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: spacing.xs
  }
});

