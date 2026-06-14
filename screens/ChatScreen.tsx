import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import Header from "../components/Header";
import { useAppState } from "../data/AppState";
import { friends } from "../data/mockData";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

export default function ChatScreen({ navigation, route }: Props) {
  const { addMessage, messages } = useAppState();
  const friend = friends.find((item) => item.id === route.params.friendId) ?? friends[0];
  const [draft, setDraft] = useState("");
  const thread = messages[friend.id] ?? [];

  const sendMessage = () => {
    const body = draft.trim();
    if (!body) {
      return;
    }
    addMessage(friend.id, body);
    setDraft("");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.select({ ios: "padding", default: undefined })}
      >
        <Header title={friend.name} subtitle={friend.status} onBack={navigation.goBack} />
        <ScrollView contentContainerStyle={styles.messages}>
          {thread.map((message) => {
            const mine = message.from === "me";
            return (
              <View key={message.id} style={[styles.messageRow, mine && styles.messageRowMine]}>
                <View style={[styles.bubble, mine ? styles.myBubble : styles.friendBubble]}>
                  <Text style={[styles.bubbleText, mine && styles.myBubbleText]}>{message.body}</Text>
                  <Text style={[styles.messageTime, mine && styles.myTime]}>{message.time}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.composer}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Message"
            placeholderTextColor={colors.faint}
            style={styles.input}
          />
          <Pressable onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={19} color={colors.ink} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background
  },
  keyboard: {
    flex: 1
  },
  messages: {
    padding: spacing.lg,
    gap: spacing.sm,
    paddingBottom: spacing.xxl
  },
  messageRow: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  messageRowMine: {
    justifyContent: "flex-end"
  },
  bubble: {
    maxWidth: "78%",
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  friendBubble: {
    backgroundColor: colors.surfaceWarm
  },
  myBubble: {
    backgroundColor: colors.accent
  },
  bubbleText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20
  },
  myBubbleText: {
    color: colors.ink
  },
  messageTime: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    marginTop: 4
  },
  myTime: {
    color: "rgba(24, 32, 51, 0.68)"
  },
  composer: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "center",
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: colors.surface
  },
  input: {
    flex: 1,
    minHeight: 48,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: spacing.lg,
    color: colors.ink,
    fontSize: 15,
    fontWeight: "700"
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center"
  }
});

