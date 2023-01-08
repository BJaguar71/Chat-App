## Chat APP:iphone:
This is a Real-Time mobile app build with React Native, Expo as well as the Google Firestore Database. The users will be able to choose a color for the chat screen background and also a name to start chatting that will be shown at the top of the chat screen.
The chats will be saved both in Google Firestore databse as well as 

## Key Features

- **Start screen**: where the users can write their name and choose a background color for the chat screen.
- **redirecting through screens**: the users will be able to chat screen from the start screen and opposit. 
- **Chat screen**: where the user can chat. at the top of the screen (title) users will see the name that they've written in the input inside the Start screen. 
- **Real-Time storage**: The app uses Google Firestore as its database and data will be stored in real-time. 
- **Client-Side Storage**: Data will be saved into the user's device storage as well, therefor all datas can be accessed offline by the user. 
- **Authentication**: The app The app provide an Anonymously sign-in (one of the authentocation methods of firabase) as its user authentication.
- **Communication Features**: The app has these options as its communication features:
    - Pick a photo from the camera roll and send it
    - Taking photo with the camera and send it
    - Share the geolocation
- **User's Permission**: In odrder to could use the communication features user's permission is mandatory. 
 

## Technical Dependencies
- JavaScript 

- React Native
    - React dom
    - Gifted Chat
    - Maps
    - Navigation
    - AsyncStorage
    - NetInfo

- Expo 
    - Permission
    - Image picker
    - Camera
    - Action Sheet
    - Location
    - Media Library

- Google Firestore database
    - *[stting up the database](https://firebase.google.com/docs/web/setup)*

*To install dependencies*:
    
    `npm install`


## Setting up development environment:

**Physical Device**
1. Clone the repository from [here](https://github.com/BJaguar71/Chat-App)
2. Installing Expo CLI: run `npm install -g expo-cli`
3. Create an Expo account [here](https://expo.dev/) and login at the terminal with `expo login`
4. Install [Expo Go](https://expo.dev/client) from your mobile's PlayStore
5. Start the project with `npx expo start`
6. In case of problem while conneting to your project on Expo Go, run `npx expo start --tunnel`

**Android Emulator**
- For Windows and Linux: Install [Android Studio](https://developer.android.com/studio).
- For more information how to set up an emulator, look [here](https://docs.expo.dev/workflow/android-studio-emulator/?redirected)
- For Mac: Install [XCode](https://developer.apple.com/xcode/)

## Screen Captures ##

![This is a screenshot of the Start screen](/assets/start.jpg)

![This is screenshot of the Chat screen](/assets/chat.jpg)

![This is a screenshot of the communication features inside the custom action sheet](/assets/features.jpg)
