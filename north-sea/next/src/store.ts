import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducer";

export type root = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({ reducer: mainReducer });

export default store;
