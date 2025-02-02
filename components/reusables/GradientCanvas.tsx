import { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';

const GradientCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const noise3D = createNoise3D();
  let time = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const clamp = (value: number, min: number, max: number) => {
      return Math.min(Math.max(value, min), max);
    };

    const drawGradient = () => {
      if (!ctx || !canvas) return;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create diagonal gradient
      const gradient = ctx.createLinearGradient(
        0, canvas.height,  // Start from bottom left
        canvas.width, 0    // To top right
      );

      // Add color stops with noise - now clamped between 0 and 1
      const noiseScale = 0.2; // Reduced scale to prevent extreme values
      const noiseOffset1 = clamp(0.0 + noise3D(time * 0.1, 0, 0) * noiseScale, 0, 0.2);
      const noiseOffset2 = clamp(0.25 + noise3D(time * 0.1, 1, 0) * noiseScale, 0.2, 0.4);
      const noiseOffset3 = clamp(0.5 + noise3D(time * 0.1, 2, 0) * noiseScale, 0.4, 0.7);
      const noiseOffset4 = clamp(0.75 + noise3D(time * 0.1, 3, 0) * noiseScale, 0.7, 1.0);

      gradient.addColorStop(noiseOffset1, '#a960ee');
      gradient.addColorStop(noiseOffset2, '#ff333d');
      gradient.addColorStop(noiseOffset3, '#90e0ff');
      gradient.addColorStop(noiseOffset4, '#ffcb57');

      // Create a path for the diagonal half
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);          // Bottom left
      ctx.lineTo(canvas.width, 0);           // Top right
      ctx.lineTo(canvas.width, canvas.height); // Bottom right
      ctx.lineTo(0, canvas.height);          // Back to bottom left
      ctx.closePath();

      // Fill with gradient
      ctx.fillStyle = gradient;
      ctx.fill();

      // Update time for animation
      time += 0.001;
    };

    const animate = () => {
      drawGradient();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{
        zIndex: -1,
        opacity: 0.8,
        pointerEvents: 'none'
      }}
    />
  );
};

export default GradientCanvas;