import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
  speed: number;
  angle: number;
  orbitRadius: number;
  type: 'plastic' | 'metal' | 'paper' | 'copper' | 'energy';
}

export const CircularEconomyCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Warm, sophisticated civic palette: forest green, copper amber, sage, slate ink
    const colors = [
      '#047857', // emerald-700
      '#059669', // emerald-600
      '#10b981', // emerald-500
      '#d97706', // amber-600
      '#334155', // slate-700
      '#0284c7'  // sky-600
    ];

    const particlesCount = width < 640 ? 35 : 65;
    const particles: Particle[] = [];

    for (let i = 0; i < particlesCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const orbitRadius = 45 + Math.random() * (Math.min(width, height) * 0.38);
      particles.push({
        x: 0,
        y: 0,
        z: (Math.random() - 0.5) * 150,
        radius: 1.5 + Math.random() * 2.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.005 + Math.random() * 0.008,
        angle,
        orbitRadius,
        type: ['plastic', 'metal', 'paper', 'copper', 'energy'][Math.floor(Math.random() * 5)] as any
      });
    }

    let targetRotX = 0.3;
    let targetRotY = 0;
    let currentRotX = 0.3;
    let currentRotY = 0;
    let globalAngle = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / height) * 2 - 1;
      targetRotY = nx * 0.4;
      targetRotX = 0.3 + ny * 0.3;
    };

    canvas.addEventListener('mousemove', onMouseMove);

    const render = () => {
      globalAngle += 0.01;
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Subtle warm ambient center
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 120);
      coreGrad.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
      coreGrad.addColorStop(0.5, 'rgba(5, 150, 105, 0.05)');
      coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
      ctx.fill();

      // 2. Orbital rings with clean dashes
      const rings = [
        { radius: Math.min(width, height) * 0.22, tilt: 0.35, speed: 1.0, color: 'rgba(5, 150, 105, 0.25)' },
        { radius: Math.min(width, height) * 0.33, tilt: -0.25, speed: -0.8, color: 'rgba(100, 116, 139, 0.2)' },
        { radius: Math.min(width, height) * 0.42, tilt: 0.15, speed: 0.6, color: 'rgba(217, 119, 6, 0.2)' }
      ];

      rings.forEach((ring, idx) => {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(currentRotY * 0.4 + idx * 0.2);
        ctx.scale(1, Math.cos(currentRotX + ring.tilt));

        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1.4;
        ctx.setLineDash([6, 10]);
        ctx.lineDashOffset = -globalAngle * 30 * ring.speed;

        ctx.beginPath();
        ctx.arc(0, 0, ring.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.restore();
      });

      // 3. Render 3D particles with clean perspective
      particles.forEach((p) => {
        p.angle += p.speed;
        const x3d = Math.cos(p.angle) * p.orbitRadius;
        const z3d = Math.sin(p.angle) * p.orbitRadius;
        const y3d = Math.sin(p.angle * 2 + globalAngle) * 20;

        const cosY = Math.cos(currentRotY);
        const sinY = Math.sin(currentRotY);
        const rx = x3d * cosY + z3d * sinY;
        const rz = -x3d * sinY + z3d * cosY;

        const cosX = Math.cos(currentRotX);
        const sinX = Math.sin(currentRotX);
        const ry = y3d * cosX - rz * sinX;
        const depth = rz * cosX + y3d * sinX;

        const scale = 360 / (360 + depth);
        const px = centerX + rx * scale;
        const py = centerY + ry * scale;

        const alpha = Math.max(0.2, Math.min(0.9, (scale - 0.4) * 1.4));

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(px, py, p.radius * scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // 4. Center badge
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.fillStyle = '#065f46';
      ctx.font = '600 11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const pulseSize = 22 + Math.sin(globalAngle * 2) * 2;
      ctx.strokeStyle = 'rgba(5, 150, 105, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillText('♺ ZERO-LANDFILL', 0, 1);
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
      />
    </div>
  );
};
