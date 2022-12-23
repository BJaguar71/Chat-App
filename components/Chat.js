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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

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
  // to append new messages to the message object
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  // creating renderBubble function
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#4a676f",
          },
        }}
      />
    );
  }

  render() {
    // to show user's name on the top of the chat page
    let name = this.props.route.params.name;
    // takes the name from the variable above and give it to the title of the Chat screen
    this.props.navigation.setOptions({ title: name });

    // setting the color property for th background color in chat screen
    let color = this.props.route.params.color;

    return (
      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          // adding renderBubble prop to change sender's bubble color
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
          // accessibility props
          accessible={true}
          accessibilityLabel="Chat input field"
          accessibilityHint="Here you can enter the message. afterwards, you can press send on the right side."
        />
        {/* for android devices / to unhide text input when typing */}
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
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
