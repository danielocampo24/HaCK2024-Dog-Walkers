from hcsr04 import HCSR04
from dht import DHT11
from machine import Pin
from time import sleep

# Sets the variable ultrasonic to be the ultrasonic sensor function defined in the hscro04 file
# Sets the variable tempHumidity to be the temperature and humidity sensor using the function dht imported from DHT11
ultrasonic = HCSR04(trigger_pin=15, echo_pin=16, echo_timeout_us=10000)
tempHumidity = DHT11(Pin(17, Pin.IN, Pin.PULL_UP))

# Function used to get and return the distance read by the ultrasonic sensor
def getDistance():

    distance = ultrasonic.distance_cm()
    print(distance)
    return distance

# Function used to get and return the humidity and temperature from the temperature/humidity sensor
def getTemperatureAndHumidity():
    
    # Sensor measures the temperature and humidity
    tempHumidity.measure()
    
    # Temperature and humidity stored and returned as seperate variables
    temperature = tempHumidity.temperature()
    print("Temperature in C: ", temperature)
    humid = tempHumidity.humidity()
    print("Humidity: ", humid)
    return temperature, humid
    

#