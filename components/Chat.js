import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

// importing Gifted-Chat library
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";


// import firebase
import firebase from 'firebase';
import firestore from 'firebase';

// import AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// import netinfo package
import NetInfo from "@react-native-community/netinfo";

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
      isConnected: false,
      loggedInText: "Please waite you're getting logged in.",
      location: null,
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

  // get all messages asynchronously 
  async getMessages() {
    let messages = " ";

    // wrap the logic inside try
    try {
      messages = await AsyncStorage.getItem("messages") || [];

      // update messages
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch(error) {
      console.log(error.messages);
    }
  };

   // save new messages
   async saveMessages() {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(this.state.messages));
    } catch(error) {
      console.log(error.message);
    }
  }

  // delete messages
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    // get all messages
    this.getMessages();

    // check the user's internet connection
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({
          isConnected: true,
        });
        firebase.auth().signInAnonymously();
      } else {
        this.setState({
          isConnected: false,
        });
        alert("check you internet connection.");
      }
    });
    
    // creating a references to messages in database
    this.referenceChatMessages = firebase
      .firestore()
      .collection("messages");

    // authentication
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // check internet connection
      if (!user) {
        firebase.auth().signInAnonymously();
        getMessages();
      }
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user._id,
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

  componentWillUnmount() {

    // to stop receiving updates about the collection
    this.unsubscribe();
    this.authUnsubscribe();
  }

  // add new messages to the database
  addMessage = () => {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: message.user,
      avatar: message.avatar || null,
      location: message.location || null,
    });
  };

  // when users send new messages:
  onCollectionUpdate = (querySnapshot) => {
    if (!this.state.isConnected) return;
    const messages = [];

    //go through each document
    querySnapshot.forEach((doc) => {

      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        avatar: data.avatar,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
  };

  // to append new messages to the message object
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
    () => {
      const message = messages[0];
      this.addMessage(message);

      // add a callback function to save new message when sent
      this.saveMessages();
    });
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
          left: {
            backgroundColor: "#fff",
          },
        }}
      />
    );
  }


  // only render the input when user is online (avoiding sending mssgs when user is offline)
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar
        {...props} 
        />
      );
    }
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
        <Text style={styles.loggedInText}>{this.state.loggedInText}</Text>
        <GiftedChat

          // adding renderBubble prop to change sender's bubble color
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.uid,
            avatar: '',
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
  loggedInText: {
    textAlign: "center",
    color: "white",
  }
});
