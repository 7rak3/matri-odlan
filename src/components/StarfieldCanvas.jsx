import React, { useEffect, useRef } from 'react';

/**
 * StarfieldCanvas - Cosmic Nebula & Melodic House Visualizer
 * Features:
 * - Multi-layer volumetric swirling nebula (Violet, Cyan, Magenta, Gold)
 * - 3D Stars with depth perspective and twinkle
 * - Sweeping atmospheric festival laser beams (Zamna / Afterlife style)
 * - Gravitational wave ripples on mouse & touch interaction
 * - Beat-reactive pulsing to 122 BPM kicks
 * - Hyperspace electronic warp vortex mode
 */
export default function StarfieldCanvas({ isWarping = false, beatPulse = 0 }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });
  const ripplesRef = useRef([]);
  const warpSpeedRef = useRef(0);
  const beatRef = useRef(0);

  // Keep beat pulse in a ref for the animation loop
  useEffect(() => {
    beatRef.current = beatPulse;
  }, [beatPulse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic 3D Stars
    const STAR_COUNT = Math.min(320, Math.floor((width * height) / 3200));
    const stars = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2.2,
        y: (Math.random() - 0.5) * height * 2.2,
        z: Math.random() * 1000 + 100,
        size: Math.random() * 1.8 + 0.6,
        color:
          Math.random() > 0.4
            ? '#fae084'
            : Math.random() > 0.5
            ? '#38bdf8'
            : Math.random() > 0.3
            ? '#e879f9'
            : '#ffffff',
        twinkleSpeed: Math.random() * 0.05 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Nebula cloud vortex nodes
    const nebulaNodes = [
      { xRel: 0.25, yRel: 0.3, color: 'rgba(126, 34, 206, 0.22)', size: 450, phase: 0, speed: 0.0006 },
      { xRel: 0.75, yRel: 0.4, color: 'rgba(14, 165, 233, 0.18)', size: 500, phase: 1.5, speed: 0.0005 },
      { xRel: 0.5, yRel: 0.65, color: 'rgba(217, 70, 239, 0.16)', size: 480, phase: 3.0, speed: 0.0007 },
      { xRel: 0.4, yRel: 0.2, color: 'rgba(234, 179, 8, 0.12)', size: 400, phase: 4.5, speed: 0.0004 },
      { xRel: 0.8, yRel: 0.75, color: 'rgba(99, 102, 241, 0.18)', size: 420, phase: 2.1, speed: 0.0005 },
    ];

    // Festival Lasers sweeping across the cosmos
    const lasers = [
      { angle: -0.6, speed: 0.0007, color: 'rgba(192, 132, 252, 0.15)', width: 2.5 },
      { angle: 0.4, speed: -0.0009, color: 'rgba(56, 189, 248, 0.12)', width: 2.0 },
      { angle: -0.1, speed: 0.0005, color: 'rgba(250, 204, 21, 0.12)', width: 3.0 },
      { angle: 0.8, speed: -0.0006, color: 'rgba(232, 121, 249, 0.14)', width: 2.2 },
    ];

    // Shooting comets
    const shootingStars = [];
    const spawnShootingStar = () => {
      if (Math.random() < 0.02 && shootingStars.length < 4) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 160 + 90,
          speed: Math.random() * 14 + 10,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.35,
          opacity: 1,
          decay: Math.random() * 0.016 + 0.01,
          color: Math.random() > 0.5 ? '#fae084' : '#38bdf8',
        });
      }
    };

    const addRipple = (x, y) => {
      if (ripplesRef.current.length < 8) {
        ripplesRef.current.push({
          x,
          y,
          radius: 10,
          maxRadius: 280,
          opacity: 0.6,
          speed: 4.5,
        });
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.1;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.1;
      if (Math.random() < 0.08) {
        addRipple(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current.targetX = (e.touches[0].clientX - width / 2) * 0.1;
        mouseRef.current.targetY = (e.touches[0].clientY - height / 2) * 0.1;
        if (Math.random() < 0.12) {
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

    let lastTime = performance.now();

    const render = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Mouse smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Warp speed acceleration
      const targetSpeed = isWarping ? 42 : 1.4;
      warpSpeedRef.current += (targetSpeed - warpSpeedRef.current) * 0.05;
      const speed = warpSpeedRef.current;

      // Clear with deep cosmic black
      ctx.fillStyle = isWarping ? 'rgba(3, 5, 17, 0.25)' : '#02040b';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2 + mouseRef.current.x;
      const cy = height / 2 + mouseRef.current.y;
      const beatIntensity = beatRef.current * 0.35; // 0 to 0.35 on kick

      // 1. Render Multi-Layer Volumetric Nebula Clouds
      if (!isWarping) {
        ctx.save();
        nebulaNodes.forEach((node) => {
          node.phase += node.speed * 60 * dt;
          const wobbleX = Math.sin(node.phase) * 60;
          const wobbleY = Math.cos(node.phase * 0.8) * 60;

          const nx = width * node.xRel + wobbleX + mouseRef.current.x * 1.5;
          const ny = height * node.yRel + wobbleY + mouseRef.current.y * 1.5;
          const currentSize = node.size * (1 + beatIntensity * 0.25);

          const grad = ctx.createRadialGradient(nx, ny, 10, nx, ny, currentSize);
          grad.addColorStop(0, node.color);
          grad.addColorStop(0.5, node.color.replace(/[\d.]+\)$/, '0.08)'));
          grad.addColorStop(1, 'rgba(2, 4, 11, 0)');

          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);
        });
        ctx.restore();
      }

      // 2. Render Sweeping Festival Laser Beams (Atmospheric club lights)
      if (!isWarping && speed < 3) {
        ctx.save();
        const laserOriginX = width * 0.5 + mouseRef.current.x * 0.5;
        const laserOriginY = height * 1.1; // Coming from bottom horizon stage

        lasers.forEach((laser) => {
          laser.angle += laser.speed * 60 * dt;
          const currentAngle = laser.angle + Math.sin(time * 0.0008) * 0.25;

          const targetX = laserOriginX + Math.sin(currentAngle) * (height * 1.4);
          const targetY = -100;

          const grad = ctx.createLinearGradient(laserOriginX, laserOriginY, targetX, targetY);
          grad.addColorStop(0, laser.color);
          grad.addColorStop(0.7, laser.color.replace(/[\d.]+\)$/, '0.04)'));
          grad.addColorStop(1, 'rgba(0,0,0,0)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = laser.width * (1 + beatIntensity * 1.5);
          ctx.beginPath();
          ctx.moveTo(laserOriginX, laserOriginY);
          ctx.lineTo(targetX, targetY);
          ctx.stroke();

          // Laser glow cone
          ctx.fillStyle = laser.color.replace(/[\d.]+\)$/, '0.02)');
          ctx.beginPath();
          ctx.moveTo(laserOriginX, laserOriginY);
          ctx.lineTo(targetX - 40, targetY);
          ctx.lineTo(targetX + 40, targetY);
          ctx.closePath();
          ctx.fill();
        });
        ctx.restore();
      }

      // 3. Render Gravitational Wave Ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += r.speed * 60 * dt;
        r.opacity -= 0.012 * 60 * dt;

        if (r.opacity <= 0 || r.radius > r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(56, 189, 248, ${r.opacity * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(250, 224, 132, ${r.opacity * 0.25})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.7, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 4. Render 3D Depth Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.z -= speed * 130 * dt;
        if (star.z <= 2) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * width * 2.2;
          star.y = (Math.random() - 0.5) * height * 2.2;
        }

        const k = 420 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= -30 && px <= width + 30 && py >= -30 && py <= height + 30) {
          const depthAlpha = Math.min(1, Math.max(0.12, (1000 - star.z) / 800));
          star.twinklePhase += star.twinkleSpeed;
          const twinkle = isWarping ? 1 : 0.7 + 0.3 * Math.sin(star.twinklePhase);
          const finalAlpha = depthAlpha * twinkle;

          if (isWarping || speed > 3) {
            // Warp Light Streak Tunnel
            const prevK = 420 / (star.z + speed * 7);
            const prevX = star.x * prevK + cx;
            const prevY = star.y * prevK + cy;

            ctx.strokeStyle = star.color;
            ctx.lineWidth = Math.max(1, (1 - star.z / 1000) * 3.5);
            ctx.globalAlpha = Math.min(1, finalAlpha * 1.8);
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(px, py);
            ctx.stroke();
            ctx.globalAlpha = 1;
          } else {
            // Glowing star point, responsive to beat
            const beatScale = 1 + beatIntensity * 0.3;
            const radius = Math.max(0.6, (1 - star.z / 1000) * star.size * 2.2 * beatScale);

            ctx.beginPath();
            ctx.arc(px, py, radius, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.globalAlpha = finalAlpha;
            ctx.fill();

            // Star halo glow
            if (radius > 1.8) {
              ctx.beginPath();
              ctx.arc(px, py, radius * 2.6, 0, Math.PI * 2);
              ctx.fillStyle = star.color;
              ctx.globalAlpha = finalAlpha * 0.22;
              ctx.fill();
            }
            ctx.globalAlpha = 1;
          }
        }
      }

      // 5. Shooting Comets
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
          grad.addColorStop(0.7, `${s.color}${Math.floor(s.opacity * 180).toString(16).padStart(2, '0')}`);
          grad.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
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
      window.removeEventListener('click', handleClick);
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
