//
//  AudioManager.swift
//  Hall_Of_Botany
//
//  Created by Ruben NIculcea on 12/3/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

import Foundation
import AVFoundation

@objc(AudioManager)
class AudioManager: NSObject {
  
  // The higher the number - the higher the quality of fade
  // and it will consume more CPU.
  var volumeAlterationsPerSecond = 30.0
  
  var audioSrc = ""
  var player = AVAudioPlayer()
  var timer:NSTimer?
  var finished = true

  override init() {
    super.init()
  }
  
  @objc func loadAudio(audio: String) {
    if audio == "" || audio == audioSrc {
      return
    }
    
    let soundURL = CFBundleCopyResourceURL(CFBundleGetMainBundle(), audio, nil, nil)
    
    do {
      if audioSrc != "" {
        stopAudio()
      }
      
      player = try AVAudioPlayer(contentsOfURL: soundURL)
      self.audioSrc = audio
      player.numberOfLoops = -1
      player.play()
      player.volume = 0.0
    } catch let error as NSError {
      print("Error - AudioManager - \(error.domain)")
    }
  }
  
  @objc func adjustVolume(volume: Double) {
    if audioSrc != "" {
      if finished && (volume != Double(player.volume)) {
        finished = false
        fadetoVolume(volume) {
          self.finished = true
        }
      }
    }
  }
  
  @objc func stopAudio() {
    if audioSrc != "" {
      player.stop()
      audioSrc = ""
    }
  }
  
  private func fadetoVolume(toVolume: Double,
    duration: Double = 2.0,
    velocity: Double = 2.0,
    onFinished: (()->())? = nil) {
      
      var currentStep = 0.0;
      let totalSteps = duration * volumeAlterationsPerSecond
      let fromVolume = Double(player.volume)
      
      // React Native Modules do not run on the main thread
      // and NSTimer needs to be ran on the main thread to work.
      dispatch_async(dispatch_get_main_queue()) {
        self.timer = NSTimer.every(1 / self.volumeAlterationsPerSecond) {
          var volumeMultiplier, newVolume, progress: Double
          
          if currentStep > totalSteps {
            self.player.volume = Float(toVolume)
            self.timer!.invalidate()
            self.timer = nil
            onFinished?()
          }
          
          progress = currentStep / totalSteps
          
          if fromVolume < toVolume {
            volumeMultiplier = self.fadeInVolumeMultiplier(progress, velocity: velocity)
            newVolume = fromVolume + (toVolume - fromVolume) * volumeMultiplier
            
          } else {
            volumeMultiplier = self.fadeOutVolumeMultiplier(progress, velocity: velocity)
            newVolume = toVolume - (toVolume - fromVolume) * volumeMultiplier
          }
          
          self.player.volume = Float(newVolume)
          
          currentStep += 1
      }
    }
  }
  
  // Graph: https://www.desmos.com/calculator/wnstesdf0h
  private func fadeOutVolumeMultiplier(progress: Double, velocity: Double) -> Double {
    return pow(M_E, -velocity * progress) * (1 - progress)
  }
  
  private func fadeInVolumeMultiplier(progress: Double, velocity: Double) -> Double {
    return pow(M_E, velocity * (progress - 1)) * progress
  }
}
