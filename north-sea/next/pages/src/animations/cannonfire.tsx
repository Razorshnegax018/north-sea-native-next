import React, { useEffect } from "react";
import { View, createElement, Dimensions } from "react-native";
import axios from "axios";

import useQuery from "react-query";

const CannonFireAnim: React.FC<{}> = () => {
  const data = axios.get("https://northseaapi.razorshnegax.repl.com/fire");

  return (
    <video
      width={Dimensions.get("window").width}
      height={Dimensions.get("window").height}
      autoPlay
      preload="true"
      src="https://northseaapi.razorshnegax.repl.com/fire"
    />
  );
};

const Container: React.FC<{}> = () => {
  return (
    <View>
      <CannonFireAnim />
    </View>
  );
};

export default Container;
