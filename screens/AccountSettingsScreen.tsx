import React from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Card from "../components/Card";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import { useAppState } from "../data/AppState";
import { UserAccount, users } from "../data/mockData";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "AccountSettings">;

export default function AccountSettingsScreen({ navigation }: Props) {
  const { activeAccountId, activeUser, switchAccount } = useAppState();
  const previousAccounts = users.filter((user) => user.id !== activeAccountId);

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Account" subtitle="Switch between saved logins" onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.activeCard}>
          <View style={[styles.avatar, { backgroundColor: activeUser.avatarColor }]}>
            <Text style={styles.avatarText}>{activeUser.name.slice(0, 1)}</Text>
          </View>
          <View style={styles.activeBody}>
            <View style={styles.activeTitleRow}>
              <Text style={styles.name}>{activeUser.name}</Text>
              <Text style={styles.badge}>Active</Text>
            </View>
            <Text style={styles.email}>{activeUser.email}</Text>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Previously logged-in accounts</Text>
        <View style={styles.stack}>
          {previousAccounts.map((account) => (
            <AccountRow key={account.id} account={account} onSwitch={() => switchAccount(account.id)} />
          ))}
        </View>

        <PrimaryButton label="Add Account" variant="secondary" onPress={() => navigation.navigate("SignIn")} />
      </ScrollView>
    </SafeAreaView>
  );
}

type RowProps = {
  account: UserAccount;
  onSwitch: () => void;
};

function AccountRow({ account, onSwitch }: RowProps) {
  return (
    <Pressable onPress={onSwitch} style={styles.row}>
      <View style={[styles.smallAvatar, { backgroundColor: account.avatarColor }]}>
        <Text style={styles.smallAvatarText}>{account.name.slice(0, 1)}</Text>
      </View>
      <View style={styles.rowBody}>
        <Text style={styles.rowName}>{account.name}</Text>
        <Text style={styles.rowEmail}>{account.email}</Text>
      </View>
      <View style={styles.switchButton}>
        <Text style={styles.switchText}>Switch</Text>
      </View>
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
  activeCard: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center"
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center"
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900"
  },
  activeBody: {
    flex: 1
  },
  activeTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  name: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900",
    flex: 1
  },
  badge: {
    color: colors.green,
    backgroundColor: "#DFF7E9",
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    fontSize: 12,
    fontWeight: "900"
  },
  email: {
    color: colors.muted,
    marginTop: spacing.xs,
    fontSize: 14
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  stack: {
    gap: spacing.md
  },
  row: {
    minHeight: 74,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md
  },
  smallAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center"
  },
  smallAvatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900"
  },
  rowBody: {
    flex: 1
  },
  rowName: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  rowEmail: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 2
  },
  switchButton: {
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  switchText: {
    color: colors.accentDark,
    fontSize: 13,
    fontWeight: "900"
  }
});

