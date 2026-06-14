import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useMenu } from "../navigation/MenuContext";
import { colors, radius, shadows, spacing } from "../theme";

export default function BottomNav({ navigation, state }: BottomTabBarProps) {
  const { openMenu } = useMenu();
  const activeRoute = state.routes[state.index]?.name;

  return (
    <View style={styles.shell}>
      <Pressable onPress={openMenu} style={styles.tab} accessibilityLabel="Open menu">
        <Ionicons name="menu" size={26} color={colors.ink} />
        <Text style={styles.label}>Menu</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Pet")}
        style={[styles.tab, activeRoute === "Pet" && styles.activeTab]}
        accessibilityLabel="Open pet customization"
      >
        <MaterialCommunityIcons
          name="paw"
          size={26}
          color={activeRoute === "Pet" ? colors.accentDark : colors.ink}
        />
        <Text style={[styles.label, activeRoute === "Pet" && styles.activeLabel]}>Pet</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Map")}
        style={[styles.tab, activeRoute === "Map" && styles.activeTab]}
        accessibilityLabel="Open map"
      >
        <Ionicons
          name="location"
          size={25}
          color={activeRoute === "Map" ? colors.accentDark : colors.ink}
        />
        <Text style={[styles.label, activeRoute === "Map" && styles.activeLabel]}>Map</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    height: 74,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    ...shadows.card
  },
  tab: {
    width: 90,
    height: 56,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center"
  },
  activeTab: {
    backgroundColor: colors.accentSoft
  },
  label: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 2,
    fontWeight: "700"
  },
  activeLabel: {
    color: colors.accentDark
  }
});

