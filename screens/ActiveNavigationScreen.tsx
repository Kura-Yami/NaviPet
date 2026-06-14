import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Card from "../components/Card";
import MapSurface from "../components/MapSurface";
import PetAvatar from "../components/PetAvatar";
import PrimaryButton from "../components/PrimaryButton";
import { useAppState } from "../data/AppState";
import { destinations } from "../data/mockData";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "ActiveNavigation">;

export default function ActiveNavigationScreen({ navigation, route }: Props) {
  const { selectedOutfitId } = useAppState();
  const [mode, setMode] = useState<"2D" | "3D">("3D");
  const destination =
    destinations.find((item) => item.id === route.params.destinationId) ?? destinations[0];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Card style={styles.directionCard}>
          <Text style={styles.eta}>{destination.eta} remaining</Text>
          <Text style={styles.instruction}>Continue straight through the atrium.</Text>
          <Text style={styles.next}>Next: turn right at the orange elevator bank.</Text>
        </Card>

        <View style={styles.petStage}>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>I will keep us on the indoor path.</Text>
          </View>
          <PetAvatar size={172} outfitId={selectedOutfitId} label={destination.name} />
        </View>

        <View style={styles.bottomPanel}>
          <View style={styles.toggle}>
            {(["2D", "3D"] as const).map((item) => (
              <Pressable
                key={item}
                onPress={() => setMode(item)}
                style={[styles.toggleItem, mode === item && styles.toggleActive]}
              >
                <Text style={[styles.toggleText, mode === item && styles.toggleActiveText]}>{item}</Text>
              </Pressable>
            ))}
          </View>
          <MapSurface
            height={176}
            compact
            showRoute
            destinationName={destination.name}
            outfitId={selectedOutfitId}
          />
          <PrimaryButton
            label="Exit Navigation"
            variant="danger"
            onPress={() => navigation.navigate("MainTabs", { screen: "Map" })}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "space-between",
    gap: spacing.lg
  },
  directionCard: {
    gap: spacing.xs
  },
  eta: {
    color: colors.accentDark,
    fontSize: 14,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  instruction: {
    color: colors.ink,
    fontSize: 23,
    fontWeight: "900",
    lineHeight: 29
  },
  next: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700"
  },
  petStage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg
  },
  bubble: {
    backgroundColor: colors.surfaceWarm,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.accentSoft
  },
  bubbleText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800"
  },
  bottomPanel: {
    gap: spacing.md
  },
  toggle: {
    alignSelf: "flex-end",
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 3
  },
  toggleItem: {
    minWidth: 42,
    height: 34,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center"
  },
  toggleActive: {
    backgroundColor: colors.accent
  },
  toggleText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "900"
  },
  toggleActiveText: {
    color: colors.ink
  }
});

