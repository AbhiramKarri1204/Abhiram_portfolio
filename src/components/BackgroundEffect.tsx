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
        this.color = Math.random() > 0.5 ? '#10b981' : '#06b6d4'; // emerald vs cyan
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

    const drawGrid = (t: number) => {
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.04)'; // Emerald faint lines
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
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.06)'); // emerald
      gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.02)'); // cyan
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
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
      rGradient.addColorStop(0, 'rgba(6, 182, 212, 0.05)'); // cyan glow
      rGradient.addColorStop(0.6, 'rgba(16, 185, 129, 0.01)'); // emerald fade
      rGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = rGradient;
      ctx.fillRect(0, 0, width, height);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const animate = (timestamp: number) => {
      ctx.fillStyle = '#05070a'; // Deepest cyber slate/black background
      ctx.fillRect(0, 0, width, height);

      drawGrid(timestamp);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw horizontal scanning HUD laser sweep
      const laserY = (timestamp * 0.08) % (height * 1.5);
      if (laserY < height) {
        const laserGrad = ctx.createLinearGradient(0, laserY - 10, 0, laserY + 10);
        laserGrad.addColorStop(0, 'rgba(16, 185, 129, 0)');
        laserGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.05)');
        laserGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = laserGrad;
        ctx.fillRect(0, laserY - 10, width, 20);

        // Sweeping line itself
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.12)';
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
      className="fixed inset-0 -z-50 pointer-events-none select-none bg-[#05070a]"
    />
  );
};
