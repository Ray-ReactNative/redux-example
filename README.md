This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### About Redux 

** Redux **

- Action Creator：當某個事件發生時，會建立一個 JS 物件，該物件即為 action。
- Action：一個物件，裡面有 type 和 payload 屬性，一定要有 type 屬性，payload 則非必要，分別描述了行為的類型和要傳遞的 state。
- Dispatch **:** 將 action 傳遞到 reducer 函式。
- Store：負責所有數據的儲存，每個專案只會有一個Stroe
- Reducer：處理邏輯，接收先前的 state 和一個 action，並根據傳入的 action 的 type 去將 state 值做改變，最後回傳的是一個經過計算後新的 state 物件。在一個專案中可以有多個 reducer，每一個都管理它所擁有的全域 state 一部分。

**Redux三大原則**

- Store是唯一的：整個專案只會有一個
- Store是唯讀的：唯一改state的方法就是觸發action
- Reducer必須是pure function，對應得到的actions，回傳不可變的新state 。
