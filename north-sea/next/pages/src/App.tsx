import React from "react";
import {
  createNavigationContainerRef,
  NavigationContainer,
  useNavigation
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Image, ImageBackground, Dimensions } from "react-native";
import { StartUp, Battle, Main } from "./types/imports";
import { Provider as PaperProvider, Button } from "react-native-paper";

class MainMenu extends React.Component<
  {
    returnState?: (shown: boolean, pstate: boolean) => boolean;
    navigation: any;
  },
  {
    show: boolean;
    playerState: string;
    returnButton: JSX.Element;
    buttonShow: boolean;
    showMenu: boolean;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      showMenu: true,
      playerState: "",
      returnButton: (
        <Button
          onPress={() => {
            this.setState({ show: true });
            this.setState({ buttonShow: false });
          }}
        >
          Play Again
        </Button>
      ),
      buttonShow: false
    };
  }

  menuReturn = (
    map: boolean,
    chap1: boolean,
    empty2: boolean,
    empty3: boolean
  ) => {
    if (map == true) {
      const navigation = this.props.navigation;
      navigation.navigate("Battle");
    }
  };

  render() {
    return (
      <PaperProvider>
        <View>
          <ImageBackground
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height
            }}
            source={StartUp}
          >
            {this.state.show && <Battle />}
            <View
              style={{
                position: "absolute"
              }}
            >
              {this.state.showMenu && (
                <Main
                  title="Menu"
                  option1="Free battle"
                  option2="Demo Chapter 1"
                  returnState={this.menuReturn}
                />
              )}
            </View>
          </ImageBackground>
        </View>
      </PaperProvider>
    );
  }
}

function Wrapper(props) {
  const navigation = useNavigation();
  return <MainMenu navigation={navigation} />;
}

export default function () {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainMenu">
          <Stack.Screen name="MainMenu" component={Wrapper} />
          <Stack.Screen name="Battle" component={Battle} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
