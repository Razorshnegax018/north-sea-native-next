import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

interface State{
  name: string 
}


export default class Builder extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: ''
    }
  }
  
  render(){
    return (
      <SafeAreaView>
        <TextInput
         label="Name"
         value={name}
         onChangeText={text => this.setState({ name: text })}
        />
      </SafeAreaView>
    )
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})