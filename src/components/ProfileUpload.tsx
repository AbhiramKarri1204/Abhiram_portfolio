import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Trash2, Link, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileProps {
  currentImage: string | null;
  onImageChange: (image: string | null) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
}

export const ProfilePictureContainer: React.FC<ProfileProps> = ({
  currentImage,
  onImageChange,
  size = 'md',
  interactive = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set sizing classes
  const dimensions = {
    sm: 'w-16 h-16 text-xl border-2',
    md: 'w-28 h-28 text-3xl border-2',
    lg: 'w-44 h-44 text-5xl border-[3px]',
    xl: 'w-56 h-56 text-6xl border-[4px]',
  }[size];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onImageChange(reader.result);
          setIsEditing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onImageChange(urlInput.trim());
      setUrlInput('');
      setIsEditing(false);
    }
  };

  return (
    <div 
      className="relative flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer rotating HUD circle rings */}
      <div className="absolute inset-0 flex items-center justify-center -m-4 pointer-events-none">
        <div className={`absolute border border-emerald-500/10 rounded-full animate-[spin_40s_linear_infinite] ${
          size === 'xl' ? 'w-64 h-64' : size === 'lg' ? 'w-52 h-52' : 'w-36 h-36'
        }`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
        </div>
        <div className={`absolute border border-dashed border-cyan-500/15 rounded-full animate-[spin_25s_linear_infinite_reverse] ${
          size === 'xl' ? 'w-[272px] h-[272px]' : size === 'lg' ? 'w-[220px] h-[220px]' : 'w-[152px] h-[152px]'
        }`} />
      </div>

      {/* Main Avatar Container */}
      <div 
        id="profile-hud-avatar-box"
        className={`relative rounded-full overflow-hidden flex items-center justify-center ${dimensions} transition-all duration-500 bg-[#0d121b] border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] ${interactive ? 'cursor-pointer' : 'cursor-default'} group`}
        onClick={() => interactive && setIsEditing(true)}
      >
        {currentImage ? (
          <img 
            src={currentImage} 
            alt="Karri Abhiram" 
            className="w-full h-full object-cover select-none transition-transform duration-700 hover:scale-110"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-[#05070a] via-emerald-950/40 to-cyan-950/40 flex items-center justify-center font-sans font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300">
            KA
          </div>
        )}

        {/* Hover overlay HUD */}
        {interactive && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
            <Camera className="w-6 h-6 text-emerald-400 animate-pulse mb-1" />
            <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-400 font-semibold">
              UPLOAD / CONFIGURE
            </span>
          </div>
        )}

        {/* Cybernetic HUD Frame corners overlay */}
        <div className="absolute inset-0 pointer-events-none border border-emerald-500/10 rounded-full">
          {/* Top-left corner tick */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
          {/* Top-right corner tick */}
          <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
          {/* Bottom-left corner tick */}
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-emerald-400" />
          {/* Bottom-right corner tick */}
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-emerald-400" />
        </div>
      </div>

      {/* Upload settings trigger button helper for accessibility */}
      {interactive && (
        <button
          type="button"
          id="upload-configuration-portal-trigger"
          onClick={() => setIsEditing(true)}
          className="mt-4 px-3 py-1.5 rounded-md border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 font-mono text-[10px] uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.15)] flex items-center gap-1.5 active:scale-95 cursor-pointer min-h-[44px] min-w-[140px] justify-center"
        >
          <Upload className="w-3.5 h-3.5" />
          Config Avatar
        </button>
      )}

      {/* Cybernetic Configuration Overlay Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="w-full max-w-md rounded-lg border border-emerald-500/40 bg-[#0d121b] p-6 shadow-[0_0_35px_rgba(16,185,129,0.25)] font-mono text-gray-300"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
                  <h3 className="text-sm font-bold tracking-widest text-cyan-400 uppercase">
                    Avatar Core Customization
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 hover:text-emerald-400 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center text-lg"
                >
                  ✕
                </button>
              </div>

              {/* Drag and Drop Box */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border border-dashed rounded-md p-6 text-center cursor-pointer transition-all duration-300 mb-5 ${
                  dragActive 
                    ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                    : 'border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-950/10'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Upload className="w-8 h-8 mx-auto text-emerald-400 mb-2 animate-bounce" />
                <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wider mb-1">
                  Drag & Drop Profile Picture
                </p>
                <p className="text-[10px] text-gray-500">
                  Supports JPEG, PNG, WEBP (or click to select manually)
                </p>
              </div>

              {/* URL Form */}
              <form onSubmit={handleUrlSubmit} className="space-y-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="h-[1px] bg-emerald-500/20 flex-1" />
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">OR USE INSTANT SECURE URL</span>
                  <div className="h-[1px] bg-emerald-500/20 flex-1" />
                </div>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/portrait.jpg"
                    className="w-full bg-[#05070a] border border-emerald-500/30 rounded-md py-2.5 pl-10 pr-4 text-xs font-mono text-emerald-300 placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(6,182,212,0.15)] transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 min-h-[44px] bg-emerald-600 text-black font-semibold uppercase tracking-wider rounded-md text-xs hover:bg-emerald-500 transition-all flex items-center justify-center gap-1.5"
                  >
                    Sync URL Image
                  </button>
                  {currentImage && (
                    <button
                      type="button"
                      onClick={() => {
                        onImageChange(null);
                        setIsEditing(false);
                      }}
                      className="px-3 min-h-[44px] border border-red-500/30 text-red-400 rounded-md hover:bg-red-950/20 transition-all flex items-center justify-center"
                      title="Remove Avatar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>

              {/* Status and instruction */}
              <div className="p-3 bg-cyan-950/10 border border-cyan-500/25 rounded-md">
                <div className="flex gap-2.5 text-[10px] leading-relaxed text-cyan-300">
                  <span className="text-sm">⚙</span>
                  <p>
                    <strong>HUD INSTRUCTION:</strong> Upload Abhiram's attached professional headshot, or paste a LinkedIn profile image link to synchronize. Stored locally in browser matrices.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
