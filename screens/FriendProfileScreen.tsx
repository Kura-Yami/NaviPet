import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Card from "../components/Card";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import { friends } from "../data/mockData";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "FriendProfile">;

export default function FriendProfileScreen({ navigation, route }: Props) {
  const friend = friends.find((item) => item.id === route.params.friendId) ?? friends[0];
  const [removed, setRemoved] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Friend Profile" subtitle="Shared navigation details" onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.hero}>
          <View style={[styles.avatar, { backgroundColor: friend.avatarColor }]}>
            <Text style={styles.avatarText}>{friend.name.slice(0, 1)}</Text>
          </View>
          <Text style={styles.name}>{friend.name}</Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, friend.status === "Online" && styles.onlineDot]} />
            <Text style={styles.status}>{friend.status}</Text>
          </View>
        </Card>

        <View style={styles.statsRow}>
          <StatCard label="Level" value={`${friend.level}`} icon="star" />
          <StatCard label="Distance" value={friend.distance} icon="navigate" />
        </View>

        <Card style={styles.outfitCard}>
          <View style={styles.outfitIcon}>
            <MaterialCommunityIcons name="tshirt-crew" size={24} color={colors.accentDark} />
          </View>
          <View style={styles.outfitBody}>
            <Text style={styles.outfitTitle}>Current outfit</Text>
            <Text style={styles.outfitMeta}>{friend.outfit} equipped</Text>
          </View>
        </Card>

        <PrimaryButton
          label="Send Message"
          onPress={() => navigation.navigate("Chat", { friendId: friend.id })}
          icon={<Ionicons name="chatbubble" size={18} color={colors.ink} />}
        />
        <PrimaryButton
          label={removed ? "Friend Removed" : "Remove Friend"}
          variant="danger"
          disabled={removed}
          onPress={() => setRemoved(true)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

type StatCardProps = {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
};

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <Card style={styles.statCard}>
      <Ionicons name={icon} size={20} color={colors.accentDark} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
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
  hero: {
    alignItems: "center"
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center"
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900"
  },
  name: {
    color: colors.ink,
    fontSize: 25,
    fontWeight: "900",
    marginTop: spacing.md
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.sm
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.faint
  },
  onlineDot: {
    backgroundColor: colors.green
  },
  status: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "800"
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.md
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    gap: spacing.xs
  },
  statValue: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center"
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800"
  },
  outfitCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  outfitIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center"
  },
  outfitBody: {
    flex: 1
  },
  outfitTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  outfitMeta: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 2
  }
});

