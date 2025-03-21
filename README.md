# Check out how we started [Devpost](https://devpost.com/software/flockfindr) 🪿🪿🪿 !

We use the bleakscanner library to measure the Received Signal Strength of your bluetooth device (RSSI), then we use a logarithmic path loss model to relate the RSSI to your distance from our device running the code. 

**<u>How do we account for people with more than one device?</u>**  
We group devices by distance, so if you are carrying your phone, laptop, earbuds, etc. these will all be in the same distance group.  

**<u>What if I don't want you to detect my device?</u>**  
Turn off your bluetooth :)  

**<u>Why do this?</u>**  
We didn't want to wait in line for coffee and didn't want to use cameras because of people's privacy, so we did the next best thing.
