import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Friend } from "../data/mockData";
import { colors, radius, spacing } from "../theme";

type FriendCardProps = {
  friend: Friend;
  onPress?: () => void;
};

export default function FriendCard({ friend, onPress }: FriendCardProps) {
  const online = friend.status === "Online";

  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={[styles.avatar, { backgroundColor: friend.avatarColor }]}>
        <Text style={styles.initials}>{friend.name.slice(0, 1)}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{friend.name}</Text>
        <Text style={styles.meta}>
          Level {friend.level} - {friend.distance}
        </Text>
      </View>
      <View style={[styles.statusDot, online && styles.online]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 74,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center"
  },
  initials: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900"
  },
  body: {
    flex: 1
  },
  name: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800"
  },
  meta: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 2
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.faint
  },
  online: {
    backgroundColor: colors.green
  }
});

