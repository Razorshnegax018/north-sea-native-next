import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PatrolBoat, Trainee } from "./types/imports";

// Define a type for the slice state
interface CounterState {
  value: number;
}

const Player = new PatrolBoat({ health: 36, attack: 6, reloadSpeed: 2000 });

const Enemy = new Trainee({ health: 40, attack: 3, reloadSpeed: 3000 }, [
  { top: 200, left: 0 },
]);

type Enemylocations = {
  top: number;
  left: number;
};

interface StatState {
  playerStats: { health: number; attack: number; reloadSpeed: number };
  enemyStats: { health: number; attack: number; reloadSpeed: number };
  enemyLocations: Enemylocations[];
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
};

const initialStatState: StatState = {
  playerStats: Player.setStats(),
  enemyStats: Enemy.setStats(),
  enemyLocations: Enemy.setSpawnPoint(),
};

export const statsSlice = createSlice({
  name: "entitiy-stats",
  initialState: initialStatState,
  reducers: {
    /** Redux reducer for the player to take damage */
    takeDamage: (state) => {
      state.playerStats.health -= state.enemyStats.attack;
    },
    /** Redux reducer for the player to attack */
    attack: (state) => {
      state.enemyStats.health -= state.playerStats.attack;
    },
    /** Moves selected enemy left or right at a certain speed */
    moveEnemy: (
      state,
      action: PayloadAction<{
        dir: "right" | "left";
        enemyIndex: number;
        speed: number;
      }>
    ) => {
      if (action.payload.dir === "right") {
        state.enemyLocations[action.payload.enemyIndex].left +=
          action.payload.speed;
      }
    },
  },
});

export const counterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { takeDamage, attack, moveEnemy } = statsSlice.actions;

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default statsSlice.reducer;
