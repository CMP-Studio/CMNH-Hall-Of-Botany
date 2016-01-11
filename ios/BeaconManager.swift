//
//  BeaconManager.swift
//  Hall of Botany
//
//  Created by Ruben Niculcea on 12/2/15.
//  Copyright © 2015 Carnegie Museums of Pittsburgh. All rights reserved.
//

import Foundation

@objc(BeaconManager)
class BeaconManager: NSObject, CBPeripheralManagerDelegate, ESTBeaconManagerDelegate {
  
  var bridge: RCTBridge!
  let eventName = "BeaconManagerBeaconPing"
  
  let beaconManager = ESTBeaconManager()
  var beaconRegion = CLBeaconRegion()
  var hasAlwaysAuthorization = false;
  
  var bluetoothPeripheralManager: CBPeripheralManager?
  var bluetoothActive = false;
  
  var notificationText = String()
  
  override init() {
    super.init()
    
    let options = [CBCentralManagerOptionShowPowerAlertKey:0] // Don't show bluetooth popover
    bluetoothPeripheralManager = CBPeripheralManager(delegate: self, queue: nil, options: options)
    
    beaconManager.delegate = self
    beaconManager.requestAlwaysAuthorization()
    hasAlwaysAuthorization = beaconManager.isAuthorizedForMonitoring()
  }
  
  @objc func startTracking(uuid: String, identifier: String, notificationText: String) {
    if let nsuuid = NSUUID(UUIDString: uuid) {
      beaconRegion = CLBeaconRegion(proximityUUID: nsuuid, identifier: identifier)
      
      //Ranging Beacons
      beaconManager.startRangingBeaconsInRegion(beaconRegion)
      
      //Monitoring Regions
      self.notificationText = notificationText
      beaconManager.startMonitoringForRegion(beaconRegion)
      UIApplication.sharedApplication().registerUserNotificationSettings(UIUserNotificationSettings(forTypes: .Alert, categories: nil))
    } else {
      print("Error - BeaconManager - uuidString is incorrect")
    }
  }
  
  @objc func stopTracking() {
    beaconManager.stopRangingBeaconsInRegion(self.beaconRegion)
  }
  
  // MARK: - ESTBeaconManagerDelegate functions
  
  func beaconManager(manager: AnyObject, didRangeBeacons beacons: [CLBeacon], inRegion region: CLBeaconRegion) {
    var eventBody = ["major" : "", "minor" : "", "proximity": "UNKNOWN"]
    
    if let nearestBeacon = beacons.first {
      var proximity = "UNKNOWN"
      
      switch nearestBeacon.proximity {
      case .Immediate, .Near:
        proximity = "NEAR"
        
      case .Far:
        proximity = "FAR"
        
      case .Unknown:
        proximity = "UNKNOWN"
        
      }
      
      eventBody = ["major": String(nearestBeacon.major),
                   "minor": String(nearestBeacon.minor),
                   "proximity": proximity]
    }
    
    bridge.eventDispatcher.sendAppEventWithName(eventName, body: eventBody)
  }
  
  func beaconManager(manager: AnyObject, didEnterRegion region: CLBeaconRegion) {
    let notification = UILocalNotification()
    
    notification.alertBody = notificationText
    
    UIApplication.sharedApplication().presentLocalNotificationNow(notification)
  }
  
  func beaconManager(manager: AnyObject, rangingBeaconsDidFailForRegion region: CLBeaconRegion?, withError error: NSError) {
    print("Error - BeaconManager - \(error.localizedDescription)")
  }
  
  func beaconManager(manager: AnyObject, didChangeAuthorizationStatus status: CLAuthorizationStatus) {
    hasAlwaysAuthorization = beaconManager.isAuthorizedForMonitoring()
  }
  
  // MARK: - CBPeripheralManagerDelegate functions
  
  func peripheralManagerDidUpdateState(peripheral: CBPeripheralManager) {
    if peripheral.state == CBPeripheralManagerState.PoweredOn {
      bluetoothActive = true
    } else if peripheral.state == CBPeripheralManagerState.PoweredOff {
      bluetoothActive = false
    } else if peripheral.state == CBPeripheralManagerState.Unsupported {
      // This is never hit as every modern iOS device has bluetooth
      // Expect the simulator...
    } else if peripheral.state == CBPeripheralManagerState.Unauthorized {
      // This is never hit as we only use bluetooth for location
    }
  }
  
}
