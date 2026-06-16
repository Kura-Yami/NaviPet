import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAppState } from "../data/AppState";
import { RootStackParamList } from "../navigation/types";

const mascotImg = require("../assets/mascot.png");

type Props = NativeStackScreenProps<RootStackParamList, "SignIn">;

export default function SignInScreen({ navigation }: Props) {
  const { signIn } = useAppState();
  const [email, setEmail] = useState("alex@csulb.edu");
  const [password, setPassword] = useState("navipet");
  const [showPassword, setShowPassword] = useState(false);

  const enterApp = (guest = false) => {
    signIn(guest ? "guest@navipet.app" : email);
    navigation.replace("MainTabs", { screen: "Map" });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", default: undefined })}
        style={styles.kav}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand / Mascot */}
          <View style={styles.brandSection}>
            <View style={styles.mascotWrap}>
              <Image source={mascotImg} style={styles.mascot} resizeMode="contain" />
              <View style={styles.mascotShadow} />
            </View>
            <Text style={styles.title}>NaviPet</Text>
            <Text style={styles.subtitle}>Your friendly journey companion</Text>
          </View>

          {/* Form */}
          <View style={styles.formSection}>
            {/* Email */}
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Email Address</Text>
              <View style={styles.inputRow}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={18}
                  color="#747780"
                  style={styles.inputIcon}
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="hello@navipet.com"
                  placeholderTextColor="#747780"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.textInput}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.inputRow}>
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={18}
                  color="#747780"
                  style={styles.inputIcon}
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#747780"
                  secureTextEntry={!showPassword}
                  style={[styles.textInput, styles.textInputPassword]}
                />
                <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#747780"
                    style={styles.eyeIcon}
                  />
                </Pressable>
              </View>
              <View style={styles.forgotRow}>
                <Pressable>
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </Pressable>
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonStack}>
              <Pressable
                style={({ pressed }) => [styles.btnPrimary, pressed && styles.pressed]}
                onPress={() => enterApp(false)}
              >
                <Text style={styles.btnPrimaryText}>Sign In</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [styles.btnAmber, pressed && styles.pressed]}
                onPress={() => enterApp(false)}
              >
                <MaterialCommunityIcons name="account-plus-outline" size={18} color="#6B4B00" />
                <Text style={styles.btnAmberText}>Create Account</Text>
              </Pressable>
            </View>

            {/* Guest */}
            <View style={styles.guestRow}>
              <Pressable style={styles.guestLink} onPress={() => enterApp(true)}>
                <Text style={styles.guestText}>Continue as Guest</Text>
                <MaterialCommunityIcons name="arrow-right" size={14} color="#43474F" />
              </Pressable>
            </View>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            {"By signing in, you agree to our "}
            <Text style={styles.footerLink}>Terms</Text>
            {" & "}
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  kav: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 32,
  },

  // Brand
  brandSection: {
    alignItems: "center",
    paddingBottom: 32,
  },
  mascotWrap: {
    width: 192,
    height: 192,
    alignItems: "center",
    justifyContent: "center",
  },
  mascot: {
    width: 192,
    height: 192,
  },
  mascotShadow: {
    position: "absolute",
    bottom: -8,
    left: "12.5%",
    right: "12.5%",
    height: 12,
    borderRadius: 78,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  title: {
    marginTop: 12,
    fontSize: 28,
    fontWeight: "700",
    color: "#002B5B",
    letterSpacing: -0.7,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#43474F",
    textAlign: "center",
  },

  // Form
  formSection: {
    width: "100%",
    maxWidth: 408,
    gap: 16,
  },
  fieldWrap: {
    width: "100%",
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#43474F",
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C4C6D0",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#182033",
    height: "100%",
  },
  textInputPassword: {
    paddingRight: 8,
  },
  eyeIcon: {
    marginLeft: 4,
  },
  forgotRow: {
    alignItems: "flex-end",
    marginTop: 4,
  },
  forgotText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#002B5B",
  },

  // Buttons
  buttonStack: {
    width: "100%",
    gap: 16,
    marginTop: 16,
  },
  btnPrimary: {
    backgroundColor: "#002B5B",
    borderRadius: 9999,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  btnPrimaryText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  btnAmber: {
    backgroundColor: "#FEB700",
    borderRadius: 9999,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  btnAmberText: {
    color: "#6B4B00",
    fontSize: 18,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.85,
  },

  // Guest
  guestRow: {
    alignItems: "center",
    paddingTop: 16,
  },
  guestLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 9999,
  },
  guestText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#43474F",
    letterSpacing: 0.5,
  },

  // Footer
  footer: {
    marginTop: 32,
    fontSize: 10,
    fontWeight: "500",
    color: "#C4C6D0",
    textAlign: "center",
  },
  footerLink: {
    textDecorationLine: "underline",
    color: "#C4C6D0",
  },
});
