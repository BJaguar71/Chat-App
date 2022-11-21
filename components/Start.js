import React from "react";
// imported necessary components
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// colors to choose before starting the chat
const backgroundColors = {
  black: "#090C08",
  purple: "#474056",
  grey: "#8A95A5",
  green: "#B9C6AE",
};

// defined Start react class component to create the start page
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    // empty string assigned to the state for the user's name and color
    this.state = { name: "", color: "" };
  }
  render() {
    return (
      <View style={styles.container}>
        {/* image background were added here */}
        <ImageBackground
          source={require("../assets/bgImg.png")}
          style={styles.backgroundImage}
        >
          <Text style={styles.title}>Chat App</Text>
          {/* wrapping the textinput, colors and button here */}
          <View style={styles.startWrapper}>
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder="Write your name here..."
            />
            <View style={styles.colorWrapper}>
              <Text style={styles.textColor}>Choose Background Color:</Text>
              <View style={styles.colors}>
                <TouchableOpacity
                  style={[
                    styles.color,
                    { backgroundColor: backgroundColors.black },
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.black })
                  }
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    { backgroundColor: backgroundColors.purple },
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.purple })
                  }
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    { backgroundColor: backgroundColors.grey },
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.grey })
                  }
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    { backgroundColor: backgroundColors.green },
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.green })
                  }
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('Chat', {
                  name: this.state.name,
                  color: this.state.color,
                })
              }
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

