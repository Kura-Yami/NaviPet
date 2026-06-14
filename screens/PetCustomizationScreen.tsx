import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import Header from "../components/Header";
import OutfitCard from "../components/OutfitCard";
import PetAvatar from "../components/PetAvatar";
import PrimaryButton from "../components/PrimaryButton";
import { useAppState } from "../data/AppState";
import { outfits } from "../data/mockData";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, shadows, spacing } from "../theme";

export default function PetCustomizationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { gems, purchasedOutfitIds, selectedOutfitId, selectOutfit } = useAppState();
  const [draftOutfitId, setDraftOutfitId] = useState(selectedOutfitId);
  const [notice, setNotice] = useState("Current look loaded.");

  useEffect(() => {
    setDraftOutfitId(selectedOutfitId);
  }, [selectedOutfitId]);

  const saveOutfit = () => {
    if (!purchasedOutfitIds.includes(draftOutfitId)) {
      setNotice("That outfit is in the store.");
      return;
    }
    selectOutfit(draftOutfitId);
    setNotice("Outfit saved.");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        title="Pet"
        subtitle="Customize your navigation guide"
        right={
          <PrimaryButton
            label="Store"
            variant="secondary"
            onPress={() => navigation.navigate("Store")}
            icon={<Ionicons name="bag" size={18} color={colors.ink} />}
          />
        }
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.balance}>
          <Ionicons name="diamond" size={18} color={colors.accentDark} />
          <Text style={styles.balanceText}>{gems} gems</Text>
        </View>

        <View style={styles.preview}>
          <PetAvatar size={168} outfitId={draftOutfitId} />
          <Text style={styles.previewTitle}>{outfits.find((item) => item.id === draftOutfitId)?.name}</Text>
          <Text style={styles.notice}>{notice}</Text>
          <View style={styles.buttonRow}>
            <PrimaryButton
              label="Current Look"
              variant="ghost"
              onPress={() => {
                setDraftOutfitId(selectedOutfitId);
                setNotice("Current look selected.");
              }}
            />
            <PrimaryButton label="Save Outfit" onPress={saveOutfit} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Outfits</Text>
        <View style={styles.grid}>
          {outfits.map((outfit) => (
            <OutfitCard
              key={outfit.id}
              outfit={outfit}
              selected={draftOutfitId === outfit.id}
              purchased={purchasedOutfitIds.includes(outfit.id)}
              onPress={() => {
                setDraftOutfitId(outfit.id);
                setNotice(
                  purchasedOutfitIds.includes(outfit.id)
                    ? `${outfit.name} selected.`
                    : `${outfit.name} can be purchased in Store.`
                );
              }}
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
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.lg
  },
  balance: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surfaceWarm,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  balanceText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "900"
  },
  preview: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadows.card
  },
  previewTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900",
    marginTop: spacing.md
  },
  notice: {
    color: colors.muted,
    fontSize: 14,
    marginTop: spacing.xs,
    fontWeight: "700"
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg,
    flexWrap: "wrap",
    justifyContent: "center"
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.md
  }
});

