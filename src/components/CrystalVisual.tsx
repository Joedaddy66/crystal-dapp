import { useEffect, useRef } from 'react';

interface CrystalVisualProps {
  seed: number;
  size?: number;
}

export default function CrystalVisual({ seed, size = 200 }: CrystalVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, size, size);

    // Seeded random number generator
    let rng = seed;
    const random = () => {
      rng = (rng * 9301 + 49297) % 233280;
      return rng / 233280;
    };

    // Crystal parameters based on seed
    const centerX = size / 2;
    const centerY = size / 2;
    const numBranches = 3 + Math.floor(random() * 9); // 3-11 branches
    const layers = 3 + Math.floor(random() * 5); // 3-7 layers
    const baseHue = random() * 360;
    const symmetry = random() > 0.5;

    // Draw crystal from center outward
    for (let layer = layers; layer > 0; layer--) {
      const radius = (size * 0.4 * layer) / layers;
      const points = numBranches * (symmetry ? 2 : 1);

      ctx.beginPath();

      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const variance = random() * 0.3 + 0.85; // 0.85-1.15 variance
        const r = radius * variance;

        // Add some wobble to branches
        const wobble = Math.sin(angle * numBranches) * random() * 10;

        const x = centerX + Math.cos(angle) * r + wobble;
        const y = centerY + Math.sin(angle) * r + wobble;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();

      // Color based on layer and seed
      const hue = (baseHue + layer * 30) % 360;
      const saturation = 60 + random() * 40;
      const lightness = 30 + (layer / layers) * 40;
      const alpha = 0.3 + (layer / layers) * 0.5;

      ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
      ctx.lineWidth = 2 + layer * 0.5;
      ctx.stroke();

      ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.3})`;
      ctx.fill();
    }

    // Add sparkle points
    const sparkles = 5 + Math.floor(random() * 15);
    for (let i = 0; i < sparkles; i++) {
      const angle = random() * Math.PI * 2;
      const distance = random() * size * 0.4;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      const sparkleSize = 1 + random() * 3;

      ctx.fillStyle = `hsla(${baseHue}, 100%, 80%, ${0.6 + random() * 0.4})`;
      ctx.beginPath();
      ctx.arc(x, y, sparkleSize, 0, Math.PI * 2);
      ctx.fill();
    }

  }, [seed, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{
        border: '2px solid #0f0',
        borderRadius: '8px',
        background: '#111'
      }}
    />
  );
}
