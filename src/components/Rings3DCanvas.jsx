import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Rings3DCanvas - Real GPU-accelerated WebGL 3D Wedding Rings in Three.js
 * Features:
 * - Two interlocking metallic gold wedding bands with specular glints
 * - Sparkling diamond cut gem
 * - Real-time rotating dynamic point lights casting physical reflections
 * - Interactive mouse / touch tilt tracking
 * - Camera zoom dive on portal open
 */
export default function Rings3DCanvas({ isOpening = false, className = '' }) {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 3. Materials - High-Reflectivity Physical Gold
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xffdf6d,
      metalness: 0.96,
      roughness: 0.14,
    });

    const roseGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd29d,
      metalness: 0.94,
      roughness: 0.16,
    });

    const diamondMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.05,
      transparent: true,
      opacity: 0.92,
    });

    // 4. Geometry & Meshes - Two Interlocking Torus Rings
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    // Ring 1 (Yellow Gold)
    const ringGeo1 = new THREE.TorusGeometry(1.6, 0.22, 32, 100);
    const ring1 = new THREE.Mesh(ringGeo1, goldMaterial);
    ring1.position.set(-0.7, 0, 0);
    ring1.rotation.set(0.4, 0.6, 0);
    ringGroup.add(ring1);

    // Ring 2 (Rose Gold, interlocked)
    const ringGeo2 = new THREE.TorusGeometry(1.6, 0.22, 32, 100);
    const ring2 = new THREE.Mesh(ringGeo2, roseGoldMaterial);
    ring2.position.set(0.7, 0, 0);
    ring2.rotation.set(-0.5, -0.7, 0.3);
    ringGroup.add(ring2);

    // Diamond gem on Ring 1
    const diamondGeo = new THREE.OctahedronGeometry(0.35, 2);
    const diamond = new THREE.Mesh(diamondGeo, diamondMaterial);
    diamond.position.set(-0.7, 1.7, 0);
    ringGroup.add(diamond);

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 2.0);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    // Orbiting point light for realistic moving glints
    const glintLight1 = new THREE.PointLight(0xfff0aa, 3.5, 20);
    glintLight1.position.set(0, 3, 4);
    scene.add(glintLight1);

    const glintLight2 = new THREE.PointLight(0x7dd3fc, 2.0, 18);
    glintLight2.position.set(-3, -2, 3);
    scene.add(glintLight2);

    // 6. Interaction
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.8;
      mouseRef.current.targetY = y * 0.8;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const rect = container.getBoundingClientRect();
        const x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.touches[0].clientY - rect.top) / rect.height) * 2 - 1);
        mouseRef.current.targetX = x * 0.8;
        mouseRef.current.targetY = y * 0.8;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Handle container resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Mouse smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Base rotation + interactive tilt
      ringGroup.rotation.y = elapsed * 0.45 + mouseRef.current.x * 0.8;
      ringGroup.rotation.x = Math.sin(elapsed * 0.35) * 0.2 + mouseRef.current.y * 0.8;
      ringGroup.position.y = Math.sin(elapsed * 1.2) * 0.12;

      // Orbiting lights
      glintLight1.position.x = Math.sin(elapsed * 1.5) * 4;
      glintLight1.position.z = Math.cos(elapsed * 1.5) * 4 + 3;

      glintLight2.position.x = Math.cos(elapsed * 1.2) * 4;
      glintLight2.position.y = Math.sin(elapsed * 1.2) * 3;

      // Zoom in if opening
      if (isOpening) {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 2.5, 0.04);
        ring1.position.x = THREE.MathUtils.lerp(ring1.position.x, -2.5, 0.03);
        ring2.position.x = THREE.MathUtils.lerp(ring2.position.x, 2.5, 0.03);
        ringGroup.rotation.y += 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      ringGeo1.dispose();
      ringGeo2.dispose();
      diamondGeo.dispose();
      goldMaterial.dispose();
      roseGoldMaterial.dispose();
      diamondMaterial.dispose();
      renderer.dispose();
    };
  }, [isOpening]);

  return (
    <div
      ref={mountRef}
      className={`relative w-64 h-64 md:w-80 md:h-80 mx-auto select-none pointer-events-none ${className}`}
    />
  );
}
