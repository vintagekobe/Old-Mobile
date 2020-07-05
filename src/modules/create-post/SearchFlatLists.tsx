import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, View } from "react-native";
import { Caption, Card, Headline, List, Text } from "react-native-paper";
import { SearchSpotifyQuery } from "../../generated-components/apolloComponents";
import { useStoreActions } from "../../state-management/hooks";

interface SearchFlatListsProps {
  data: SearchSpotifyQuery | undefined;
}

export const SearchFlatLists: React.FC<SearchFlatListsProps> = (data) => {
  const setContent = useStoreActions(
    (actions) => actions.createPost.setContent
  );
  const navigation = useNavigation();
  const chooseContent = (
    id: string,
    name: string,
    imageUrl: string | null | undefined
  ) => {
    setContent({
      id,
      name,
      imageUrl,
    });
    navigation.goBack();
    return;
  };
  const searchResult = data.data?.search;

  if (searchResult?.__typename === "ArtistSearchResult")
    return (
      <FlatList
        data={searchResult.artists?.items}
        renderItem={(results) => (
          <Card>
            <Headline>{results.item?.name}</Headline>
          </Card>
        )}
      />
    );
  if (searchResult?.__typename === "TrackSearchResult") {
    return (
      <FlatList
        data={searchResult.tracks?.items}
        keyExtractor={(item, index) => item!?.id!?.toString() + index}
        renderItem={(results) => (
          <List.Item
            onPress={() =>
              chooseContent(
                results.item!?.id!,
                results.item!?.name!,
                results.item?.album?.images?.map((imgItem, ix) => {
                  return imgItem?.url;
                })[1]
              )
            }
            title={results.item?.name}
            description={results.item?.artists?.map((element, ix) => (
              <Text key={ix}>- {element?.name} </Text>
            ))}
          />
        )}
      />
    );
  }

  if (searchResult?.__typename === "AlbumSearchResult")
    return (
      <FlatList
        data={searchResult.albums?.items}
        renderItem={(results) => (
          <Card>
            <Headline>{results.item?.name}</Headline>
            {results.item?.artists?.map((element, ix) => (
              <Caption key={ix}>{element?.name}</Caption>
            ))}
            <Caption>Release Date {results.item?.release_date}</Caption>
          </Card>
        )}
      />
    );
  return <View></View>;
};