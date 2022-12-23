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

// importing firebase
import firebase from 'firebase';
import firestore from 'firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Chat extends React.Component {
  // State initializing
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        avatar: "",
        name: "",
      },
      loggedInText: "Please waite you're getting logged in.",
    };
    // web app's Firebase configuration
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAVRku-7M4i87xTHqT3Zcf0m1uUF_NIwQY",
        authDomain: "chatapp-f248f.firebaseapp.com",
        projectId: "chatapp-f248f",
        storageBucket: "chatapp-f248f.appspot.com",
        messagingSenderId: "153293793325",
        appId: "1:153293793325:web:5649b8c21d0314551d70a4",
      });
    }

    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  componentDidMount() {
    // creating a references to messages in database
    this.referenceChatMessages = firebase.firestore().collection("messages");
    // authentication
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: user.name,
          avatar: "https://placeimg.com/140/140/any",
        },
        loggedInText: "",
      });
      // reference to the firestore to get the collection
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
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
