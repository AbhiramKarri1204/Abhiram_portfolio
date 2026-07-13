import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
// 1. Import the video asset using the relative path from the components folder
import introVideoAsset from '../assets/Abhiram_AI_Engineer_Python_Developer_202607131404.mp4';

interface IntroVideoSplashProps {
  onTransition: () => void;
}

export default function IntroVideoSplash({ onTransition }: IntroVideoSplashProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Force muted playback immediately to guarantee browser compliance
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.log("Autoplay bound intercepted:", error);
      });
    }

    // Fallback safety cutoff at 10 seconds
    const safetyTimer = setTimeout(() => {
      onTransition();
    }, 10000);

    return () => clearTimeout(safetyTimer);
  }, [onTransition]);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 9999, overflow: 'hidden'
    }}>
      <video
        ref={videoRef}
        src={introVideoAsset} // 2. Assign the imported module asset here
        preload="auto"
        playsInline
        autoPlay
        muted
        onEnded={onTransition}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Floating Mute/Unmute toggle action button */}
      <button
        id="splash-mute-toggle"
        onClick={toggleMute}
        type="button"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 10000,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          color: '#ffffff',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.8)';
          e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }}
        aria-label={isMuted ? 'Unmute intro video' : 'Mute intro video'}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  );
}

