import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class Chat extends React.Component {
  componentDidMount() {
    // to show user's name on the top of the chat page
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({title: name})
  }
