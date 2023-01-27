import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PatrolBoat, Trainee } from "./types/imports";

// Define a type for the slice state
interface CounterState {
  value: number;
}

const Player = new PatrolBoat({ health: 36, attack: 6, reloadSpeed: 2000 });

const Enemy = new Trainee({ health: 40, attack: 3, reloadSpeed: 3000 });

interface StatState {
  playerStats: { health: number; attack: number; reloadSpeed: number };
  enemyStats: { health: number; attack: number; reloadSpeed: number };
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
};

const initialStatState: StatState = {
  playerStats: Player.setStats(),
  enemyStats: Enemy.setStats(),
};

export const statsSlice = createSlice({
  name: "entitiy-stats",
  initialState: initialStatState,
  reducers: {
    takeDamage: (state) => {
      state.playerStats.health -= state.enemyStats.attack;
    },
    attack: (state) => {
      state.enemyStats.health -= state.playerStats.attack;
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

export const { takeDamage, attack } = statsSlice.actions;

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default statsSlice.reducer;
