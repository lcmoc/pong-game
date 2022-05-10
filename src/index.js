import "./index.css";

import * as remote from "@syncstate/remote-client";

import App from "./App.js";
import { Provider } from "@syncstate/react";
import React from "react";
import ReactDOM from "react-dom";
import { createDocStore } from "@syncstate/core";
import io from "socket.io-client";
import reportWebVitals from "./reportWebVitals";

const startPos = 50;
const randomStartDirection = () =>  Math.random() < 0.5;

//setting up socket connection with the server

const store = createDocStore(
  {
    activeUser: 0,
    leftPadPos: { topPos: startPos },
    rightPadPos: { topPos: startPos },
    ballPos: {
      topPos: 50,
      leftPos: 50,
    },
    direction: {
      y: randomStartDirection(),
      x: randomStartDirection(),
    },
    playingIsActive: false,
    newGame: false,
  },
  [remote.createInitializer()]
);

const [doc, setDoc] = store.useDoc();

const socket = io.connect("http://localhost:8000");

//enable remote plugin
store.dispatch(
  remote.enableRemote([
    "/leftPadPos",
    "/rightPadPos",
    "/ballPos",
    "/direction",
    "/playingIsActive",
    "/newGame",
    "/activeUser",
  ])
);

// send request to server to get patches every time when page reloads
socket.emit("fetchDoc", "/leftPadPos");
socket.emit("fetchDoc", "/rightPadPos");
socket.emit("fetchDoc", "/ballPos");
socket.emit("fetchDoc", "/direction");
socket.emit("fetchDoc", "/playingIsActive");
socket.emit("fetchDoc", "/newGame");

//observe the changes in store state
store.observe(
  "doc",
  "/leftPadPos",
  (leftPadPos, change) => {
    if (!change.origin) {
      //send json patch to the server
      socket.emit("change", "/leftPadPos", change);
    }
  },
  Infinity
);

store.observe(
  "doc",
  "/rightPadPos",
  (rightPadPos, change) => {
    if (!change.origin) {
      //send json patch to the server
      socket.emit("change", "/rightPadPos", change);
    }
  },
  Infinity
);

store.observe(
  "doc",
  "/ballPos",
  (ballPos, change) => {
    if (!change.origin) {
      //send json patch to the server
      socket.emit("change", "/ballPos", change);
    }
  },
  Infinity
);

store.observe(
  "doc",
  "/direction",
  (leftPadPos, change) => {
    if (!change.origin) {
      //send json patch to the server
      socket.emit("change", "/direction", change);
    }
  },
  Infinity
);

store.observe(
  "doc",
  "/playingIsActive",
  (playingIsActive, change) => {
    if (!change.origin) {
      //send json patch to the server
      socket.emit("change", "/playingIsActive", change);
    }
  },
  Infinity
);

store.observe(
  "doc",
  "/newGame",
  (newGame, change) => {
    if (!change.origin) {
      //send json patch to the server
      socket.emit("change", "/newGame", change);
    }
  },
  Infinity
);

//get patches from server and dispatch

socket.on("change", (path, patch) => {
  store.dispatch(remote.applyRemote(path.replace(path, ""), patch));
});

// gets emitted data (active user count) from server and adds it into the activeUser syncstate
socket.on('counter', function (serverData) {
  setDoc((doc) => doc.activeUser = serverData.activeUserCount);
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
