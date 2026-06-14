import { createNavigationContainerRef } from "@react-navigation/native";

import { RootStackParamList } from "./types";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigateTo(routeName: keyof RootStackParamList, params?: RootStackParamList[keyof RootStackParamList]) {
  if (navigationRef.isReady()) {
    (navigationRef.navigate as (...args: unknown[]) => void)(routeName, params);
  }
}
