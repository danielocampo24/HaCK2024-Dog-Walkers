from connections import connect_mqtt, connect_internet
from time import sleep
from movement import move_forward, move_backward, turn_left, turn_right, stop
from sensors import getDistance , getTemperatureAndHumidity
from constants import ssid, password, mqtt_server, mqtt_user, mqtt_pass

# Call back function to handle incoming messages from mqtt broker
def cb(topic, msg):

    # If the pico recieves a message with the topic "direction" from the mqtt broker we run through this if statement
    if topic == b"direction":
        
        # This nested if/elif/else statements differentiate between whether the broker is telling us to go
        # straight, go forward, and so on. Depending on what message is recieved, the code will execute
        # a different function imported from the file movement.py

        if msg == b"forward":
            move_forward()
            
        elif msg == b"right":
            turn_right()            
            
        elif msg == b"left":
            turn_left()
            
        elif msg == b"reverse":
            move_backward()
                    
        else:
            stop()
            
# main function for the code used by the pico to recieve and transmit da†a
def main():
    
    try:
        
        # This section of code uses data obtained from file constants.py to connect to the internet and
        # to the mqtt broker
        connect_internet(ssid, password)
        client = connect_mqtt(mqtt_server, mqtt_user, mqtt_pass)
        
        # Call back function is set to cb. Client.subscribe is used recieve information from
        # the mqtt broker. This information contains a topic and a message. Topics subscribed to are direction, and claw. 
        client.set_callback(cb)
        client.subscribe("direction")
        client.subscribe("claw")
        
        # While the code is running, the code inside of this block execute
        while True:
            
            # Code for pico to recieve the distance, temperature, and humidity from the sensors.
            # This information is then published and recieved by the mqtt broker.
            x = getDistance()
            temperature, hum = getTemperatureAndHumidity() 
            client.publish(b"ultrasonic", str(x).encode('utf-8'))
            client.publish(b"temp", str(temperature))               
            client.publish(b"humidity", str(hum))
            
            # Checks the mqtt server for data with the topics subscribed to earlier
            client.check_msg()
            
            # This cycle is repeated every 3 seconds to reduce load to the server.
            sleep(3)
        
# Interrupts run if a keyboard action is done while executing
    except KeyboardInterrupt:
        print('keyboard interrupt')
        
        
# Runs the main function when executed
if __name__ == "__main__":
    main()
