import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import './App.css';
import logo from './logo.png';
import up from './up.png'
import down from './down.png';
import left from './left.png';
import right from './right.png';
import ExperienceSection from "./ExperienceSection";
import BasicNavbar from "./BasicNavbar";


const socket = io('http://localhost:8000');

const arrowImages = { 
  up: up,
  down: down,
  left: left,
  right: right,
};

function App() {
  const [temp, setTemp] = useState('75');
  const [ultrasonic, setUltrasonic] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [movement, setMovement] = useState("Idle");
  const [showDegreeInput, setShowDegreeInput] = useState(false);
  const [degree, setDegree] = useState("");
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [currentArrow, setCurrentArrow] = useState(null);

  useEffect(() => {

    // Listen for temperature updates
    socket.on('temp', (data) => {
      setTemp(data);
    });

    // Listen for ultrasonic updates
    socket.on('ultrasonic', (data) => {
      setUltrasonic(data);
    });

    socket.on('humidity', (data) => {
      setHumidity(data);
    });

    return () => {
      socket.off('temp');
      socket.off('ultrasonic');
      socket.off('humidity')
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {

      //if isKeyDown returns true, means key is still being held from its initial press - we do not need to continue
      if (isKeyDown) return; 
      setIsKeyDown(true);

      let newMovement = "";
      let message = "";

      if (event.key === 'w' || event.key === 'W') {
        newMovement = "Forward";
        message = "forward";
        setCurrentArrow(arrowImages.up);

      } else if (event.key === 'a' || event.key === 'A') {
        newMovement = "Left";
        message = "left";
        setCurrentArrow(arrowImages.left);

      } else if (event.key === 's' || event.key === 'S') {
        newMovement = "Reverse";
        message = "reverse";
        setCurrentArrow(arrowImages.down)
      } else if (event.key === 'd' || event.key === 'D') {
        newMovement = "Right";
        message = "right";
        setCurrentArrow(arrowImages.right)
      }

      setMovement(newMovement);
      socket.emit('direction', message);
    };

    const handleKeyUp = () => {
      //when key is lifted up, isKeyDown boolean returns to false
      setIsKeyDown(false); 
      setMovement("Idle");
      socket.emit('direction', 'idle');
      setCurrentArrow(null)
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isKeyDown]);


  const handleGrab = () => {
    socket.emit('send-grab', 'grab');
  };

  const handleMoveArm = () => {
    setShowDegreeInput(true);
  };

  const handleDegreeChange = (e) => {
    setDegree(e.target.value);
  };

  const submitDegree = () => {
    if (degree) {
      console.log(`Submitting degree: ${degree}`); // Debugging line
      socket.emit('send-arm-degree', degree); // Emit the degree angle to the server
      setShowDegreeInput(false);
      setDegree(""); // Clear the input field
    }
  };

  return (
    
    <div className="App">
      {/* <BasicNavbar /> */}
      <img src={logo} alt="Logo" className="logo" />
      <p>The Dogwalkers Rover Mission</p>
      <h1 className="temp">Live Camera Feed</h1>
      
      <div className="main-content">
        <div className="infoBox">
          <p className="movementText">Currently moving: {movement}</p>
          <p>Humidity: {humidity}%</p>
          <p>Temperature: {temp}&deg;C</p>
          <p> Distance to rear object: cm</p>
          <p> Distance to front object: cm</p>
          
        </div>
        <iframe src="http://192.168.50.193/" height="600" width="600" className="feed"/>

        
      </div>
      <div className="button-group">
        <button>WASD to move</button>
        <button onClick={handleGrab}>Grab</button>
        <button>Raise Arm</button>
        <button onClick={handleMoveArm}>Move Arm</button>
      </div>
      <div className="arrowImage">
          {currentArrow && <img src={currentArrow} alt="Movement direction" />}
      </div>
      {showDegreeInput && (
        <div className="degreeInputBox">
          <p>Enter degrees to move the arm:</p>
          <input
            type="number"
            value={degree}
            onChange={handleDegreeChange}
            placeholder="Degrees"
          />
          <button onClick={submitDegree}>Submit</button>
        </div>
      )}
            <ExperienceSection/>

    </div>
  );
}

export default App;
