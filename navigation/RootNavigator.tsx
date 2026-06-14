import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomNav from "../components/BottomNav";
import AccountSettingsScreen from "../screens/AccountSettingsScreen";
import AchievementsScreen from "../screens/AchievementsScreen";
import ActiveNavigationScreen from "../screens/ActiveNavigationScreen";
import ChatListScreen from "../screens/ChatListScreen";
import ChatScreen from "../screens/ChatScreen";
import FriendProfileScreen from "../screens/FriendProfileScreen";
import FriendsScreen from "../screens/FriendsScreen";
import MapScreen from "../screens/MapScreen";
import PetCustomizationScreen from "../screens/PetCustomizationScreen";
import ProfileSettingsScreen from "../screens/ProfileSettingsScreen";
import RoutePreviewScreen from "../screens/RoutePreviewScreen";
import SearchScreen from "../screens/SearchScreen";
import SignInScreen from "../screens/SignInScreen";
import StoreScreen from "../screens/StoreScreen";
import { MainTabParamList, RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomNav {...props} />}
    >
      <Tab.Screen name="Pet" component={PetCustomizationScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="RoutePreview" component={RoutePreviewScreen} />
      <Stack.Screen name="ActiveNavigation" component={ActiveNavigationScreen} />
      <Stack.Screen name="Store" component={StoreScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
      <Stack.Screen name="Achievements" component={AchievementsScreen} />
      <Stack.Screen name="Friends" component={FriendsScreen} />
      <Stack.Screen name="FriendProfile" component={FriendProfileScreen} />
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

