import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import Card from "../components/Card";
import Header from "../components/Header";
import MapSurface from "../components/MapSurface";
import PrimaryButton from "../components/PrimaryButton";
import { useAppState } from "../data/AppState";
import { destinations } from "../data/mockData";
import { RootStackParamList } from "../navigation/types";
import { colors, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "RoutePreview">;

export default function RoutePreviewScreen({ navigation, route }: Props) {
  const { selectedOutfitId } = useAppState();
  const destination =
    destinations.find((item) => item.id === route.params.destinationId) ?? destinations[0];

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Route Preview" subtitle="Pet-guided indoor navigation" onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <MapSurface
          height={430}
          showRoute
          destinationName={destination.name}
          outfitId={selectedOutfitId}
        />
        <Card style={styles.card}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.eyebrow}>Destination</Text>
              <Text style={styles.title}>{destination.name}</Text>
              <Text style={styles.meta}>
                {destination.building} - {destination.floor}
              </Text>
            </View>
            <View style={styles.etaBox}>
              <Text style={styles.eta}>{destination.eta}</Text>
              <Text style={styles.etaLabel}>ETA</Text>
            </View>
          </View>
          <View style={styles.routeStats}>
            <Text style={styles.stat}>Indoor-first</Text>
            <Text style={styles.stat}>{destination.distance}</Text>
            <Text style={styles.stat}>Pet guide ready</Text>
          </View>
          <PrimaryButton
            label="Start Navigation"
            onPress={() => navigation.navigate("ActiveNavigation", { destinationId: destination.id })}
            icon={<Ionicons name="navigate" size={20} color={colors.ink} />}
          />
        </Card>
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
  card: {
    gap: spacing.lg
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.lg
  },
  eyebrow: {
    color: colors.accentDark,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  title: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: "900",
    marginTop: spacing.xs
  },
  meta: {
    color: colors.muted,
    fontSize: 14,
    marginTop: spacing.xs
  },
  etaBox: {
    minWidth: 76,
    borderRadius: 18,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md
  },
  eta: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  etaLabel: {
    color: colors.accentDark,
    fontSize: 11,
    fontWeight: "900"
  },
  routeStats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  stat: {
    color: colors.ink,
    backgroundColor: colors.surfaceWarm,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 12,
    fontWeight: "800"
  }
});

