import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View, Text, StyleSheet, Button } from "react-native";
import { connectActionSheet } from '@expo/react-native-action-sheet';
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import firebase from "firebase";
import firestore from "firebase";
import * as Location from "expo-location";
import MapView from "react-native-maps";

export default class CustomActions extends React.Component {
  //initial state
  state = {
    image: null,
    location: null,
  };

  // choose image from camera roll
  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    try {
      if (status === "granted") {
        // choose image
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: "Images",
        }).catch((error) => console.log(error));

        if (!result.canceled) {
          const imageUrl = await this.uploadImageFetch(result.assets[0].uri);
          this.props.onSend({
            image: imageUrl,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // take photo with camera
  takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    try {
      if (status === "granted") {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.log(error));

        if (!result.canceled) {
          const imageUrl = await this.uploadImageFetch(result.assets[0].uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to upload image mssgs to database
  uploadImageFetch = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      // create new XMLHttpRequest and set its respose type to blob
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    
    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    // reference to the storage
    const ref = firebase.storage().ref().child(`images/${imageName}`);
    const snapshot = await ref.put(blob);
    // close connection agai
    blob.close();

    // retrive the image url from server
    return await snapshot.ref.getDownloadURL();
  };

  // action sheet func
  onActionPress = () => {
    const options = [
      "Choose from Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log("user wants to pick an image");
            return this.pickImage();
          case 1:
            console.log("user wants to take a photo");
            return this.takePhoto();
          case 2:
            console.log("user wants to het their location");
            return this.getLocation();
        }
      }
    );
  };

  // get the user's location
  getLocation = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        const result = await Location.getCurrentPositionAsync({}).catch(
          (error) => console.log(error)
        );
        const longitude = JSON.stringify(result.coords.longitude);
        const altitude = JSON.stringify(result.coords.latitude);

        if (result) {
          this.props.onSend({
            location: {
              longitude: result.coords.longitude,
              latitude: result.coords.latitude,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="More options"
        accessibilityHint="Let's you choose to send an image or your geolocation."
        style={[styles.container]}
        onPress={this.onActionPress}
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextstyle]}>+</Text>
          {/* <Button title="Get my location" onPress={this.getLocation} />
          {this.state.location && (
            <MapView
              style={{ width: 300, height: 200 }}
              region={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          )} */}
        </View>
      </TouchableOpacity>
    );
  }
}

// styles here
const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

// define proptypes
CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};

// why this defining is necessary? I don't get its point but when I don't have it here the app crashes with this error { ERROR  TypeError: undefined is not a function (near '..._this.props.showActionSheetWithOptions...')}

// why all the elements in the render method in Chat.js should be inside an <ActioSheetProvider>? I added it when I was comparing my code with other students, because the + button didn't work before, after I added it it works. since it wasn't covered inside the task text, I need help to understand it.

CustomActions = connectActionSheet(CustomActions);