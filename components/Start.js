import React from "react";
// imported necessary components
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
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

// styling here
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
    textAlign: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    paddingTop: 50,
  },
  startWrapper: {
    backgroundColor: "#FFFFFF",
    marginTop: 150,
    height: "40%",
    borderRadius: 10,
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "6%",
  },
  input: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 50,
    height: 60,
    width: "88%",
    borderColor: "lightgrey",
    borderWidth: 2,
    borderRadius: 5,
    padding: "5%",
  },
  colorWrapper: {
    width: "88%",
    justifyContent: "center",
  },
  textColor: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    marginTop: 10,
  },
  colors: {
    flexDirection: "row",
    justifyContent: "center",
  },
  color: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginTop: 10,
    marginRight: 25,
  },
  button: {
    height: 60,
    width: "88%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#757083",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
