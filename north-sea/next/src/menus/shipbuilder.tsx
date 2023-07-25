import React from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Divider, Appbar, AnimatedFAB, FAB } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Builder } from "./builder"

interface Props {
  navigation;
}

type ShipType = {
  name: string;
  id: number;
};

interface State {
  extended: boolean;
  ships: ShipType[];
}

const keyExtractor = (item: { id: string }) => item.id;

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const Tab = createBottomTabNavigator();

interface ItemProps extends ShipType {}

const ShipListItem: React.FC<{ name: string }> = (props) => {
  return (
    <Pressable onPress={() => {}}>
      <Text style={s.txt}>{props.name}</Text>
    </Pressable>
  );
};

const Placeholder: React.FC = () => {
  return <Text>Hey there bros</Text>;
};

export default class Shipbuilder extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      extended: false,
      ships: [
        { name: "Premier Guards Torpedo Boat", id: 1 },
        { name: "Royal Navy C.Attack Boat", id: 2 },
      ],
    };
  }
  render() {
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen name="Buildyard" component={Placeholder} />
          <Tab.Screen name="Dockyards" component={Dockyard} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

class Dockyard extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      extended: false,
      ships: [
        { name: "Premier Guards Torpedo Boat", id: 1 },
        { name: "Royal Navy C.Attack Boat", id: 2 },
      ],
    };
  }
  render() {
    return (
      <SafeAreaView style={s.container}>
        <FlatList
          ItemSeparatorComponent={Divider}
          renderItem={({ item }) => <ShipListItem name={item.name} />}
          keyExtractor={(item) => item.id}
          data={this.state.ships}
        />
      </SafeAreaView>
    );
  }
}

const s = StyleSheet.create({
  fabStyle: {
    top: 128,
    left: 128,
    height: 64,
    width: 64,
  },
  ship: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  txt: {
    fontSize: 18,
    padding: 10,
  },
  container: {
    flex: 1,
  },
});
