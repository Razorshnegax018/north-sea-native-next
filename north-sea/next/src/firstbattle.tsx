import React, { KeyboardEvent } from "react";
import { Button, Appbar } from "react-native-paper";
import {
  Image,
  Pressable,
  Text,
  View,
  Animated,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import {
  FreeCruise,
  AppState,
  PlayerSelectsType,
  PatrolBoat,
  Ocean,
  Container,
  UnitStatusBar,
  Trainee,
  Battery,
} from "./types/imports";
import { connect, ConnectedProps } from "react-redux";
import store, { root } from "./store";
import { attack, takeDamage, moveEnemy, changePlayer } from "./reducer";

const mapState = (state: root) => ({
  health: state.playerStats.health,
  attack: state.playerStats.attack,
  enattack: state.enemyStats.attack,
  enhealth: state.enemyStats.health,
  enemyLocs: state.enemyLocations,
  playing: state.playing,
  playerLocs: state.playerLocations,
  batterypos: state.batteryPos,
});

const Enemy = new Trainee({ health: 40, attack: 3, reloadSpeed: 3000 }, [
  { top: 200, left: 0 },
]);

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

const ssplayer = new PatrolBoat({ health: 36, attack: 6, reloadSpeed: 2000 });
// const en = new Trainee([40, 4, false, 3000]);

type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapState, {
  attack,
  takeDamage,
  moveEnemy,
  changePlayer,
});

interface BattleProps extends PropsFromRedux {
  navigation;
  health: number;
}

class Battle extends React.Component<BattleProps, AppState> {
  /** Player positions: *were* passed to enemy component (they don't update though cause react is gay)*/
  pos: { p1: number[]; p2: number[]; p3: number[]; enemy: number[] };
  pSelect: PlayerSelectsType;
  didAttack: boolean;
  /** Just being declared here for now. Not intalized till line 69 ( ͡° ͜ʖ ͡°) */
  interval: number;
  d: { width: number; height: number };
  state: AppState = {
    p1loc: [],
    enloc: [200, 0],
    weaponView: [false, false],
    opacity: [1, 1],
    log: [],
    pIsSelect: false,
    anims: { move: false, fire: false },
    playing: false,
    playerIsPressed: false,
    showPallet: false,
    showDamageNumbers: false,
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

  /** The method for the attack animation: will be called mulitple times, so will be bound */
  async attack() {
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
    }, 6000);
    this.props.attack();
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
    if (this.state.playing === true) {
      return;
    } else if (this.state.playing === false) {
      setInterval(() => {
        this.props.moveEnemy({ dir: "right", enemyIndex: 0, speed: 0.1 });
      }, 1);
      setInterval(() => {});
    }
  }

  render() {
    if (this.state.playing === false) {
      // Returns the normal render content if there is no animation
      return (
        <View>
          <ImageBackground
            style={{
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height,
            }}
            source={Ocean}
          >
            {this.state.anims.fire && (
              <View
                style={{
                  width: Dimensions.get("screen").width,
                  height: Dimensions.get("screen").height,
                  position: "absolute",
                }}
              >
                <Container />
              </View>
            )}

            {/** PLAYER VIEW */}
            <View>
              <Pressable
                onPress={() => {
                  this.setState({ playerIsPressed: true });
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: this.props.playerLocs[0],
                    left: this.props.playerLocs[1],
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
                  {}
                </View>
              </Pressable>

              {/** BATTERY VIEW */}
              <View></View>

              {/** ENEMY VIEW */}
              <Pressable
                onPress={() => {
                  if (this.state.playerIsPressed) {
                    this.attack();
                  }
                }}
              >
                <View
                  style={{
                    top: this.props.enemyLocs[0].top,
                    left: this.props.enemyLocs[0].left,
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

                  {}

                  {this.state.playerIsPressed && (
                    <View
                      style={{
                        borderWidth: 1,
                        position: "relative",
                        top: -30,
                        left: 0,
                        height: 30,
                        width: 30,
                        backgroundColor: "firebrick",
                        borderStyle: "solid",
                        opacity: 0.5,
                      }}
                    />
                  )}
                </View>
              </Pressable>
              {/** View for side Pallet */}
              {this.state.showPallet && (
                <View
                  style={{
                    alignSelf: "flex-end",
                    marginTop: -5,
                    position: "absolute",
                  }}
                >
                  <UnitStatusBar />
                </View>
              )}
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
                  {"Hey thre brose"}
                </Button>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    } else if (this.state.playing === true) {
      return <View>{this.state.anims.fire && <Container />}</View>;
    }
  }
}

export default connector(Battle);
