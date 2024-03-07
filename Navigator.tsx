import React from "react";
import { Home, PhotoDetails } from "./screens";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import type { IPhoto } from "./helpers";
import { headerStyles } from "./styles";

export type RootStackParamList = {
  Home: undefined;
  PhotoDetails: IPhoto;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home page",
            ...headerStyles,
          }}
        />
        <Stack.Screen
          name="PhotoDetails"
          component={PhotoDetails}
          options={{ title: "About photo", ...headerStyles }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
