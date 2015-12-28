//
//  AudioManagerBridge.m
//  Hall of Botany
//
//  Created by Ruben Niculcea on 12/3/15.
//  Copyright © 2015 Carnegie Museums of Pittsburgh. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(AudioManager, NSObject)

RCT_EXTERN_METHOD(loadAudio:(NSString *)audio audioLoadedCallback:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(adjustVolume:(double)volume);

RCT_EXTERN_METHOD(playAudio:(double)volume);
RCT_EXTERN_METHOD(pauseAudio);
RCT_EXTERN_METHOD(stopAudio);
RCT_EXTERN_METHOD(togglePlayAudio);

RCT_EXTERN_METHOD(muteAudio);
RCT_EXTERN_METHOD(unmuteAudio);
RCT_EXTERN_METHOD(toggleMuteAudio);

RCT_EXTERN_METHOD(prepareForBackgroundAudio);

@end
