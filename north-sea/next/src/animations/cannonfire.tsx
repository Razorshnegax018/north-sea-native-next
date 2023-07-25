import React, { useEffect } from "react";
import { View, createElement, Dimensions } from "react-native";
import ReactPlayer from "react-player/lazy";

const CannonFireAnim: React.FC<{}> = () => {
  return (
    <View
      style={{
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
      }}
    >
      <ReactPlayer
        url="/animations/CannonFireAnim.mp4"
        controls={false}
        playing={true}
        muted={true}
        width={Dimensions.get("screen").width}
        height={Dimensions.get("screen").height}
      />
    </View>
  );
};

const Container: React.FC<{}> = () => {
  return (
    <View
      style={{
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
      }}
    >
      <CannonFireAnim />
    </View>
  );
};

export default Container;
