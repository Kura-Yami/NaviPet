import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import AchievementCard from "../components/AchievementCard";
import Card from "../components/Card";
import Header from "../components/Header";
import { achievements, dailyTasks } from "../data/mockData";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Achievements">;

export default function AchievementsScreen({ navigation }: Props) {
  const [tasks, setTasks] = useState(dailyTasks);
  const doneCount = tasks.filter((task) => task.done).length;
  const totalReward = tasks.reduce((sum, task) => sum + (task.done ? task.reward : 0), 0);

  const toggleTask = (taskId: string) => {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task))
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Achievements" subtitle="Progress and daily rewards" onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.summary}>
          <View>
            <Text style={styles.summaryLabel}>Weekly progress</Text>
            <Text style={styles.summaryTitle}>59% complete</Text>
          </View>
          <View style={styles.rewardPill}>
            <Ionicons name="diamond" size={16} color={colors.accentDark} />
            <Text style={styles.rewardText}>{totalReward} daily gems</Text>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Achievement cards</Text>
        <View style={styles.stack}>
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Daily tasks</Text>
        <View style={styles.stack}>
          {tasks.map((task) => (
            <Pressable key={task.id} onPress={() => toggleTask(task.id)} style={styles.taskRow}>
              <View style={[styles.checkbox, task.done && styles.checkboxDone]}>
                {task.done ? <Ionicons name="checkmark" size={18} color="#FFFFFF" /> : null}
              </View>
              <Text style={[styles.taskLabel, task.done && styles.taskDone]}>{task.label}</Text>
              <Text style={styles.taskReward}>{task.reward} gems</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.footerText}>
          {doneCount} of {tasks.length} daily tasks complete
        </Text>
      </ScrollView>
    </SafeAreaView>
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
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md
  },
  summaryLabel: {
    color: colors.accentDark,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  summaryTitle: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: "900",
    marginTop: spacing.xs
  },
  rewardPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.accentSoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  rewardText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "900"
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: "900"
  },
  stack: {
    gap: spacing.md
  },
  taskRow: {
    minHeight: 62,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: "center",
    justifyContent: "center"
  },
  checkboxDone: {
    backgroundColor: colors.green,
    borderColor: colors.green
  },
  taskLabel: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800",
    flex: 1
  },
  taskDone: {
    color: colors.muted
  },
  taskReward: {
    color: colors.accentDark,
    fontSize: 12,
    fontWeight: "900"
  },
  footerText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700"
  }
});

