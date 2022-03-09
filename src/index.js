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

const store = createDocStore(
  {
    leftPadPos: { topPos: startPos },
    rightPadPos: { topPos: startPos },
    ballPos: {
      topPos: 50,
      leftPos: 50,
    },
    direction: {
      y: Math.random() < 0.5,
      x: Math.random() < 0.5,
    },
    playingIsActive: false,
  },
  [remote.createInitializer()]
);

//enable remote plugin
store.dispatch(remote.enableRemote("/leftPadPos"));
store.dispatch(remote.enableRemote("/rightPadPos"));
store.dispatch(remote.enableRemote("/ballPos"));
store.dispatch(remote.enableRemote("/direction"));
store.dispatch(remote.enableRemote("/playingIsActive"));

//setting up socket connection with the server
let socket = io.connect("http://localhost:8000");

// send request to server to get patches every time when page reloads
socket.emit("fetchDoc", "/leftPadPos");
socket.emit("fetchDoc", "/rightPadPos");
socket.emit("fetchDoc", "/ballPos");
socket.emit("fetchDoc", "/direction");
socket.emit("fetchDoc", "/playingIsActive");

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

//get patches from server and dispatch
socket.on("change", (path, patch) => {
  // console.log(patch, "patch");
  store.dispatch(remote.applyRemote(path.replace("/leftPadPos", ""), patch));
});

socket.on("change", (path, patch) => {
  // console.log(patch, "patch");
  store.dispatch(remote.applyRemote(path.replace("/rightPadPos", ""), patch));
});

socket.on("change", (path, patch) => {
  // console.log(patch, "patch");
  store.dispatch(remote.applyRemote(path.replace("/ballPos", ""), patch));
});

socket.on("change", (path, patch) => {
  // console.log(patch, "patch");
  store.dispatch(remote.applyRemote(path.replace("/direction", ""), patch));
});

socket.on("change", (path, patch) => {
  // console.log(patch, "patch");
  store.dispatch(remote.applyRemote(path.replace("/playingIsActive", ""), patch));
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
