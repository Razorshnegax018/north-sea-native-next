import React, { KeyboardEvent } from "react";
import { Button } from "react-native-paper";
import {
  Image,
  Pressable,
  Text,
  View,
  Animated,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TextInput,
} from "react-native";
import {
  FreeCruise,
  AppState,
  PlayerSelectsType,
  Infantry,
  Trainee,
  Ocean,
  CannonFireAnim,
} from "./types/imports";
import { connect } from "react-redux";
import store, { root } from "./store";
import { increment, decrement } from "./reducer";

const mapState = (state: root) => ({
  value: state.value,
});

const s = StyleSheet.create({
  health: {
    color: "#117A65",
    fontWeight: "bold",
  },
  attack: {
    color: "firebrick",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

/** Inverals for movement */
let ins: { up: number; down: number; left: number; right: number } = {
  up: 0,
  down: 0,
  left: 0,
  right: 0,
};

const ssplayer = new Infantry([36, 6, false, 2000]);
// const en = new Trainee([40, 4, false, 3000]);

class Battle extends React.Component<
  { navigation; increment: (payload: number) => any; value: number },
  AppState
> {
  /** Player positions: *were* passed to enemy component (they don't update though cause react is gay)*/
  pos: { p1: number[]; p2: number[]; p3: number[]; enemy: number[] };
  pSelect: PlayerSelectsType;
  didAttack: boolean;
  /** Just being declared here for now. Not intalized till line 69 ( ͡° ͜ʖ ͡°) */
  interval: number;
  d: { width: number; height: number };
  state: AppState = {
    p1loc: [60, Dimensions.get("window").width - 32],
    enloc: [200, 0],
    weaponView: [false, false],
    opacity: [1, 1],
    pstats: ssplayer.setStats(),
    enstats: [40, 4, false, 3000],
    log: [],
    pIsSelect: false,
    anims: { move: false, fire: false },
    playing: false,
    playerIsPressed: false,
  };
  constructor(props) {
    super(props);
    this.pos = {
      p1: this.state.p1loc,
      p2: [0],
      p3: [0],
      enemy: this.state.enloc,
    };
    /** Player selects, known as ps to children. Remember to pass to all children!  */
    this.pSelect = {
      p1: false,
      p2: false,
      p3: false,
    };
    this.didAttack = false;
    this.d = {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    };
  }

  /** The function that handles the sending of telegraphs */
  sendTelegraph(value: string) {}

  /** The method for the attack animation: will be called mulitple times, so will be bound */
  async attack() {
    const e = this.state.enstats;
    const p = this.state.pstats;
    this.setState({
      anims: {
        fire: true,
        move: false,
      },
      playing: true,
    });
    setTimeout(() => {
      this.setState({
        anims: {
          fire: false,
          move: true,
        },
        playing: false,
      });
    }, 3000);
    this.setState({
      enstats: [e[0] - p[1], e[1], e[2], e[3]],
      pIsSelect: false,
    });
    return;
  }

  takeDamage = (who: string): any => {
    switch (who) {
      case "player":
        this.setState({ opacity: [0, 1] });
        setTimeout(() => {
          this.setState({ opacity: [1, 1] });
        }, 300);
        break;
      case "enemy":
        this.setState({ opacity: [1, 0] });
        setTimeout(() => {
          this.setState({ opacity: [1, 1] });
        }, 300);
        break;
    }
  };

  setAttack = (attack: boolean) => {
    this.didAttack = attack;
  };

  moveleft = (speed: number) => {
    const e = this.state.enloc;
    this.setState((state) => {
      return { enloc: [e[0], e[1] - speed] };
    });
  };
  moveright = (speed: number) => {
    const e = this.state.enloc;
    this.setState((state) => {
      return { enloc: [e[0], e[1] + speed] };
    });
  };

  componentDidMount() {
    setInterval(() => {
      this.moveright(0.1);
    }, 1);
  }

  render() {
    const p = this.state.pstats;
    const e = this.state.pstats;
    if (this.state.playing === false) {
      // Returns the normal render content if there is no animation
      return (
        <View>
          <ImageBackground
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
            }}
            source={Ocean}
          >
            {this.state.anims.fire && (
              <View
                style={{
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").height,
                  position: "absolute",
                }}
              >
                <CannonFireAnim />
              </View>
            )}
            <View>
              <Pressable
                onPress={() => {
                  this.setState({ playerIsPressed: true });
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: this.state.p1loc[0],
                    left: this.state.p1loc[1],
                  }}
                >
                  <Animated.Image
                    source={require("../public/icons/black/freecruise.jpg")}
                    style={{
                      width: 22,
                      height: 28,
                      left: 5,
                    }}
                  />
                </View>
              </Pressable>

              {/** ENEMY VIEW */}
              <Pressable
                onPress={() => {
                  if (this.state.playerIsPressed) {
                    alert("Redux Increment!");
                    this.props.increment(1);
                    console.log(store.getState());
                  }
                }}
              >
                <View
                  style={{
                    top: this.state.enloc[0],
                    left: this.state.enloc[1],
                    position: "absolute",
                  }}
                >
                  <Image
                    source={FreeCruise}
                    style={{
                      width: 22,
                      height: 28,
                      left: 5,
                      opacity: this.state.opacity[1],
                    }}
                  />
                </View>
              </Pressable>
              {/** View for logs */}
              <View
                style={{
                  position: "absolute",
                  left: 200,
                  top: 500,
                  width: 500,
                  height: 100,
                  borderStyle: "solid",
                  borderWidth: 2,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  {this.state.log.map((s, i) => {
                    return <Text>{this.state.log[i]}</Text>;
                  })}
                </View>
              </View>
              {/** View for the surrender button, will be put into a menu soon */}
              <View
                style={{
                  position: "absolute",
                  top: 350,
                }}
              >
                <Button
                  onPress={() => {
                    this.props.navigation.popToTop();
                  }}
                >
                  {String(this.props.value)}
                </Button>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    } else if (this.state.playing === true) {
      return <View>{this.state.anims.fire && <CannonFireAnim />}</View>;
    }
  }
}

export default connect(mapState, { increment })(Battle);
