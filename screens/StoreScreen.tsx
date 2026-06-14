import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Header from "../components/Header";
import AppModal from "../components/Modal";
import OutfitCard from "../components/OutfitCard";
import PrimaryButton from "../components/PrimaryButton";
import { useAppState } from "../data/AppState";
import { GemBundle, Outfit, gemBundles, outfits } from "../data/mockData";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Store">;

export default function StoreScreen({ navigation }: Props) {
  const { addGems, gems, purchaseOutfit, purchasedOutfitIds } = useAppState();
  const [tab, setTab] = useState<"outfits" | "gems">("outfits");
  const [selectedItem, setSelectedItem] = useState<Outfit | null>(null);
  const [notice, setNotice] = useState("Tap an item to preview it.");

  const buySelectedItem = () => {
    if (!selectedItem) {
      return;
    }
    if (purchasedOutfitIds.includes(selectedItem.id)) {
      setNotice(`${selectedItem.name} is already purchased.`);
      return;
    }
    const purchased = purchaseOutfit(selectedItem.id);
    setNotice(purchased ? `${selectedItem.name} purchased.` : "Not enough gems for this outfit.");
  };

  const buyGemBundle = (bundle: GemBundle) => {
    addGems(bundle.gems);
    setNotice(`${bundle.name} added ${bundle.gems} mock gems.`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        title="Store"
        subtitle={`${gems} gems available`}
        onBack={navigation.goBack}
        right={<Ionicons name="diamond" size={24} color={colors.accentDark} />}
      />
      <View style={styles.tabs}>
        <Pressable
          onPress={() => setTab("outfits")}
          style={[styles.tab, tab === "outfits" && styles.tabActive]}
        >
          <Text style={[styles.tabText, tab === "outfits" && styles.tabTextActive]}>Outfits</Text>
        </Pressable>
        <Pressable onPress={() => setTab("gems")} style={[styles.tab, tab === "gems" && styles.tabActive]}>
          <Text style={[styles.tabText, tab === "gems" && styles.tabTextActive]}>Gems</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.notice}>{notice}</Text>
        {tab === "outfits" ? (
          <View style={styles.grid}>
            {outfits.map((outfit) => (
              <OutfitCard
                key={outfit.id}
                outfit={outfit}
                purchased={purchasedOutfitIds.includes(outfit.id)}
                onPress={() => setSelectedItem(outfit)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.bundleStack}>
            {gemBundles.map((bundle) => (
              <Pressable key={bundle.id} onPress={() => buyGemBundle(bundle)} style={styles.bundleCard}>
                <View style={styles.gemIcon}>
                  <Ionicons name="diamond" size={26} color={colors.accentDark} />
                </View>
                <View style={styles.bundleBody}>
                  <Text style={styles.bundleName}>{bundle.name}</Text>
                  <Text style={styles.bundleMeta}>
                    {bundle.gems} gems - {bundle.bonus}
                  </Text>
                </View>
                <Text style={styles.bundlePrice}>{bundle.priceLabel}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      <AppModal visible={Boolean(selectedItem)} onClose={() => setSelectedItem(null)}>
        {selectedItem ? (
          <View style={styles.modalContent}>
            <View style={[styles.modalIcon, { backgroundColor: selectedItem.color }]}>
              <MaterialCommunityIcons name={selectedItem.icon as never} size={36} color="#FFFFFF" />
            </View>
            <Text style={styles.modalTitle}>{selectedItem.name}</Text>
            <Text style={styles.modalCopy}>
              Equip your guide with this look on maps, previews, and active navigation.
            </Text>
            <Text style={styles.modalPrice}>
              {purchasedOutfitIds.includes(selectedItem.id) ? "Purchased" : `${selectedItem.price} gems`}
            </Text>
            <PrimaryButton
              label={purchasedOutfitIds.includes(selectedItem.id) ? "Purchased" : "Buy"}
              onPress={buySelectedItem}
              disabled={purchasedOutfitIds.includes(selectedItem.id)}
            />
          </View>
        ) : null}
      </AppModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background
  },
  tabs: {
    marginHorizontal: spacing.lg,
    flexDirection: "row",
    backgroundColor: colors.surfaceWarm,
    borderRadius: radius.pill,
    padding: 4
  },
  tab: {
    flex: 1,
    height: 42,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center"
  },
  tabActive: {
    backgroundColor: colors.accent
  },
  tabText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "900"
  },
  tabTextActive: {
    color: colors.ink
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.lg
  },
  notice: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.md
  },
  bundleStack: {
    gap: spacing.md
  },
  bundleCard: {
    minHeight: 84,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  gemIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center"
  },
  bundleBody: {
    flex: 1
  },
  bundleName: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  bundleMeta: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 2
  },
  bundlePrice: {
    color: colors.accentDark,
    fontSize: 15,
    fontWeight: "900"
  },
  modalContent: {
    alignItems: "center",
    gap: spacing.md
  },
  modalIcon: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: "center",
    justifyContent: "center"
  },
  modalTitle: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: "900"
  },
  modalCopy: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center"
  },
  modalPrice: {
    color: colors.accentDark,
    fontSize: 18,
    fontWeight: "900"
  }
});

