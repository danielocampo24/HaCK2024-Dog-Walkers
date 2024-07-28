from machine import Pin
import time #importing time for delay  


# Defining motor pins

#OUT1  and OUT2
In1=Pin(6,Pin.OUT) 
In2=Pin(7,Pin.OUT)  
EN_A=Pin(8,Pin.OUT)



#OUT3  and OUT4
In3=Pin(4,Pin.OUT)  
In4=Pin(3,Pin.OUT)  
EN_B=Pin(2,Pin.OUT)

EN_A.high()
EN_B.high()
# Forward
def move_forward():
    In1.high()
    In2.low()
    In3.high()
    In4.low()
    In5.high()
    In6.low()
    In7.high()
    In8.low()
    print("calling Forward")

    
# Backward
def move_backward():
    In1.low()
    In2.high()
    In3.low()
    In4.high()
    In5.low()
    In6.high()
    In7.low()
    In8.high()
    
#Turn Right
def turn_right():
    In1.low()
    In2.low()
    In3.low()
    In4.high()
    In5.low()
    In6.low()
    In7.low()
    In8.high()
    
#Turn Left
def turn_left():
    In1.low()
    In2.high()
    In3.low()
    In4.low()
    In5.low()
    In6.high()
    In7.low()
    In8.low()
   
#Stop
def stop():
    In1.low()
    In2.low()
    In3.low()
    In4.low()
    In5.low()
    In6.low()
    In7.low()
    In8.low()
    

In5=Pin(19,Pin.OUT) 
In6=Pin(18,Pin.OUT)  
EN_C=Pin(20,Pin.OUT)



#OUT3  and OUT4
In7=Pin(10,Pin.OUT)  
In8=Pin(11,Pin.OUT)  
EN_D=Pin(12,Pin.OUT)

EN_C.high()
EN_D.high()
# Forward
try:      
    while True:
        move_forward()
        print("Forward")
        time.sleep(2)
        stop()
        print("Stop")
        time.sleep(2)
        move_backward()
        print("Backward")   
        time.sleep(2)
        stop()
        print("Stop")
        time.sleep(2)
finally:
    stop()