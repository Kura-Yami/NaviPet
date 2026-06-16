import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Card from "../components/Card";
import IndoorMapSurface from "../components/IndoorMapSurface";
import MapboxCampusRoute from "../components/MapboxCampusRoute";
import MapboxMap from "../components/MapboxMap";
import PrimaryButton from "../components/PrimaryButton";
import SearchBar from "../components/SearchBar";
import { useAppState } from "../data/AppState";
import { destinations } from "../data/mockData";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, shadows, spacing } from "../theme";

export default function MapScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { activeUser, selectedOutfitId } = useAppState();
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<"2D" | "3D">("2D");
  const destination = destinations[0];
  const [floorId, setFloorId] = useState(destination.floorId ?? "level-2");

  return (
    <View style={styles.screen}>
      <MapboxMap fill />

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
              onPress={() => navigation.navigate("ProfileSettings")}
              style={[styles.avatar, { backgroundColor: activeUser.avatarColor }]}
              accessibilityLabel="Open profile"
            >
              <Text style={styles.avatarText}>{activeUser.name.slice(0, 1)}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={[styles.toggle, { bottom: insets.bottom + spacing.lg }]}>
        {(["2D", "3D"] as const).map((item) => (
          <Pressable
            key={item}
            onPress={() => setMode(item)}
            style={[styles.toggleItem, mode === item && styles.toggleActive]}
          >
            <Text style={[styles.toggleText, mode === item && styles.toggleActiveText]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.map
  },
  mapWrap: {
    ...StyleSheet.absoluteFillObject
  },
  searchFloat: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900"
  },
  toggle: {
    position: "absolute",
    left: spacing.lg,
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 4,
    ...shadows.soft
  },
  toggleItem: {
    minWidth: 46,
    height: 32,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center"
  },
  toggleActive: {
    backgroundColor: colors.ink
  },
  toggleText: {
    color: colors.muted,
    fontWeight: "800",
    fontSize: 13
  },
  toggleActiveText: {
    color: "#FFFFFF"
  }
});
