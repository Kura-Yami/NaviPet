import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, radius, spacing } from "../theme";

type SearchBarProps = {
  value?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  onPress?: () => void;
  autoFocus?: boolean;
  right?: React.ReactNode;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search destination",
  onPress,
  autoFocus,
  right
}: SearchBarProps) {
  const content = (
    <View style={styles.search}>
      <Ionicons name="search" size={20} color={colors.faint} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.faint}
        style={styles.input}
        editable={!onPress}
        pointerEvents={onPress ? "none" : "auto"}
        autoFocus={autoFocus}
        returnKeyType="search"
      />
      {right}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button">
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  search: {
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg
  },
  input: {
    flex: 1,
    color: colors.ink,
    fontSize: 16,
    fontWeight: "600"
  }
});

