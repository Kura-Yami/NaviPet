import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import Card from "../components/Card";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import { useAppState } from "../data/AppState";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "ProfileSettings">;

export default function ProfileSettingsScreen({ navigation }: Props) {
  const { activeUser } = useAppState();
  const [notice, setNotice] = useState("Settings are mocked for the prototype.");

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Settings" subtitle="Profile and account" onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.profileCard}>
          <View style={[styles.avatar, { backgroundColor: activeUser.avatarColor }]}>
            <Text style={styles.avatarText}>{activeUser.name.slice(0, 1)}</Text>
          </View>
          <View style={styles.profileBody}>
            <Text style={styles.name}>{activeUser.name}</Text>
            <Text style={styles.email}>{activeUser.email}</Text>
          </View>
        </Card>

        <View style={styles.stack}>
          <SettingsRow label="Account" icon="person-circle-outline" onPress={() => navigation.navigate("AccountSettings")} />
          <SettingsRow label="Notifications" icon="notifications-outline" onPress={() => setNotice("Notification preferences opened.")} />
          <SettingsRow label="Privacy & Security" icon="shield-checkmark-outline" onPress={() => setNotice("Privacy controls opened.")} />
          <SettingsRow label="Help" icon="help-circle-outline" onPress={() => setNotice("Help center opened.")} />
        </View>

        <Text style={styles.notice}>{notice}</Text>
        <PrimaryButton
          label="Log Out"
          variant="danger"
          onPress={() => navigation.reset({ index: 0, routes: [{ name: "SignIn" }] })}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

type SettingsRowProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

function SettingsRow({ label, icon, onPress }: SettingsRowProps) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={22} color={colors.accentDark} />
      </View>
      <Text style={styles.rowLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.faint} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900"
  },
  profileBody: {
    flex: 1
  },
  name: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900"
  },
  email: {
    color: colors.muted,
    fontSize: 14,
    marginTop: spacing.xs
  },
  stack: {
    gap: spacing.md
  },
  row: {
    minHeight: 64,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center"
  },
  rowLabel: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800",
    flex: 1
  },
  notice: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700"
  }
});

