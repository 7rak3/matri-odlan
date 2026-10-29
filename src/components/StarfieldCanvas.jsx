import React, { useEffect, useRef } from 'react';

/**
 * BotanicalAmbientCanvas - Warm Golden Bokeh & Ethereal Botanical Atmosphere
 * Features:
 * - Deep organic olive & warm forest ambient gradients
 * - Warm golden motes, soft fireflies & delicate floating champagne embers
 * - Interactive light ripples on touch & mouse movement
 */
export default function StarfieldCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const ripplesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Warm golden embers & fireflies
    const PARTICLE_COUNT = Math.min(160, Math.floor((width * height) / 6000));
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.4 + 0.8,
        color:
          Math.random() > 0.45
            ? 'rgba(250, 231, 201, ' // CREMA #FAE7C9
            : Math.random() > 0.35
            ? 'rgba(225, 199, 143, ' // CARAMEL #E1C78F
            : 'rgba(176, 146, 106, ', // ARABICA #B0926A
        baseAlpha: Math.random() * 0.55 + 0.3,
        speedY: -(Math.random() * 0.45 + 0.15),
        speedX: (Math.random() - 0.5) * 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Warm ambient light nodes (Crema, Caramel & Arabica over #6e6b41)
    const ambientNodes = [
      { xRel: 0.2, yRel: 0.25, color: 'rgba(250, 231, 201, 0.18)', size: 580, phase: 0 },
      { xRel: 0.8, yRel: 0.35, color: 'rgba(225, 199, 143, 0.22)', size: 620, phase: 1.8 },
      { xRel: 0.5, yRel: 0.7, color: 'rgba(176, 146, 106, 0.25)', size: 600, phase: 3.2 },
      { xRel: 0.3, yRel: 0.85, color: 'rgba(250, 231, 201, 0.15)', size: 500, phase: 4.5 },
    ];

    const addRipple = (x, y) => {
      if (ripplesRef.current.length < 6) {
        ripplesRef.current.push({
          x,
          y,
          radius: 10,
          maxRadius: 220,
          opacity: 0.4,
          speed: 3.2,
        });
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.05;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.05;
      if (Math.random() < 0.04) {
        addRipple(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current.targetX = (e.touches[0].clientX - width / 2) * 0.05;
        mouseRef.current.targetY = (e.touches[0].clientY - height / 2) * 0.05;
        if (Math.random() < 0.08) {
          addRipple(e.touches[0].clientX, e.touches[0].clientY);
        }
      }
    };

    const handleClick = (e) => {
      addRipple(e.clientX, e.clientY);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);

    const render = (time) => {
      // Smooth mouse
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Base olive tone requested by client (#6e6b41)
      ctx.fillStyle = '#6e6b41';
      ctx.fillRect(0, 0, width, height);

      // 1. Ambient lighting glow
      ambientNodes.forEach((node) => {
        const nx = width * node.xRel + Math.sin(time * 0.0004 + node.phase) * 50 + mouseRef.current.x;
        const ny = height * node.yRel + Math.cos(time * 0.0003 + node.phase) * 50 + mouseRef.current.y;
        const grad = ctx.createRadialGradient(nx, ny, 20, nx, ny, node.size);
        grad.addColorStop(0, node.color);
        grad.addColorStop(0.6, node.color.replace(/[\d.]+\)$/, '0.07)'));
        grad.addColorStop(1, 'rgba(110, 107, 65, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      // 2. Interactive Caramel & Crema ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rip = ripplesRef.current[i];
        rip.radius += rip.speed;
        rip.opacity -= 0.012;

        if (rip.opacity <= 0 || rip.radius >= rip.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(250, 231, 201, ${rip.opacity * 0.65})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Floating warm embers & fireflies
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time * 0.001 + p.pulsePhase) * 0.25;

        // Wrap around
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        const alpha = p.baseAlpha + Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.25;
        const finalAlpha = Math.max(0.15, Math.min(0.95, alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${finalAlpha})`;
        ctx.shadowColor = 'rgba(250, 231, 201, 0.55)';
        ctx.shadowBlur = p.radius * 3;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
