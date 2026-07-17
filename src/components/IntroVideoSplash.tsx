import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
// 1. Import the video asset using the relative path from the components folder
import introVideoAsset from '../assets/Abhiram_AI_Engineer_Python_Developer_202607131404.mp4';

interface IntroVideoSplashProps {
  onTransition: () => void;
}

export default function IntroVideoSplash({ onTransition }: IntroVideoSplashProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check screen size for dynamic sizing adjustments
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);

    if (videoRef.current) {
      // Set to unmuted by default
      videoRef.current.muted = false;
      videoRef.current.play().catch((error) => {
        console.log("Autoplay with sound blocked. Falling back to muted autoplay:", error);
        // Fallback: play muted as per browser autoplay restrictions
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch((err) => {
            console.log("Muted fallback autoplay failed:", err);
          });
        }
      });
    }

    // Fallback safety cutoff at 10 seconds
    const safetyTimer = setTimeout(() => {
      onTransition();
    }, 10000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(safetyTimer);
    };
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
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      <video
        ref={videoRef}
        src={introVideoAsset} // 2. Assign the imported module asset here
        preload="auto"
        playsInline
        autoPlay
        muted={isMuted}
        onEnded={onTransition}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain', // Adapts completely to any screen size (landscape or portrait) without clipping HUD parameters
          backgroundColor: '#000000'
        }}
      />

      {/* Floating Mute/Unmute toggle action button - fully responsive sizing */}
      <button
        id="splash-mute-toggle"
        onClick={toggleMute}
        type="button"
        style={{
          position: 'absolute',
          top: isMobile ? '16px' : '24px',
          right: isMobile ? '16px' : '24px',
          zIndex: 10000,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          border: '1.5px solid rgba(239, 68, 68, 0.6)',
          borderRadius: '9999px',
          padding: isMobile ? '6px 12px' : '10px 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isMobile ? '4px' : '8px',
          cursor: 'pointer',
          color: '#ffffff',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 0 15px rgba(239, 68, 68, 0.25)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.9)';
          e.currentTarget.style.borderColor = 'rgba(255, 0, 60, 1)';
          e.currentTarget.style.boxShadow = '0 0 25px rgba(239, 68, 68, 0.6)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
          e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.6)';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.25)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label={isMuted ? 'Unmute intro video' : 'Mute intro video'}
      >
        {isMuted ? (
          <VolumeX className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-red-500 animate-pulse`} />
        ) : (
          <Volume2 className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-red-400`} />
        )}
        <span style={{
          fontSize: isMobile ? '9px' : '11px',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          letterSpacing: '0.08em',
          color: '#ffffff'
        }}>
          {isMuted ? 'SOUND OFF' : 'SOUND ON'}
        </span>
      </button>
    </div>
  );
}

