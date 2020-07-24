import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LogoutButton } from "../../../modules/authentication/components/LogoutButton";
import { ArtistPageView } from "../../../modules/content-pages/artist-page/ArtistPageView";
import { ArtistPostsView } from "../../../modules/content-pages/ArtistPostsView";
import { FeedView } from "../../../modules/home/FeedView";
import { HomeParamList } from "./HomeParamList";
import { AlbumPageView } from "../../../modules/content-pages/AlbumPageView";
import { TrackPageView } from "../../../modules/content-pages/TrackPageView";
import { UserView } from "../../../modules/user/UserView";
import { View } from "react-native";
import { UserButton } from "../../../modules/user/UserButton";

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();
// more things will go here!!!
export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        options={{
          header: ({ scene, previous, navigation }) => {
            return (
              <View>
                <UserButton navigation={navigation} />
                <LogoutButton />
              </View>
            );
          },
        }}
        component={FeedView}
      />
      <Stack.Screen name="ArtistPage" component={ArtistPageView} />
      <Stack.Screen name="ArtistPosts" component={ArtistPostsView} />
      <Stack.Screen name="AlbumPage" component={AlbumPageView} />
      <Stack.Screen name="TrackPage" component={TrackPageView} />
      <Stack.Screen name="UserPage" component={UserView} />
    </Stack.Navigator>
  );
};
