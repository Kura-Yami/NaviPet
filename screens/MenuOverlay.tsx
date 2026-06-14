import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import PetAvatar from "../components/PetAvatar";
import { useAppState } from "../data/AppState";
import { navigateTo } from "../navigation/navigationRef";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, shadows, spacing } from "../theme";

type MenuOverlayProps = {
  visible: boolean;
  onClose: () => void;
};

type MenuScreen = "Achievements" | "Friends" | "Store" | "ProfileSettings";

type MenuItem = {
  label: string;
  screen: MenuScreen;
  icon: keyof typeof Ionicons.glyphMap;
};

const menuItems: MenuItem[] = [
  { label: "Achievements", screen: "Achievements", icon: "trophy-outline" },
  { label: "Friends", screen: "Friends", icon: "people-outline" },
  { label: "Store", screen: "Store", icon: "bag-outline" },
  { label: "Settings", screen: "ProfileSettings", icon: "settings-outline" }
];

export default function MenuOverlay({ visible, onClose }: MenuOverlayProps) {
  const { activeUser, selectedOutfitId } = useAppState();

  const openScreen = (screen: MenuScreen) => {
    onClose();
    setTimeout(() => navigateTo(screen), 0);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.panel} onPress={() => undefined}>
          <View style={styles.header}>
            <PetAvatar size={72} outfitId={selectedOutfitId} />
            <View style={styles.headerText}>
              <Text style={styles.title}>NaviPet</Text>
              <Text style={styles.subtitle}>{activeUser.name}</Text>
            </View>
          </View>
          <View style={styles.menuStack}>
            {menuItems.map((item) => (
              <Pressable key={item.label} style={styles.menuItem} onPress={() => openScreen(item.screen)}>
                <View style={styles.iconWrap}>
                  <Ionicons name={item.icon} size={22} color={colors.accentDark} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={18} color={colors.faint} />
              </Pressable>
            ))}
          </View>
          <View style={styles.footer}>
            <MaterialCommunityIcons name="map-marker-path" size={18} color={colors.accentDark} />
            <Text style={styles.footerText}>Indoor-first guide mode</Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(24, 32, 51, 0.42)",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  panel: {
    width: "78%",
    maxWidth: 330,
    minHeight: "72%",
    marginLeft: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    ...shadows.card
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.xl
  },
  headerText: {
    flex: 1
  },
  title: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    marginTop: spacing.xs
  },
  menuStack: {
    gap: spacing.md
  },
  menuItem: {
    minHeight: 62,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceWarm,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center"
  },
  menuLabel: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900",
    flex: 1
  },
  footer: {
    marginTop: "auto",
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  footerText: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "800"
  }
});
