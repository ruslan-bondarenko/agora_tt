import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../Navigator";
import { globalStyles } from "../../styles";
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type PostScreenRouteProp = RouteProp<RootStackParamList, "PhotoDetails">;

type Props = {
  navigation?: HomeScreenNavigationProp;
  route: PostScreenRouteProp;
};

const PhotoDetails: React.FC<Props> = ({ route }) => {
  const { description, urls, user } = route.params;

  return (
    <View style={globalStyles.container}>
      <View style={styles.gallery}>
        <View>
          <Image
            style={styles.mainImage}
            source={{
              uri: urls.full,
            }}
          />
        </View>
      </View>

      <View style={styles.main}>
        <Text style={styles.description}>
          {description || "Description is empty!"}
        </Text>
        <Text style={styles.user}>{user?.name}</Text>
      </View>
      <Text>{route.params.description}</Text>
    </View>
  );
};

export default PhotoDetails;

const styles = StyleSheet.create({
  gallery: {
    gap: 8,
  },
  mainImage: {
    aspectRatio: 1,
    width: "100%",
    borderRadius: 12,
  },
  main: {
    gap: 4,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  description: {
    fontSize: 18,
    fontFamily: "aeonik-bold",
    maxWidth: "80%",
  },
  user: {
    fontSize: 14,
    color: "#999",
  },
});
