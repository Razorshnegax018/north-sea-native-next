// @generated: @expo/next-adapter@2.1.52
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import App from "../src/App";
import { Button, TextInput } from "react-native-paper";

export class Apper extends React.Component<
  {},
  { currentText: string; todos: string[] }
> {
  constructor(props) {
    super(props);
    this.state = {
      currentText: "",
      todos: [],
    };
  }

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.currentText}👋</Text>
        <Button
          onPress={() => {
            alert("Yeeberg");
          }}
          mode="outlined"
        >
          Add Todo
        </Button>

        <TextInput
          label="todo"
          value={this.state.currentText}
          onChangeText={(text) => this.setState({ currentText: text })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});

export default App;
