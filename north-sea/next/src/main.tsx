import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ImageBackground, Dimensions } from "react-native";
import { StartUp, Main, Infantry } from "./types/imports";
import { Provider as PaperProvider, Button } from "react-native-paper";
import { connect } from "react-redux";
import store, { root } from "./store";
import { increment, decrement } from "./reducer";

const mapState = (state: root) => ({
  value: state.value,
});

class MainMenu extends React.Component<
  {
    returnState?: (shown: boolean, pstate: boolean) => boolean;
    navigation: any;
    increment: () => any;
    value: number;
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
      buttonShow: false,
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
      const ssplayer = new Infantry([36, 6, false, 2000]);
      navigation.navigate("Battle", {
        setStats: ssplayer.setStats(),
      });
    } else if (empty2 == true) {
      this.props.increment(1);
      console.log(store.getState());
    }
  };

  render() {
    return (
      <PaperProvider>
        <View>
          <ImageBackground
            style={{
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height,
            }}
            source={StartUp}
          >
            <View
              style={{
                position: "absolute",
              }}
            >
              {this.state.showMenu && (
                <Main
                  title="Menu"
                  option1="Free Battle"
                  option2="Demo Chapter 1"
                  option3="Add count"
                  option4={"Count: " + this.props.value}
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

export default connect(mapState, { increment })(MainMenu);
