import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useDispatch, useSelector } from "react-redux";
import { RootState, getPhotosByQuery } from "../../store";

import { RootStackParamList } from "../../Navigator";
import { PhotoCard } from "../../components";
import type { IPhoto } from "../../helpers";

import { globalStyles, loadingStyles, errorStyles } from "../../styles";
import { RefreshControl } from "react-native-gesture-handler";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.photos
  );

  useEffect(() => {
    dispatch(getPhotosByQuery() as any);
  }, []);

  return (
    <View style={globalStyles.container}>
      <View style={styles.top}>
        <Text style={globalStyles.title}>Gallery:</Text>
      </View>

      {isLoading && (
        <View style={loadingStyles.container}>
          <ActivityIndicator size="large" />
          <Text style={loadingStyles.title}>Loading...</Text>
        </View>
      )}

      {!isLoading && data.length ? (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => dispatch(getPhotosByQuery() as any)}
            />
          }
          contentContainerStyle={{ gap: 16 }}
          data={data}
          renderItem={({ item }: { item: IPhoto }) => (
            <PhotoCard navigation={navigation} item={item} />
          )}
        />
      ) : null}

      {!!error && (
        <View style={errorStyles.container}>
          <Text style={errorStyles.title}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
