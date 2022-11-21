import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class Chat extends React.Component {
  componentDidMount() {
    // to show user's name on the top of the chat page
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({title: name})
  }
  render() {
    // setting the color property for th background color in chat screen
    let color = this.props.route.params.color;
      return (
      <View style={[styles.chatContainer, {backgroundColor: color }]}>
        <TouchableOpacity 
        onPress={() => this.props.navigation.navigate("Start")} >
          <Text style={styles.button}>Go to Start</Text>
        {/* whenever the user presses the button will be redirected to the start screen */}
        </TouchableOpacity>
      </View>
    );
  }
}

// StyleSheet
const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center"
  },
  button: {
    color: "#FFF", 
    fontSize: 24
  }
})