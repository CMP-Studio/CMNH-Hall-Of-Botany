//
//  AudioManagerBridge.m
//  Hall_Of_Botany
//
//  Created by Ruben NIculcea on 12/3/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(AudioManager, NSObject)

RCT_EXTERN_METHOD(loadAudio:(NSString *)audio)
RCT_EXTERN_METHOD(adjustVolume:(double)volume)
RCT_EXTERN_METHOD(pauseAudio)
RCT_EXTERN_METHOD(stopAudio)

RCT_EXTERN_METHOD(prepareForBackgroundAudio)

@end
