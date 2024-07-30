from machine import Pin
import time #importing time for delay  


# Connection for front left wheel 
In1=Pin(6,Pin.OUT) 
In2=Pin(7,Pin.OUT)  
EN_A=Pin(8,Pin.OUT)

# Connection for front right wheel
In3=Pin(4,Pin.OUT)  
In4=Pin(3,Pin.OUT)  
EN_B=Pin(2,Pin.OUT)

# Connection for back left wheel
In5=Pin(19,Pin.OUT) 
In6=Pin(18,Pin.OUT)  
EN_C=Pin(20,Pin.OUT)
EN_C.high()

# Connection for back right wheel
In7=Pin(10,Pin.OUT)  
In8=Pin(11,Pin.OUT)  
EN_D=Pin(12,Pin.OUT)
EN_D.high()


# Code for rover to drive forward
def move_forward():
    
    # Front left wheel move forward
    In1.high()
    In2.low()
    
    # Front right wheel move forward
    In3.high()
    In4.low()
    
    # Back left wheel move forward
    In5.high()
    In6.low()
    
    # Back right wheel move forward
    In7.high()
    In8.low()
    
    

    
# Code for rover to drive backwards. Similar to code to drive forward but inputs reversed 
def move_backward():
    
    # Front left wheel move backwards
    In1.low()
    In2.high()
    
    # Front right wheel move backwards
    In3.low()
    In4.high()
    
    # Back left wheel move backwards
    In5.low()
    In6.high()
    
    # Back right wheel move backwards
    In7.low()
    In8.high()
    
# Code for rover to turn right
def turn_right():
    
    # Front left wheel stop
    In1.low()
    In2.low()
    
    # Front right wheel move backwards
    In3.low()
    In4.high()
    
    # Back left wheel stop 
    In5.low()
    In6.low()
    
    # Back right wheel move backwards
    In7.low()
    In8.high()
    
# Code for rover to turn left
def turn_left():
    
    # Front left wheel move backwards
    In1.low()
    In2.high()
    
    # Front right wheel stop
    In3.low()
    In4.low()
    
    # Back left wheel move backwards
    In5.low()
    In6.high()
    
    # Back right wheel stop
    In7.low()
    In8.low()
   
# Code for rover to stop
def stop():
    
    # Front left wheel stop 
    In1.value(0)
    In2.value(0)
    
    # Front right wheel stop
    In3.value(0)
    In4.value(0)
    
    # Back left wheel stop
    In5.value(0)
    In6.value(0)
    
    # Back right wheel stop
    In7.value(0)
    In8.value(0)

    

