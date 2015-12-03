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
  
  var uuid = String()
  var beaconRegionID = String()
  let beaconManager = ESTBeaconManager()
  var beaconRegion = CLBeaconRegion()
  
  override init() {
    super.init()
    
    beaconManager.delegate = self
    beaconManager.requestAlwaysAuthorization()
  }
  
  @objc func startTracking(uuid: String, identifier: String) -> Bool {
    self.uuid = uuid
    
    if let nsuuid = NSUUID(UUIDString: self.uuid) {
      beaconRegionID = identifier
      beaconRegion = CLBeaconRegion(proximityUUID: nsuuid, identifier: beaconRegionID)
      beaconManager.startRangingBeaconsInRegion(beaconRegion)
      return true
    }
    
    print("Error - BeaconManager - uuidString is incorrect")
    return false
  }
  
  @objc func getProximityUUID() -> String {
    return uuid
  }
  
  @objc func getBeaconRegionID() -> String {
    return beaconRegionID
  }
  
  @objc func stopTracking() -> Void {
    beaconManager.stopRangingBeaconsInRegion(self.beaconRegion)
  }
  
  func beaconManager(manager: AnyObject, didRangeBeacons beacons: [CLBeacon], inRegion region: CLBeaconRegion) {
    
    var eventBody = ["major" : "", "minor" : "", "proximity" : ""]
    
    if let nearestBeacon = beacons.first {
      if nearestBeacon.major == 41892 && nearestBeacon.minor == 30560 {
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
    }
    
    bridge.eventDispatcher.sendAppEventWithName(eventName, body: eventBody)
  }
  
  func beaconManager(manager: AnyObject, rangingBeaconsDidFailForRegion region: CLBeaconRegion?, withError error: NSError) {
    print("Error - BeaconManager - \(error)")
  }
  
}
