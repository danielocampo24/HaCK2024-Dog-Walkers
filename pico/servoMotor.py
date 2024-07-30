from machine import Pin, PWM
from time import sleep


# Sets the pin connection for each servo
servoPin = 28
secondPin = 27

# Servos are set to pulse with modulation (PWM)
servo = PWM(Pin(servoPin))
secondServo = PWM(Pin(secondPin))

# Frequency for each servo is set at 50 Hz
servo.freq(50)
secondServo.freq(50)

# Loop to control servos
while True:
    
    # Sets the angle for the first servo
    angle = 50
    writeVal = 6553/180*angle+1638
    servo.duty_u16(int(writeVal))
    
    # Sets the angle for the second servo
    angle = 90
    writeVal = 6553/180*angle+1638
    secondServo.duty_u16(int(writeVal))
    
    #Pause for .02 seconds before repeating loop
    sleep(.02)
