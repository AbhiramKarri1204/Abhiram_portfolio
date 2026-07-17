import React, { useEffect, useRef } from 'react';

export const BackgroundEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class for cybernetic node nodes
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.color = Math.random() > 0.5 ? '#EF4444' : '#FF003C'; // High-Intensity Crimson Red vs Cyberpunk Neon Red
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const particles: Particle[] = Array.from({ length: 45 }, () => new Particle());

    // Digital Rain Stream setup for high-tech cybernetic look
    class RainStream {
      x: number;
      y: number;
      speed: number;
      chars: string[];
      fontSize: number;
      opacity: number;

      constructor(x: number) {
        this.x = x;
        this.y = Math.random() * -600;
        this.speed = Math.random() * 0.4 + 0.15; // subtle, slow-moving
        this.fontSize = Math.floor(Math.random() * 4) + 9; // small, elegant: 9px to 12px
        this.opacity = Math.random() * 0.12 + 0.03; // extremely subtle so it's not distracting from content
        this.chars = [];
        this.generateStream();
      }

      generateStream() {
        const len = Math.floor(Math.random() * 12) + 6;
        const alphabet = '01ABCDEF';
        this.chars = Array.from({ length: len }, () => alphabet[Math.floor(Math.random() * alphabet.length)]);
      }

      update() {
        this.y += this.speed;
        if (this.y - (this.chars.length * this.fontSize) > height) {
          this.y = -100;
          this.speed = Math.random() * 0.4 + 0.15;
          this.opacity = Math.random() * 0.12 + 0.03;
          this.generateStream();
        }
        if (Math.random() < 0.015) {
          const idx = Math.floor(Math.random() * this.chars.length);
          const alphabet = '01ABCDEF';
          this.chars[idx] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }

      draw() {
        if (!ctx) return;
        ctx.font = `${this.fontSize}px var(--font-mono), monospace`;
        
        for (let i = 0; i < this.chars.length; i++) {
          const charY = this.y - (i * this.fontSize);
          if (charY < 0 || charY > height) continue;

          if (i === 0) {
            // Bright leading character
            ctx.fillStyle = `rgba(255, 0, 60, ${this.opacity * 2.5})`; // Cyberpunk Neon Red
            ctx.shadowBlur = 4;
            ctx.shadowColor = '#FF003C';
          } else {
            const fade = (this.chars.length - i) / this.chars.length;
            // Trails fade out beautifully into Crimson/Smoke
            ctx.fillStyle = `rgba(239, 68, 68, ${this.opacity * fade * 1.5})`;
            ctx.shadowBlur = 0;
          }
          ctx.fillText(this.chars[i], this.x, charY);
        }
        ctx.shadowBlur = 0;
      }
    }

    let streams: RainStream[] = [];
    const initStreams = () => {
      streams = [];
      const columnWidth = 32; // Column spacing
      const numColumns = Math.ceil(width / columnWidth);
      for (let i = 0; i < numColumns; i++) {
        streams.push(new RainStream(i * columnWidth));
      }
    };
    initStreams();

    const drawGrid = (t: number) => {
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.08)'; // Faint Crimson Red HUD grid lines
      ctx.lineWidth = 1;

      const gridSize = 60;
      const shiftX = (t * 0.015) % gridSize;
      const shiftY = (t * 0.01) % gridSize;

      // Vertical lines
      for (let x = shiftX; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = shiftY; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw faint large glowing radial orbs
      const gradient = ctx.createRadialGradient(
        width * 0.3 + Math.sin(t * 0.0005) * 100,
        height * 0.4 + Math.cos(t * 0.0003) * 100,
        0,
        width * 0.3,
        height * 0.4,
        Math.min(width, height) * 0.6
      );
      gradient.addColorStop(0, 'rgba(239, 68, 68, 0.04)'); // Crimson Glow
      gradient.addColorStop(0.5, 'rgba(255, 0, 60, 0.01)'); // Neon Red Faint glow
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Radial glowing core in top-right
      const rGradient = ctx.createRadialGradient(
        width * 0.8 + Math.cos(t * 0.0002) * 80,
        height * 0.2 + Math.sin(t * 0.0004) * 80,
        0,
        width * 0.8,
        height * 0.2,
        Math.min(width, height) * 0.5
      );
      rGradient.addColorStop(0, 'rgba(255, 0, 60, 0.03)'); // Neon Red core
      rGradient.addColorStop(0.6, 'rgba(239, 68, 68, 0.01)'); // Crimson fade
      rGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = rGradient;
      ctx.fillRect(0, 0, width, height);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStreams();
    };

    window.addEventListener('resize', handleResize);

    const animate = (timestamp: number) => {
      ctx.fillStyle = '#000000'; // Solid High-Contrast Black canvas background
      ctx.fillRect(0, 0, width, height);

      drawGrid(timestamp);

      // Render the digital rain in background layer
      streams.forEach((s) => {
        s.update();
        s.draw();
      });

      // Render nodes/particles in foreground layer
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw horizontal scanning HUD laser sweep
      const laserY = (timestamp * 0.08) % (height * 1.5);
      if (laserY < height) {
        const laserGrad = ctx.createLinearGradient(0, laserY - 10, 0, laserY + 10);
        laserGrad.addColorStop(0, 'rgba(255, 0, 60, 0)');
        laserGrad.addColorStop(0.5, 'rgba(255, 0, 60, 0.06)'); // Cyberpunk Neon Red sweep
        laserGrad.addColorStop(1, 'rgba(255, 0, 60, 0)');
        ctx.fillStyle = laserGrad;
        ctx.fillRect(0, laserY - 10, width, 20);

        // Sweeping line itself
        ctx.strokeStyle = 'rgba(255, 0, 60, 0.15)';
        ctx.beginPath();
        ctx.moveTo(0, laserY);
        ctx.lineTo(width, laserY);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      id="cybernetic-background-grid"
      ref={canvasRef}
      className="fixed inset-0 -z-50 pointer-events-none select-none bg-[#000000]"
    />
  );
};
