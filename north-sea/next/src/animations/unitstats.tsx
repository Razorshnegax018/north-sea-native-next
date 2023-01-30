import React from "react";
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

export default UnitStatusBar;
