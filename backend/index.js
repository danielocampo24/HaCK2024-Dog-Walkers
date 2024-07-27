require('dotenv').config();
const fs = require('fs');
const cors = require("cors");
const express = require("express");
const http = require('http');
const MQTT = require('mqtt');
const APP = express();
const server = http.createServer(APP);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const CLIENTID = "frontend";

const client = MQTT.connect(process.env.CONNECT_URL, {
  clientId: CLIENTID,
  clean: true,
  connectTimeout: 3000,
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
  reconnectPeriod: 10000,
  debug: true,
  rejectUnauthorized: false // Add this line for testing, should be removed in production
});

// Used for debugging 

client.on("error", function (error) {
  console.error("Connection error: ", error);
});

client.on("close", function () {
  console.log("Connection closed");
});

client.on("offline", function () {
  console.log("Client went offline");
});

client.on("reconnect", function () {
  console.log("Attempting to reconnect...");
});

// MQTT Connection

client.on('connect', async () => {
  console.log("Connected");

  client.subscribe("ultrasonic", (err) => {
    if (err) {
      console.error("Subscription error for 'ultrasonic': ", err);
    } else {
      console.log("Subscribed to 'ultrasonic'");
    }
  });

  client.subscribe("temp", (err) => {
    if (err) {
      console.error("Subscription error for 'temp': ", err);
    } else {
      console.log("Subscribed to 'temp'");
    }
  });

  client.subscribe("humidity", (err) => {
    if (err) {
      console.error("Subscription error for 'humidity': ", err);
    } else {
      console.log("Subscribed to 'humidity'");
    }
  });

  client.subscribe('direction', (err) => {
    if (err) {
      console.error("Subscription error for 'direction': ", err);
    } else {
      console.log("Subscribed to 'direction'");
    }
  });

  // Subscribe to the "grab" topic
  client.subscribe('grab', (err) => {
    if (err) {
      console.error("Subscription error for 'grab': ", err);
    } else {
      console.log("Subscribed to 'grab'");
    }
  });
});

const corsOptions = {
  origin: '*'
};

APP.use(cors(corsOptions));
APP.use(express.json());

// Readings from sensors 
let latestTemp = null;
let latestUltrasonic = null;
let latestHumidity = null;

io.on("connection", (socket) => {
  console.log("Frontend connected to socket");

  // Send the latest sensor data to the newly connected client
  if (latestTemp) {
    socket.emit('temp', latestTemp);
  }
  if (latestUltrasonic) socket.emit('ultrasonic', latestUltrasonic);

  // Listen for direction messages from the frontend
  socket.on('send-direction', (message) => {
    console.log('Received direction message from frontend:', message);
    client.publish("direction", message);
  });

  // Listen for grab messages from the frontend
  socket.on('send-grab', (message) => {
    console.log('Received grab message from frontend:', message);
    client.publish("grab", message);
  });

  socket.on("disconnect", () => {
    console.log("Frontend disconnected from socket");
  });

});

setInterval(() => {
  io.emit('temp', latestTemp);
  io.emit('ultrasonic', latestUltrasonic);
  io.emit('humidity', latestHumidity);
}, 1000);

server.listen(8000, () => {
  console.log('Server is running on port 8000');
});

client.on('message', (TOPIC, payload) => {
  const message = payload.toString();
  console.log("Received from broker:", TOPIC, message);
  
  if (TOPIC === 'temp') {
    latestTemp = message;
  } else if (TOPIC === 'ultrasonic') {
    latestUltrasonic = message;
  } else if (TOPIC === 'humidity') {
    latestHumidity = message;
  } else if (TOPIC === 'direction') {
    if (message === 'forward') {
      console.log("Moving forward");
    } else if (message === 'backward') {
      console.log("Moving backward");
    } else if (message === 'left') {
      console.log("Turning left");
    } else if (message === 'right') {
      console.log("Turning right");
    } else if (message === 'idle') {
      console.log("Idle");
    }
  } else if (TOPIC === 'grab') {
    console.log("Grabbing");
  }
});
