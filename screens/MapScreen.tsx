import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import Card from "../components/Card";
import IndoorMapSurface from "../components/IndoorMapSurface";
import MapboxCampusRoute from "../components/MapboxCampusRoute";
import PrimaryButton from "../components/PrimaryButton";
import SearchBar from "../components/SearchBar";
import { useAppState } from "../data/AppState";
import { destinations } from "../data/mockData";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing } from "../theme";

export default function MapScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { activeUser, selectedOutfitId } = useAppState();
  const [mode, setMode] = useState<"2D" | "3D">("2D");
  const destination = destinations[0];
  const [floorId, setFloorId] = useState(destination.floorId ?? "level-2");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topRow}>
        <View style={styles.searchWrap}>
          <SearchBar onPress={() => navigation.navigate("Search")} placeholder="Where are we going?" />
        </View>
        <Pressable
          onPress={() => navigation.navigate("ProfileSettings")}
          style={[styles.avatar, { backgroundColor: activeUser.avatarColor }]}
          accessibilityLabel="Open profile"
        >
          <Text style={styles.avatarText}>{activeUser.name.slice(0, 1)}</Text>
        </Pressable>
      </View>

      <View style={styles.mapWrap}>
        {mode === "2D" ? (
          <MapboxCampusRoute height={430} />
        ) : (
          <IndoorMapSurface
            height={430}
            selectedFloorId={floorId}
            onFloorChange={setFloorId}
            viewMode="stacked"
            destinationName={destination.name}
            outfitId={selectedOutfitId}
          />
        )}
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
      </View>

      <Card style={styles.destinationCard}>
        <View style={styles.destinationHeader}>
          <View>
            <Text style={styles.eyebrow}>Recommended route</Text>
            <Text style={styles.destinationTitle}>{destination.name}</Text>
            <Text style={styles.destinationMeta}>
              {destination.floor} - {destination.eta} - {destination.distance}
            </Text>
          </View>
          <View style={styles.pin}>
            <Ionicons name="location" size={22} color={colors.accentDark} />
          </View>
        </View>
        <PrimaryButton
          label="Preview Route"
          onPress={() => navigation.navigate("RoutePreview", { destinationId: destination.id })}
        />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md
  },
  searchWrap: {
    flex: 1
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center"
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900"
  },
  mapWrap: {
    padding: spacing.lg,
    position: "relative"
  },
  toggle: {
    position: "absolute",
    right: spacing.xl,
    top: spacing.xl,
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
    fontWeight: "900",
    fontSize: 13
  },
  toggleActiveText: {
    color: colors.ink
  },
  destinationCard: {
    marginHorizontal: spacing.lg,
    marginTop: -spacing.sm,
    gap: spacing.lg
  },
  destinationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  eyebrow: {
    color: colors.accentDark,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  destinationTitle: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "900",
    marginTop: spacing.xs
  },
  destinationMeta: {
    color: colors.muted,
    fontSize: 14,
    marginTop: spacing.xs
  },
  pin: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center"
  }
});
