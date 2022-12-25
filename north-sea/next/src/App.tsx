import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Battle from "./firstbattle";
import { Provider } from "react-redux";
import store from "./store";
import MainMenu from "./main";
import increment from "./reducer";

type RootStackParamList = {
  MainMenu: undefined;
  Battle: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Wrapper() {
  const navigation = useNavigation();
  return <MainMenu navigation={navigation} />;
}

function BattleWrapper() {
  const navigation = useNavigation();
  return <Battle navigation={navigation} />;
}

export default function () {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainMenu">
          <Stack.Screen name="MainMenu" component={Wrapper} />
          <Stack.Screen name="Battle" component={BattleWrapper} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
