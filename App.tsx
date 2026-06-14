import "react-native-gesture-handler";

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { AppStateProvider } from "./data/AppState";
import { MenuContext } from "./navigation/MenuContext";
import { navigationRef } from "./navigation/navigationRef";
import RootNavigator from "./navigation/RootNavigator";
import MenuOverlay from "./screens/MenuOverlay";
import { colors } from "./theme";

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <AppStateProvider>
      <MenuContext.Provider value={{ openMenu: () => setMenuVisible(true) }}>
        <NavigationContainer ref={navigationRef}>
          <StatusBar style="dark" backgroundColor={colors.background} />
          <RootNavigator />
        </NavigationContainer>
        <MenuOverlay visible={menuVisible} onClose={() => setMenuVisible(false)} />
      </MenuContext.Provider>
    </AppStateProvider>
  );
}

