import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 40, color = '#fff' }) => {
  const dotSize = size / 5;
  const radius = size / 3;

  // Define the three positions relative to the center.
  const topPos = { x: 0, y: -radius };
  const bottomRightPos = { x: radius, y: radius };
  const bottomLeftPos = { x: -radius, y: radius };

  // Base positions in clockwise order.
  const basePositions = [topPos, bottomRightPos, bottomLeftPos];

  // Cycle state to determine which configuration to show.
  // When cycle === 0:
  //   Dot 0 → top, Dot 1 → bottomRight, Dot 2 → bottomLeft.
  // When cycle === 1:
  //   Dot 0 → bottomRight, Dot 1 → bottomLeft, Dot 2 → top.
  // When cycle === 2:
  //   Dot 0 → bottomLeft, Dot 1 → top, Dot 2 → bottomRight.
  const [cycle, setCycle] = useState(0);

  // Define timing: 0.2s for the jump and 0.8s dwell time.
  const jumpTime = 0.2; // seconds for transition (jump)
  const dwellTime = 0.8; // seconds to hold position
  const totalCycleTime = jumpTime + dwellTime; // 1 second per full cycle

  useEffect(() => {
    const interval = setInterval(() => {
      setCycle((prevCycle) => (prevCycle + 1) % 3);
    }, totalCycleTime * 1000);
    return () => clearInterval(interval);
  }, [totalCycleTime]);

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {[0, 1, 2].map((i) => {
        // Determine each dot's target position.
        // The (i + cycle) mod 3 gives the desired rotation of positions.
        const pos = basePositions[(i + cycle) % 3];

        return (
          <motion.div
            key={i}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ duration: jumpTime, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: dotSize,
              height: dotSize,
              borderRadius: '50%',
              backgroundColor: color,
              top: '50%',
              left: '50%',
              marginLeft: -dotSize / 2,
              marginTop: -dotSize / 2,
            }}
          />
        );
      })}
    </div>
  );
};

export default Spinner;
