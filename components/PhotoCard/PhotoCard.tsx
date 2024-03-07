import React, { FC } from "react";
import { Text, Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../Navigator";

import { IPhoto } from "../../helpers";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  item: IPhoto;
  navigation: HomeScreenNavigationProp;
};

export const PhotoCard: FC<Props> = ({ navigation, item }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("PhotoDetails", item)}>
      <View style={styles.card}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={{
              uri: item.urls.thumb || "https://placehold.co/500x500",
            }}
          />
        </View>

        <View style={styles.main}>
          <Text style={styles.description}>
            {item.description || "Description is empty!"}
          </Text>
          <Text style={styles.user}>{item.user.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PhotoCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 12,
    flexWrap: "wrap",
  },
  imgContainer: {
    width: "40%",
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  main: {
    flex: 1,
    justifyContent: "space-between",
    width: "60%",
    gap: 4,
    padding: 16,
  },
  description: {
    fontSize: 18,
    fontFamily: "aeonik-bold",
  },
  user: {
    fontSize: 14,
    color: "#999",
  },
});
