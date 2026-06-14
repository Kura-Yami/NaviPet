import React, { useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import FriendCard from "../components/FriendCard";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import SearchBar from "../components/SearchBar";
import { FriendRequest, friendRequests, friends } from "../data/mockData";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Friends">;

export default function FriendsScreen({ navigation }: Props) {
  const [query, setQuery] = useState("");
  const [requests, setRequests] = useState<FriendRequest[]>(friendRequests);
  const [notice, setNotice] = useState("Friends can share routes and messages.");

  const filteredFriends = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return friends;
    }
    return friends.filter((friend) => friend.name.toLowerCase().includes(term));
  }, [query]);

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        title="Friends"
        subtitle="Route buddies and chats"
        onBack={navigation.goBack}
        right={
          <Pressable onPress={() => navigation.navigate("ChatList")} style={styles.iconButton}>
            <Ionicons name="chatbubbles" size={21} color={colors.accentDark} />
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={styles.content}>
        <SearchBar value={query} onChangeText={setQuery} placeholder="Search friends" />
        <PrimaryButton
          label="Add Friend"
          variant="secondary"
          onPress={() => setNotice("Friend invite link copied in this prototype.")}
          icon={<Ionicons name="person-add" size={18} color={colors.ink} />}
        />
        <Text style={styles.notice}>{notice}</Text>

        <Text style={styles.sectionTitle}>Friend requests</Text>
        {requests.length ? (
          <View style={styles.stack}>
            {requests.map((request) => (
              <View key={request.id} style={styles.requestRow}>
                <View style={[styles.requestAvatar, { backgroundColor: request.avatarColor }]}>
                  <Text style={styles.requestInitial}>{request.name.slice(0, 1)}</Text>
                </View>
                <View style={styles.requestBody}>
                  <Text style={styles.requestName}>{request.name}</Text>
                  <Text style={styles.requestNote}>{request.note}</Text>
                </View>
                <Pressable
                  onPress={() => {
                    setRequests((current) => current.filter((item) => item.id !== request.id));
                    setNotice(`${request.name} added to friends.`);
                  }}
                  style={styles.acceptButton}
                >
                  <Text style={styles.acceptText}>Add</Text>
                </Pressable>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>No pending requests.</Text>
        )}

        <Text style={styles.sectionTitle}>Friend list</Text>
        <View style={styles.stack}>
          {filteredFriends.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              onPress={() => navigation.navigate("FriendProfile", { friendId: friend.id })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl
  },
  notice: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700"
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: "900"
  },
  stack: {
    gap: spacing.md
  },
  requestRow: {
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
  requestAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center"
  },
  requestInitial: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900"
  },
  requestBody: {
    flex: 1
  },
  requestName: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  requestNote: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 2
  },
  acceptButton: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  acceptText: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "900"
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700"
  }
});

