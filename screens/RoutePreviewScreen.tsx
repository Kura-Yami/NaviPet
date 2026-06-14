import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import Card from "../components/Card";
import Header from "../components/Header";
import IndoorMapSurface from "../components/IndoorMapSurface";
import MapboxCampusRoute from "../components/MapboxCampusRoute";
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
        <View style={styles.routeHeader}>
          <View style={styles.routePoint}>
            <View style={styles.startDot} />
            <Text style={styles.routePointText}>Current location near Engineering quad</Text>
          </View>
          <View style={styles.routeConnector} />
          <View style={styles.routePoint}>
            <View style={styles.endDot} />
            <Text style={styles.routePointText}>
              {destination.building} - {destination.name}
            </Text>
          </View>
        </View>

        <MapboxCampusRoute height={252} showSteps />

        <View style={styles.indoorHeader}>
          <View>
            <Text style={styles.eyebrow}>Indoor segment</Text>
            <Text style={styles.indoorTitle}>Floor-aware route inside Vivian</Text>
          </View>
          <View style={styles.indoorBadge}>
            <Ionicons name="layers" size={16} color={colors.ink} />
            <Text style={styles.indoorBadgeText}>{destination.floor}</Text>
          </View>
        </View>

        <IndoorMapSurface
          height={430}
          showRoute
          selectedFloorId={destination.floorId}
          destinationName={destination.name}
          viewMode="stacked"
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
            <Text style={styles.stat}>Walk to entrance</Text>
            <Text style={styles.stat}>Switch to {destination.floor}</Text>
            <Text style={styles.stat}>Camera verification ready</Text>
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
  routeHeader: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.sm
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  routePointText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800",
    flex: 1
  },
  routeConnector: {
    width: 2,
    height: 24,
    backgroundColor: colors.line,
    marginLeft: 7
  },
  startDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.teal,
    borderWidth: 3,
    borderColor: "#FFFFFF"
  },
  endDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.accentDark,
    borderWidth: 3,
    borderColor: "#FFFFFF"
  },
  indoorHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  indoorTitle: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: "900",
    marginTop: 2
  },
  indoorBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    borderRadius: 999,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  indoorBadgeText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "900"
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
