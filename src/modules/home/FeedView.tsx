import React, { useEffect } from "react";
import { Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Caption, Card } from "react-native-paper";
import {
  useGetPostsQuery,
  useGetCurrentUserQuery,
} from "../../generated-components/apolloComponents";
import { HomeStackNavProps } from "../../navigation/app/home/HomeParamList";
import { StyledColumnView } from "../../styled-components/ReusedUI";
import { AlbumPostView, ArtistPostView, TrackPostView } from "./PostViews";
import { useStoreActions, useStoreState } from "../../state-management/hooks";
import { useSetUserHook } from "../../functional-components/useSetUserHook";

export const FeedView: React.FC<HomeStackNavProps<"Feed">> = ({
  navigation,
  route,
}) => {
  const { data, loading, error } = useGetPostsQuery();
  const userState = useStoreState((state) => state.user.user);
  const setCurrentUser = useSetUserHook();

  useEffect(() => {
    setCurrentUser().then((x) => {
      console.log("in feed view, hope this is true", x);
    });
    console.log("feed view use effect");
  }, [data]);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !data) {
    console.log(error);
    return <Text>Error..</Text>;
  }

  return (
    <ScrollView>
      <Card>
        <Caption>Hello {userState.username}</Caption>
      </Card>
      <FlatList
        data={data.getPosts}
        renderItem={({ item }) => (
          <StyledColumnView>
            {item?.__typename === "ArtistPost" ? (
              <ArtistPostView
                item={item}
                navigation={navigation}
                route={route}
              />
            ) : item?.__typename === "AlbumPost" ? (
              <AlbumPostView
                item={item}
                navigation={navigation}
                route={route}
              />
            ) : (
              <TrackPostView
                item={item}
                navigation={navigation}
                route={route}
              />
            )}
          </StyledColumnView>
        )}
        keyExtractor={(item, ix) => ix.toString()}
      />
    </ScrollView>
  );
};
