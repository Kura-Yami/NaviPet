import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";

import { colors, radius, shadows, spacing } from "../theme";

type CardProps = PropsWithChildren<
  ViewProps & {
    padded?: boolean;
    style?: StyleProp<ViewStyle>;
  }
>;

export default function Card({ children, padded = true, style, ...props }: CardProps) {
  return (
    <View style={[styles.card, padded && styles.padded, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadows.soft
  },
  padded: {
    padding: spacing.lg
  }
});

