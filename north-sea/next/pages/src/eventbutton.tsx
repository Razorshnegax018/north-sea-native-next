import React, { useState } from "react";
import { Text, View, Pressable, Animated, Dimensions } from "react-native";

interface Props {
  /** The title for the alert */
  title: string;
  /** The message for the alert */
  message?: string;
  /** Ok/Cancel button return */
  returnState: (ok: boolean, cancel: boolean) => any;
  yesFunc: <T>() => T;
}

interface MenuProps {
  /** Option 1 */
  option1: string;
  option2: string;
  option3: string;
  /** The message for the alert */
  message?: string;
  /** Ok/Cancel button return */
  returnState: (ok: boolean, cancel: boolean) => any;
  exeFunc1: () => any;
  exeFunc2: () => any;
  exeFunc3: () => any;
  exeFunc4: () => any;
}

interface ItemProps {
  /** Item 1 */
  item1: string;
  item2?: string;
  item3?: string;
  /** Item 1 function */
  item1Func: (...p: any) => void;
  item2Func?: <T>() => T;
}

interface MainProps {
  /** Return state:    
    switcht: boolean,
    view: boolean,
    quit: boolean,
    cancel: boolean */
  returnState: (
    switcht: boolean,
    view: boolean,
    quit: boolean,
    cancel: boolean
  ) => void;
  title: string;
  option1: string;
  option2?: string;
  option3?: string;
  option4?: string;
}

export const Main: React.FC<MainProps> = (props) => {
  const [fadeIn] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        backgroundColor: "burlywood",
        width: 170,
        height: 300,
        borderWidth: 3,
        borderColor: "black",
        opacity: fadeIn,
        left: Dimensions.get("window").width / 2.3,
        top: Dimensions.get("window").height / 4
      }}
    >
      <Text
        style={{
          fontSize: 40,
          top: 0,
          color: "white",
          textAlign: "center"
        }}
      >
        {props.title}
      </Text>
      <Pressable
        onPress={() => {
          props.returnState(true, false, false, false);
        }}
        style={{ top: 60, position: "absolute" }}
      >
        <Text
          style={{
            color: "black",
            textAlign: "center",
            fontWeight: "bold",
            top: 0
          }}
        >
          {props.option1}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          props.returnState(false, true, false, false);
        }}
        style={{ top: 120, position: "absolute" }}
      >
        <Text
          style={{
            color: "black",
            textAlign: "center",
            fontWeight: "bold",
            top: 0
          }}
        >
          {props.option2}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          props.returnState(false, false, true, false);
        }}
        style={{ top: 180, position: "absolute" }}
      >
        <Text
          style={{
            top: 0,
            color: "black",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          {props.option3}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          props.returnState(false, false, false, true);
        }}
        style={{ top: 240, position: "absolute" }}
      >
        <Text
          style={{
            top: 0,
            color: "black",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          {props.option4}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const Message: React.FC<Props> = (props) => {
  return (
    <View
      style={{
        backgroundColor: "darkslategrey",
        width: 170,
        height: 170
      }}
    >
      <Text
        style={{
          fontSize: 40,
          top: 0,
          color: "white",
          textAlign: "center"
        }}
      >
        {props.title}
      </Text>
      <Text
        style={{
          top: 60,
          color: "white",
          textAlign: "center"
        }}
      >
        {props.message}
      </Text>
      <Pressable
        onPress={() => {
          props.yesFunc();
        }}
      >
        <Text style={{ color: "white" }}>Yes</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          props.returnState(false, true);
        }}
      >
        <Text style={{ color: "white" }}>No</Text>
      </Pressable>
    </View>
  );
};

export const Menu: React.FC<MenuProps> = (props) => {
  return (
    <View
      style={{
        backgroundColor: "burlywood",
        width: 70,
        height: 170
      }}
    >
      <Pressable
        onPress={() => {
          props.exeFunc1();
        }}
        style={{ top: 0 }}
      >
        <Text
          style={{
            color: "black",
            textAlign: "center",
            fontWeight: "bold",
            top: 0
          }}
        >
          {props.option1}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          props.exeFunc2();
        }}
        style={{ top: 40 }}
      >
        <Text
          style={{
            color: "black",
            textAlign: "center",
            fontWeight: "bold",
            top: 0
          }}
        >
          {props.option2}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          props.exeFunc3();
        }}
        style={{ top: 80 }}
      >
        <Text
          style={{
            top: 0,
            color: "black",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          {props.option3}
        </Text>
      </Pressable>
    </View>
  );
};

export const Items: React.FC<ItemProps> = (props) => {
  return (
    <View
      style={{
        backgroundColor: "burlywood",
        width: 70,
        height: 170
      }}
    >
      <Pressable
        onPress={() => {
          props.item1Func();
        }}
      >
        <Text
          style={{
            top: 0,
            color: "black",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          {props.item1}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          switch (typeof props.item2Func) {
            case undefined:
              break;
            default:
              props.item2Func();
          }
        }}
      >
        <Text
          style={{
            top: 40,
            color: "black",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          {props.item2}
        </Text>
      </Pressable>
    </View>
  );
};

export default Message;
