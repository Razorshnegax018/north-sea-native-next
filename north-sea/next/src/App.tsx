import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Battle from "./firstbattle";
import { Provider } from "react-redux";
import store from "./store";
import MainMenu from "./main";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { Shipbuilder } from "./types/imports";

type RootStackParamList = {
  MainMenu: undefined;
  Battle: undefined;
  Shipbuilder: undefined;
};

const CustomAppBar: React.FC = (props: {
  navigation;
  route;
  options;
  back;
}) => {
  const title = getHeaderTitle(props.options, props.route.name);
  return (
    <Appbar.Header>
      {props.back ? (
        <Appbar.BackAction onPress={props.navigation.goBack} />
      ) : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
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

function ShipbuilderWrapper() {
  const navigation = useNavigation();
  return <Shipbuilder navigation={navigation} />;
}

export default function () {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainMenu"
          screenOptions={{
            header: (props) => <CustomAppBar {...props} />,
          }}
        >
          <Stack.Screen name="MainMenu" component={Wrapper} />
          <Stack.Screen name="Battle" component={BattleWrapper} />
          <Stack.Screen name="Shipbuilder" component={ShipbuilderWrapper} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
