import React, { PropsWithChildren } from "react";
import { Modal as RNModal, Pressable, StyleSheet, View } from "react-native";

import { colors, radius, shadows, spacing } from "../theme";

type AppModalProps = PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
}>;

export default function AppModal({ visible, onClose, children }: AppModalProps) {
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => undefined}>
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(24, 32, 51, 0.42)",
    justifyContent: "flex-end"
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.xl,
    ...shadows.card
  }
});

