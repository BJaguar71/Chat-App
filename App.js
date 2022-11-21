import React, { Component } from 'react';

// import react native gesture handler
import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// importing other screens here
import Start from './components/Start';
import Chat from './components/Chat';

// create the navigator and assigning it to a variable
const Stack = createStackNavigator();

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    // initialized the state to an empty string (the state will change)
    this.state = { text: "" };
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          {/* adding list of Stack.Screen here */}
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}