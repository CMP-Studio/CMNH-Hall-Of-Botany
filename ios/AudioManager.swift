//
//  AudioManager.swift
//  Hall of Botany
//
//  Created by Ruben Niculcea on 12/3/15.
//  Copyright © 2015 Carnegie Museums of Pittsburgh. All rights reserved.
//

import Foundation
import AVFoundation

@objc(AudioManager)
class AudioManager: NSObject {
  
  // The higher the number - the higher the quality of fade
  // and it will consume more CPU.
  var volumeAlterationsPerSecond = 30.0
  
  var audioSrc = ""
  var player:AVAudioPlayer?
  var timer:NSTimer?
  var finishedChangingAudio = true

  override init() {
    super.init()
  }
  
  @objc func prepareForBackgroundAudio() {
    do {
      try AVAudioSession.sharedInstance().setCategory(AVAudioSessionCategoryPlayback)
      print("AVAudioSession Category Playback OK")
      do {
        try AVAudioSession.sharedInstance().setActive(true)
        print("AVAudioSession is Active")
      } catch let error as NSError {
        print(error.localizedDescription)
      }
    } catch let error as NSError {
      print(error.localizedDescription)
    }
  }
  
  @objc func loadAudio(audio: String) {
    if audio == "" || audio == audioSrc {
      return
    }
    
    let soundURL = CFBundleCopyResourceURL(CFBundleGetMainBundle(), audio, nil, nil)
  
    func prepareAudio() {
      do {
        player = try AVAudioPlayer(contentsOfURL: soundURL)
        audioSrc = audio
        player!.numberOfLoops = -1
        player!.play()
        player!.volume = 0.0
        finishedChangingAudio = true;
        
      } catch let error as NSError {
        print("Error - AudioManager - \(error.domain)")
      }
    }
    
    if let _player = player {
      finishedChangingAudio = false;
      
      fadetoVolume(0.0) {
        _player.stop()
        prepareAudio()
      }
    } else {
      prepareAudio()
    }
  }
  
  @objc func adjustVolume(volume: Double) {
    if let _player = player {
      if finishedChangingAudio && (volume != Double(_player.volume)) {
        fadetoVolume(volume)
      }
    }
  }
  
  @objc func pauseAudio() {
    player?.pause()
  }
  
  @objc func playAudio() {
    player?.play()
  }
  
  @objc func togglePlayAudio() {
    if let _player = player {
      if _player.playing {
        _player.pause()
      } else {
        _player.play()
      }
    }
  }
  
  @objc func stopAudio() {
    if let _player = player {
      fadetoVolume(0.0) {
        _player.stop()
        self.audioSrc = ""
      }
    }
  }
  
  private func fadetoVolume(toVolume: Double,
    duration: Double = 2.0,
    velocity: Double = 2.0,
    onFinished: (()->())? = nil) {
    
    if let _timer = timer {
      if _timer.valid {
        self.timer!.invalidate()
        self.timer = nil
      }
    }
      
    var currentStep = 0.0;
    let totalSteps = duration * volumeAlterationsPerSecond
    let fromVolume = Double(player!.volume)
      
    // React Native Modules do not run on the main thread
    // and NSTimer needs to be ran on the main thread to work.
    
    // TODO: Move off of main thread in order to prevent UI Lock up
    dispatch_async(dispatch_get_main_queue()) {
      self.timer = NSTimer.every(1 / self.volumeAlterationsPerSecond) {
        var volumeMultiplier, newVolume, progress: Double
        
        if currentStep > totalSteps {
          self.player!.volume = Float(toVolume)
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
        
        self.player!.volume = Float(newVolume)
        
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
