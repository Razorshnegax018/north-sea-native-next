import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

const UnitStatusBar: React.FunctionComponent = (props) => {
  return (
    <View
      style={{
        borderStyle: "solid",
        borderWidth: 1,
        backgroundColor: "white",
        width: 300,
        height: 120,
        opacity: 0.2,
      }}
    >
      <Text>Hey there bros</Text>
    </View>
  );
};

/** Battery component: autofired and to be slid accross the screen like batteryfire */
export const Battery: React.FunctionComponent = () => {
  return (
    <View
      style={{
        borderColor: "black",
        borderStyle: "solid",
        width: 1,
        length: 32,
      }}
    />
  );
};

export const DamageNumbers: React.FunctionComponent = (props: {
  damage: number;
}) => {
  /** Opacity for damage numbers */
  const [opa, sopa] = useState(0);
  useEffect(() => {}, []);
  return (
    <Text
      style={{
        fontFamily: "monospace",
        color: "crimson",
      }}
    >
      - {props.damage}
    </Text>
  );
};

export default UnitStatusBar;
