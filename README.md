# BookApp

Mobile app for tracking reading.

This source code is available to everyone under the standard [MIT](https://github.com/MASSHUU12/bookapp/blob/master/LICENSE) license.

# Features include

- Searching for books
- Keeping track of the books you read and want to read
- Statistics about your reading

# Tech

- React Native
- SQLite
- openlibrary.org api

# Overview

<div>
  <img src="https://user-images.githubusercontent.com/61974579/200543559-91653298-3a85-4c53-abd3-ac232fea40b6.png" width="30%" style="margin: 0 1rem 0 0" />
  <img src="https://user-images.githubusercontent.com/61974579/200543629-926308f5-44e2-4ec2-a0c3-163122a683c3.png" width="30%" style="margin: 0 1rem 0 0" />
  <img src="https://user-images.githubusercontent.com/61974579/200543704-f62d95d2-8711-4878-b313-2570ca3e7259.png" width="30%" style="margin: 0 1rem 0 0" />
</div>

# Installation

## Running from source

### Prerequisites

- Node ^18.0.0
- NPM
- JDK 11
- Android Studio
- Mac (for iOS)

### Running application

When you run the project for the first time, use `npm i` or `npm install` to make NPM download all the necessary dependencies.

To start Metro run `npm start` inside project root folder.

Then run `npm run android` or `npm run ios`.

More information can be found [here](https://reactnative.dev/docs/environment-setup).

## Building

### Android

#### Building with Android Studio

`Build` -> `Generate Signed Bundle or APK`.

Select `APK`, and click `Next`.

This will walk you through a process of locating your keys to sign the APK or creating your keys if you don't have them already which is all very straightforward.

Select `release`, and `Next`.

#### Building with terminal

<!-- ```
keytool -genkey -v -keystore release.keystore -alias releaseKey -keyalg RSA -keysize 2048 -validity 10000
```

```
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

```
cd .\android\
.\gradlew assembleRelease
``` -->

# License

Licensed under the [MIT](https://github.com/MASSHUU12/bookapp/blob/master/LICENSE) license.
