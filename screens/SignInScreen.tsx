import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Card from "../components/Card";
import PetAvatar from "../components/PetAvatar";
import PrimaryButton from "../components/PrimaryButton";
import { useAppState } from "../data/AppState";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, shadows, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "SignIn">;

export default function SignInScreen({ navigation }: Props) {
  const { signIn } = useAppState();
  const [email, setEmail] = useState("alex@csulb.edu");
  const [password, setPassword] = useState("navipet");

  const enterApp = (guest = false) => {
    signIn(guest ? "guest@navipet.app" : email);
    navigation.replace("MainTabs", { screen: "Map" });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", default: undefined })}
        style={styles.wrap}
      >
        <View style={styles.hero}>
          <View style={styles.logo}>
            <PetAvatar size={96} />
          </View>
          <Text style={styles.title}>NaviPet</Text>
          <Text style={styles.subtitle}>Indoor routes with a pet guide by your side.</Text>
        </View>

        <Card style={styles.form}>
          <Text style={styles.formTitle}>Welcome back</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={colors.faint}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={colors.faint}
            secureTextEntry
            style={styles.input}
          />
          <PrimaryButton
            label="Sign In"
            onPress={() => enterApp(false)}
            icon={<MaterialCommunityIcons name="map-marker-path" size={20} color={colors.ink} />}
          />
          <PrimaryButton label="Sign Up" onPress={() => enterApp(false)} variant="secondary" />
          <PrimaryButton label="Continue as Guest" onPress={() => enterApp(true)} variant="ghost" />
        </Card>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background
  },
  wrap: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: "center"
  },
  hero: {
    alignItems: "center",
    marginBottom: spacing.xl
  },
  logo: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: colors.surfaceWarm,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
    ...shadows.card
  },
  title: {
    color: colors.ink,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: 0
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    textAlign: "center",
    marginTop: spacing.sm,
    lineHeight: 22
  },
  form: {
    gap: spacing.md
  },
  formTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: spacing.xs
  },
  input: {
    height: 52,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: spacing.lg,
    color: colors.ink,
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: colors.background
  }
});

