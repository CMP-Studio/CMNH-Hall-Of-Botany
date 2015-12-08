//
//  BeaconManager.swift
//  Hall_Of_Botany
//
//  Created by Ruben NIculcea on 12/2/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

import Foundation

@objc(BeaconManager)
class BeaconManager: NSObject, ESTBeaconManagerDelegate {
  
  // Swift doesn't have synthesize - just define the variable
  var bridge: RCTBridge!
  let eventName = "BeaconManagerBeaconPing"
  
  let beaconManager = ESTBeaconManager()
  var beaconRegion = CLBeaconRegion()
  
  var notificationText = String()
  
  override init() {
    super.init()
    
    beaconManager.delegate = self
    beaconManager.requestAlwaysAuthorization()
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
  
  func beaconManager(manager: AnyObject, didRangeBeacons beacons: [CLBeacon], inRegion region: CLBeaconRegion) {
    var eventBody = ["major" : "", "minor" : "", "proximity" : ""]
    
    if let nearestBeacon = beacons.first {
      var string = ""
      
      switch nearestBeacon.proximity {
      case CLProximity.Unknown :
        string = "UNKNOWN"
      case CLProximity.Immediate :
        string = "IMMEDIATE"
      case CLProximity.Near :
        string = "NEAR"
      case CLProximity.Far :
        string = "FAR"
      }
      
      eventBody = ["major" : String(nearestBeacon.major),
                   "minor" : String(nearestBeacon.minor),
                   "proximity" : string]
    }
    
    bridge.eventDispatcher.sendAppEventWithName(eventName, body: eventBody)
  }
  
  func beaconManager(manager: AnyObject, rangingBeaconsDidFailForRegion region: CLBeaconRegion?, withError error: NSError) {
    print("Error - BeaconManager - \(error.domain)")
  }
  
  func beaconManager(manager: AnyObject, didEnterRegion region: CLBeaconRegion) {
    let notification = UILocalNotification()
    
    notification.alertBody = notificationText
    UIApplication.sharedApplication().presentLocalNotificationNow(notification)
  }
  
}
