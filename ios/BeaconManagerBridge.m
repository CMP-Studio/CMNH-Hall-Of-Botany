//
//  BeaconManagerBridge.m
//  Hall_Of_Botany
//
//  Created by Ruben NIculcea on 12/2/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(BeaconManager, NSObject)

RCT_EXTERN_METHOD(startTracking:(NSString *)uuidString identifier:(NSString *)identifier)
RCT_EXTERN_METHOD(stopTracking)

RCT_EXTERN_METHOD((NSString *) getProximityUUID)
RCT_EXTERN_METHOD((NSString *) getBeaconRegionID)

@end
