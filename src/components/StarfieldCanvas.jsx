import React, { useEffect, useRef } from 'react';

/**
 * StarfieldCanvas
 * High-performance 2D Canvas rendering 3D starfield, cosmic dust,
 * shooting stars, constellation linkages, and Hyperspace Warp speed mode.
 */
export default function StarfieldCanvas({ isWarping = false }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const warpSpeedRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Setup stars in 3D perspective space
    const STAR_COUNT = Math.min(280, Math.floor((width * height) / 3800));
    const stars = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * 1000 + 100,
        origZ: Math.random() * 1000 + 100,
        size: Math.random() * 1.6 + 0.6,
        color: Math.random() > 0.35 ? '#d4af37' : Math.random() > 0.5 ? '#fae084' : '#ffffff',
        twinkleSpeed: Math.random() * 0.04 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Shooting stars
    const shootingStars = [];
    const spawnShootingStar = () => {
      if (Math.random() < 0.015 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.5),
          length: Math.random() * 120 + 80,
          speed: Math.random() * 12 + 10,
          angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.3,
          opacity: 1,
          decay: Math.random() * 0.018 + 0.012,
        });
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.08;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.08;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current.targetX = (e.touches[0].clientX - width / 2) * 0.08;
        mouseRef.current.targetY = (e.touches[0].clientY - height / 2) * 0.08;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let lastTime = performance.now();

    const render = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Mouse smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Warp speed acceleration interpolation
      const targetSpeed = isWarping ? 38 : 1.2;
      warpSpeedRef.current += (targetSpeed - warpSpeedRef.current) * 0.04;
      const speed = warpSpeedRef.current;

      // Clear frame with deep celestial trail
      ctx.fillStyle = isWarping ? 'rgba(3, 6, 17, 0.28)' : '#030611';
      ctx.fillRect(0, 0, width, height);

      // Subtle background nebula glows
      if (!isWarping) {
        const nebulaGrad = ctx.createRadialGradient(
          width * 0.5 + mouseRef.current.x * 2,
          height * 0.45 + mouseRef.current.y * 2,
          10,
          width * 0.5,
          height * 0.45,
          width * 0.7
        );
        nebulaGrad.addColorStop(0, 'rgba(40, 24, 75, 0.18)');
        nebulaGrad.addColorStop(0.4, 'rgba(16, 29, 68, 0.12)');
        nebulaGrad.addColorStop(0.8, 'rgba(212, 175, 55, 0.03)');
        nebulaGrad.addColorStop(1, 'rgba(3, 6, 17, 0)');
        ctx.fillStyle = nebulaGrad;
        ctx.fillRect(0, 0, width, height);
      }

      const cx = width / 2 + mouseRef.current.x;
      const cy = height / 2 + mouseRef.current.y;

      // Project and draw 3D stars
      const renderedStars = [];

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Move star along Z-axis
        star.z -= speed * 120 * dt;
        if (star.z <= 2) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        // Perspective 3D projection
        const k = 400 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= -20 && px <= width + 20 && py >= -20 && py <= height + 20) {
          const depthAlpha = Math.min(1, Math.max(0.1, (1000 - star.z) / 800));
          star.twinklePhase += star.twinkleSpeed;
          const twinkle = isWarping ? 1 : 0.7 + 0.3 * Math.sin(star.twinklePhase);
          const finalAlpha = depthAlpha * twinkle;

          if (isWarping || speed > 3) {
            // Draw warp light-streak towards observer
            const prevK = 400 / (star.z + speed * 6);
            const prevX = star.x * prevK + cx;
            const prevY = star.y * prevK + cy;

            ctx.strokeStyle = star.color;
            ctx.lineWidth = Math.max(1, (1 - star.z / 1000) * 3);
            ctx.globalAlpha = Math.min(1, finalAlpha * 1.5);
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(px, py);
            ctx.stroke();
            ctx.globalAlpha = 1;
          } else {
            // Draw glowing star dot
            const radius = Math.max(0.6, (1 - star.z / 1000) * star.size * 2.2);

            ctx.beginPath();
            ctx.arc(px, py, radius, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.globalAlpha = finalAlpha;
            ctx.fill();

            // Extra halo for closer golden stars
            if (radius > 1.8) {
              ctx.beginPath();
              ctx.arc(px, py, radius * 2.4, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(212, 175, 55, 0.18)';
              ctx.fill();
            }
            ctx.globalAlpha = 1;

            if (star.z < 600) {
              renderedStars.push({ x: px, y: py, color: star.color });
            }
          }
        }
      }

      // Constellation linkage lines (only in calm navigation mode)
      if (!isWarping && speed < 2) {
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.06)';
        ctx.lineWidth = 0.6;
        for (let i = 0; i < renderedStars.length; i++) {
          for (let j = i + 1; j < Math.min(renderedStars.length, i + 8); j++) {
            const dx = renderedStars[i].x - renderedStars[j].x;
            const dy = renderedStars[i].y - renderedStars[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90) {
              ctx.beginPath();
              ctx.moveTo(renderedStars[i].x, renderedStars[i].y);
              ctx.lineTo(renderedStars[j].x, renderedStars[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Spawn & render shooting stars
      if (!isWarping) {
        spawnShootingStar();
        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const s = shootingStars[i];
          s.x += Math.cos(s.angle) * s.speed;
          s.y += Math.sin(s.angle) * s.speed;
          s.opacity -= s.decay;

          if (s.opacity <= 0 || s.x > width + 100 || s.y > height + 100) {
            shootingStars.splice(i, 1);
            continue;
          }

          const tailX = s.x - Math.cos(s.angle) * s.length;
          const tailY = s.y - Math.sin(s.angle) * s.length;

          const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grad.addColorStop(0.7, `rgba(212, 175, 55, ${s.opacity * 0.7})`);
          grad.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isWarping]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ touchAction: 'none' }}
    />
  );
}
