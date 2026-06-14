import React from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import Header from "../components/Header";
import { useAppState } from "../data/AppState";
import { friends } from "../data/mockData";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "ChatList">;

export default function ChatListScreen({ navigation }: Props) {
  const { messages } = useAppState();

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Messages" subtitle="Recent conversations" onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.content}>
        {friends.map((friend) => {
          const thread = messages[friend.id] ?? [];
          const lastMessage = thread[thread.length - 1];
          return (
            <Pressable
              key={friend.id}
              onPress={() => navigation.navigate("Chat", { friendId: friend.id })}
              style={styles.row}
            >
              <View style={[styles.avatar, { backgroundColor: friend.avatarColor }]}>
                <Text style={styles.initial}>{friend.name.slice(0, 1)}</Text>
              </View>
              <View style={styles.body}>
                <View style={styles.titleRow}>
                  <Text style={styles.name}>{friend.name}</Text>
                  <Text style={styles.time}>{lastMessage?.time ?? "New"}</Text>
                </View>
                <Text style={styles.preview} numberOfLines={1}>
                  {lastMessage?.body ?? "Start a new NaviPet chat."}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.faint} />
            </Pressable>
          );
        })}
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
    gap: spacing.md,
    paddingBottom: spacing.xxl
  },
  row: {
    minHeight: 78,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  initial: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900"
  },
  body: {
    flex: 1
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  name: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900",
    flex: 1
  },
  time: {
    color: colors.faint,
    fontSize: 12,
    fontWeight: "800"
  },
  preview: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4,
    fontWeight: "700"
  }
});

