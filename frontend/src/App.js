import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import './App.css';
import logo from './logo.png';

const socket = io('http://localhost:8000');

function App() {
  const [temp, setTemp] = useState(null);
  const [ultrasonic, setUltrasonic] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [movement, setMovement] = useState("Idle");

  useEffect(() => {
    socket.on('temp', setTemp);
    socket.on('ultrasonic', setUltrasonic);
    socket.on('humidity', setHumidity);

    return () => {
      socket.off('temp', setTemp);
      socket.off('ultrasonic', setUltrasonic);
      socket.off('humidity', setHumidity);
    };
  }, []);

  useEffect(() => {
    let movementTimeout;

    const handleKeyDown = (event) => {
      let newMovement = "";
      let message = "";

      if (event.key === 'w' || event.key === 'W') {
        newMovement = "Forward";
        message = "forward";
      } else if (event.key === 'a' || event.key === 'A') {
        newMovement = "Left";
        message = "left";
      } else if (event.key === 's' || event.key === 'S') {
        newMovement = "Backward";
        message = "backward";
      } else if (event.key === 'd' || event.key === 'D') {
        newMovement = "Right";
        message = "right";
      } else {
        newMovement = "Idle";
      }

      setMovement(newMovement);
      if (message) {
        socket.emit('send-direction', message);
      }

      clearTimeout(movementTimeout);
      movementTimeout = setTimeout(() => {
        setMovement("Idle");
        socket.emit('send-direction', 'idle');
      }, 1000);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(movementTimeout);
    };
  }, []);

  // Function to handle grab action
  const handleGrab = () => {
    socket.emit('send-grab', 'grab');
  };

  return (
    <div className="App">
      <img src={logo} alt="Logo" className="logo" />
      <p>The Dogwalkers</p>
      <button> <p> WASD to control </p></button>
      <button onClick={handleGrab}> <p> Grab </p> </button>
      <button> <p> Raise Arm</p></button>
      {/* <button> <p> Switch POV </p></button> */}
      <h1 className="temp"> Live Camera Feed </h1>
      <iframe src = "http://192.168.50.193/" />
      <div className="infoBox">
        <p className="movementText"> Currently moving: {movement}</p>
        <p> Humidity: {humidity}%</p>
        <p> Temperature: {temp}&deg;C</p>
      </div>
    </div>
  );
}

export default App;