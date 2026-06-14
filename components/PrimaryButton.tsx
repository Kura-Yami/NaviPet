import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "../theme";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  icon?: React.ReactNode;
  disabled?: boolean;
};

export default function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  icon,
  disabled
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, styles[variant], disabled && styles.disabled]}
      accessibilityRole="button"
    >
      <View style={styles.content}>
        {icon}
        <Text style={[styles.label, variant !== "primary" && styles.darkLabel]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm
  },
  primary: {
    backgroundColor: colors.accent
  },
  secondary: {
    backgroundColor: colors.surfaceWarm,
    borderWidth: 1,
    borderColor: colors.accentSoft
  },
  ghost: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line
  },
  danger: {
    backgroundColor: "#FFE4E1",
    borderWidth: 1,
    borderColor: "#FFC9C4"
  },
  disabled: {
    opacity: 0.55
  },
  label: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  darkLabel: {
    color: colors.ink
  }
});

