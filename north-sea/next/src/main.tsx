import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ImageBackground, Dimensions } from "react-native";
import { StartUp, Main } from "./types/imports";
import { Provider as PaperProvider, Button } from "react-native-paper";
import { connect } from "react-redux";
import store, { root } from "./store";
import { attack, takeDamage } from "./reducer";
import Image from "next/image";

const mapState = (state: root) => ({
  health: state.playerStats.health,
  attack: state.playerStats.attack,
  enattack: state.enemyStats.attack,
});

class MainMenu extends React.Component<
  {
    returnState?: (shown: boolean, pstate: boolean) => boolean;
    navigation: any;
    takeDamage: () => any;
    health: number;
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
    shipbuild: boolean
  ) => {
    const navigation = this.props.navigation;
    if (map == true) {
      navigation.navigate("Battle");
    } else if (empty2 == true) {
      this.props.takeDamage();
      console.log(store.getState());
    } else if (shipbuild == true) {
      navigation.navigate("Shipbuilder");
    }
  };

  render() {
    return (
      <PaperProvider>
        <View>
          <ImageBackground
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
              position: "absolute",
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
                  option4={"Shipbuilder"}
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

export default connect(mapState, { takeDamage })(MainMenu);
