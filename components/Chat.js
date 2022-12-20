import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

// importing Gifted-Chat library
import { Bubble, GiftedChat } from "react-native-gifted-chat";

export default class Chat extends React.Component {
  // State initializing
  constructor() {
    super();
    this.state = {
      message: [],
    };
  }
  componentDidMount() {
    // setting the state with static message to be able to see each UI element displayed on the screen right away
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        // adding system message
        {
          _id: 2,
          text: "You've entered the Chat.",
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }
    // to show user's name on the top of the chat page
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
  }
  render() {
    // setting the color property for th background color in chat screen
    let color = this.props.route.params.color;
    return (
      <View style={[styles.chatContainer, { backgroundColor: color }]}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Start")}
        >
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
    alignItems: "center",
  },
  button: {
    color: "#FFF",
    fontSize: 24,
  },
});
