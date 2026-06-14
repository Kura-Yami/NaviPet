import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Achievement } from "../data/mockData";
import { colors, radius, spacing } from "../theme";

type AchievementCardProps = {
  achievement: Achievement;
};

export default function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name={achievement.icon as never} size={24} color={colors.accentDark} />
      </View>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{achievement.title}</Text>
          <Text style={styles.reward}>{achievement.reward} gems</Text>
        </View>
        <Text style={styles.description}>{achievement.description}</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${achievement.progress}%` as never }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    flexDirection: "row",
    gap: spacing.md
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center"
  },
  body: {
    flex: 1
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  title: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800",
    flex: 1
  },
  reward: {
    color: colors.accentDark,
    fontSize: 12,
    fontWeight: "800"
  },
  description: {
    color: colors.muted,
    fontSize: 13,
    marginTop: spacing.xs
  },
  progressTrack: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.line,
    overflow: "hidden",
    marginTop: spacing.md
  },
  progressFill: {
    height: "100%",
    borderRadius: radius.pill,
    backgroundColor: colors.accent
  }
});

