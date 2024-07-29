import React from 'react';
import './ExperienceSection.css'; // Import custom styles
import first from './first_idea.png';
import second from './second_chass.png';
import third from './third_chass.png';
import arm from './arm.png';
import plan from './arm_plan.png';
import sketch from './sketch.png';
import error from './node_err.png';
import first_pic from './picture.jpeg';
import success from './Success.jpeg';
import retro from './retro.png';

const ExperienceSection = () => {
  return (
    <div className="experienceSection">
      <h1>Our Experience</h1>
      <p>
        During HAcK 2024, we ran into many roadblocks and had to undergo many iterations. However, we were still able to create
        a project in a short amount of time that we could be proud of and learned about the growth mindset we should have as engineers.
      </p>
      <h3>
        Benjamin Avalos, Daniel Ocampo, Matthew Nguyen, Miguel Coronado
      </h3>
      <h2>Initial plans & Iterations</h2>
      <h2>Chassis</h2>
      <div className="expContainer">
        <img src={first} className="expImages" alt="First Idea" />
        <div className="expText">
            <ul>
                <li>
                Upon first brainstorming, we first designed a rectangular box to encapsulate all of our hardware, 
                with cutouts for the ultrasonic sensor and temperature/humidity sensor. Upon talking to the Northrop engineers, we decided to incorporate flaps onto the side of the acrylic base. We also wanted to mount 
                the wheels/motors underneath those flaps for it to act like suspension.
                </li>
                <li>
                After realising that glue would not be the best option, we incorporated brackets for us to screw the walls to the base of the chassis,
                in addition to mounts for the ultrasonic sensor as it would not be feasible to directly attach to the wall of the chassis. 
                </li>
            </ul>
        </div>
        <img src = {second} className='expImages' alt = 'second idea'/>
      </div>
      <div className='expContainer'>
        <img src = {third} className='expImages'/>
        <div className='expText'>
            <ul>
                <li>
                    We decided to add a 'bridge' connecting the two side walls to hold another breadboard and allow for an easier
                    visual understanding of our circuitry
                </li>
                <li>
                We realized that due to 
                time constraints, we should drop an original idea we had of attaching a rotating camera on a stepper motor. Next, we began to start thinking of ideas to incoporate our arm onto the rover. 
                </li>
            </ul>
        </div>
        <img src = {arm} className='expImages'/>
      </div>
      <h2> The Arm </h2>
      <div className='expContainer'>
        <img src = {plan} className="expImages" />
        <div className='expText'>
            <ul>
                <li>
                    Our intial idea for the arm component was creating an arm with a hinge in the middle,
                    but we realized we only had two servos to implement.
                </li>
                <li>
                    Upon talking to a Northrop engineer, he said that our plan of having a claw always pointing down would be
                    good because the only motion of direction for the arm is on the y-axis. This would help us provide more accuracy
                    with our movements.
                </li>
                <li>
                    One idea the Northrop engineer suggested is implement a button that triggers the claw to close upon touching an object.
                    Had we been provided with more time, we would love to have implemented this idea, and our camera got rid of the need for this as well.
                </li>
            </ul>
        </div>

      </div>
      <div className='expContainer'>
            <img src = {sketch} className='expImages'/>
            <div className='expText'>
                <ul>
                    <li>
                    It took a while for us to figure out how to attach the arm and the claw to the servos. 
                   After asking the mentors, they said that the servos come with screws and we can sandwich the arm in there. 
                   Matthew took that idea and CAD’ed it, as well as a mount to hold the second servo.

                    </li>
                    <li>
                        We experienced failure in this aspect of the project. We were not able to implement functional servo motor
                        controls and design a functional grabbing system. In addition, the 3D Printer wasn't functioning correctly.
                    </li>
                </ul>
            </div>
        </div>
      <h2> </h2>
      <h2> Frontend to backend to pico connection </h2>
      <div className='expContainer'>
            <img src = {error} className='expImages'/>
            <div className='expText'>
                <ul>
                    <li>
                        On the first day of HAcK, half of our team was missing for almost the whole day due to orientation,
                        so we spent a long amount of time struggling to set up the node server. This set us 
                        behind schedule a bit so we spent a lot of time catching up.
                    </li>
                </ul>
            </div>
        
       </div>

        <h1> Successes </h1>
        <div className='expContainer'>
            {/* <img src = {first_pic} className='expImages'/>  */}
            <div className='expText'>
                <ul>
                    <li>
                        Something that played a key role in having us learn so much the past few days is when our team was first formed,
                        we were pretty quick in assigning roles to each member of the team and this helped a much smoother transition into HAcK.
                    </li>
                    <li>
                        A good strategy we used was to make sure that the components and wiring were functioning properly 
                        before assembling them onto the whole rover. Eventually being able to successfully connect the pico and
                        the website.
                    </li>
                </ul>
            </div>
            <img src = {first_pic} className='expImages'/>
        </div>
        <div className='expContainer'>
            <img src = {success} className='expImages' />
            <img src = {retro} className='expImages'/>

        </div>
    </div>
  );
};

export default ExperienceSection;
