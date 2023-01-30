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
} from "react-native";
import {
  FreeCruise,
  AppState,
  PlayerSelectsType,
  PatrolBoat,
  Ocean,
  CannonFireAnim,
  UnitStatusBar,
  Trainee,
} from "./types/imports";
import { connect, ConnectedProps } from "react-redux";
import store, { root } from "./store";
import { attack, takeDamage, moveEnemy } from "./reducer";

const mapState = (state: root) => ({
  health: state.playerStats.health,
  attack: state.playerStats.attack,
  enattack: state.enemyStats.attack,
  enhealth: state.enemyStats.health,
  enemyLocs: state.enemyLocations,
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

const connector = connect(mapState, { attack, takeDamage, moveEnemy });

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
    p1loc: [60, Dimensions.get("window").width - 32],
    enloc: [200, 0],
    weaponView: [false, false],
    opacity: [1, 1],
    log: [],
    pIsSelect: false,
    anims: { move: false, fire: false },
    playing: false,
    playerIsPressed: false,
    showPallet: false,
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
    setInterval(() => {
      this.props.moveEnemy({ dir: "right", enemyIndex: 0, speed: 0.1 });
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
                    this.props.attack();
                    console.log(store.getState());
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
      return <View>{this.state.anims.fire && <CannonFireAnim />}</View>;
    }
  }
}

export default connector(Battle);
