import math
import asyncio
from bleak import BleakScanner
from datetime import datetime
from supabase import create_client
from dotenv import load_dotenv
import os
load_dotenv('.env.local')

# Configurable Parameters
MAX_DISTANCE = 5  # Maximum distance to consider devices (in meters)
SAME_DISTANCE_THRESHOLD = 0.2  # Threshold to consider devices in the same distance group
SCAN_INTERVAL = 2  # Time between scans in seconds
RSSI_AT_1M = -50  # Expected RSSI value at 1 meter
PATH_LOSS_EXPONENT = 2  # Path loss exponent 

# Supabase initialization
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_ANON_KEY"))

def insertCustomerRow(newCount):
    """
    Insert a new row into the customersRealTime table with the current people count.
    
    :param newCount: Number of estimated people
    """
    try:
        response = (supabase.table("customersRealTime")).insert({
            "restaurant": "RCH", 
            "count": newCount, 
        }).execute()
        print(f"Inserted count {newCount} into database")
    except Exception as e:
        print(f"Error updating database: {e}")

def calculate_distance(rssi, rssi_at_1m=RSSI_AT_1M, path_loss_exponent=PATH_LOSS_EXPONENT):
    """
    Estimate the distance from a Bluetooth device based on RSSI.
    
    :param rssi: The received signal strength in dBm.
    :param rssi_at_1m: The expected RSSI value at 1 meter.
    :param path_loss_exponent: The path loss exponent.
    :return: Estimated distance in meters.
    """
    try:
        # Calculate distance using the Log-Distance Path Loss Model
        distance = 10 ** ((rssi_at_1m - rssi) / (15 * path_loss_exponent))
        return distance
    except Exception as e:
        print(f"Error calculating distance: {e}")
        return None

def estimate_people(device_count):
    """
    Estimate number of people based on device count.
    
    :param device_count: Number of devices in a distance group
    :return: Estimated number of people
    """
    if device_count <= 4:
        return 1
    else:
        return 1 + (device_count // 4)

async def count_devices(max_distance=MAX_DISTANCE, same_distance_threshold=SAME_DISTANCE_THRESHOLD):
    """
    Count and filter detectable Bluetooth devices with same distance grouping.
    
    :param max_distance: Maximum distance to consider devices (in meters)
    :param same_distance_threshold: Threshold to consider devices in the same distance group
    """
    try:
        devices = await BleakScanner.discover(timeout=5.0)
        print(f"\n[{datetime.now().strftime('%H:%M:%S')}] Detected {len(devices)} Bluetooth devices in range")
        
        # Group devices by similar distances
        distance_groups = {}
        for device in devices:
            distance = calculate_distance(device.rssi)
            if distance and distance <= max_distance:
                # Find or create a distance group
                matched_group = False
                for group_key in distance_groups:
                    if abs(group_key - distance) <= same_distance_threshold:
                        distance_groups[group_key].append(device)
                        matched_group = True
                        break
                
                if not matched_group:
                    distance_groups[distance] = [device]
        
        # Calculate total estimated people
        total_estimated_people = 0
        print("\nDevice Distance Groups:")
        for distance, group_devices in distance_groups.items():
            people_estimate = estimate_people(len(group_devices))
            total_estimated_people += people_estimate
            
            print(f"Distance Group {distance:.2f}m:")
            print(f"  - {len(group_devices)} devices")
            print(f"  - Estimated {people_estimate} people")
            
            # Optional: print device details
            for device in group_devices:
                print(f"    * Device: {device.name or 'Unknown'}, Address: {device.address}, RSSI: {device.rssi} dBm")
        
        print(f"\nTotal estimated people: {total_estimated_people}")
        
        # Insert the count into the database
        insertCustomerRow(total_estimated_people)
        
        return total_estimated_people
    
    except Exception as e:
        print(f"Error: {e}")
        return 0

async def continuous_count():
    """Continuously count and filter devices."""
    try:
        while True:
            await count_devices()
            await asyncio.sleep(SCAN_INTERVAL)  # Wait between scans based on SCAN_INTERVAL
    except KeyboardInterrupt:
        print("\nStopped scanning")

if __name__ == "__main__":
    print("Starting Bluetooth people counter...")
    print("Press Ctrl+C to stop")
    asyncio.run(continuous_count())