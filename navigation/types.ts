import { NavigatorScreenParams } from "@react-navigation/native";

export type MainTabParamList = {
  Map: undefined;
  Pet: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  Search: undefined;
  RoutePreview: { destinationId: string };
  ActiveNavigation: { destinationId: string };
  Store: undefined;
  ProfileSettings: undefined;
  AccountSettings: undefined;
  Achievements: undefined;
  Friends: undefined;
  FriendProfile: { friendId: string };
  ChatList: undefined;
  Chat: { friendId: string };
};

