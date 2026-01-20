import React from 'react';

interface RobotProps {
  isAnimating: boolean;
}

const Robot: React.FC<RobotProps> = ({ isAnimating }) => {
  return (
    <div className={`robot-container ${isAnimating ? 'animate' : ''}`}>
      <svg
        width="80"
        height="100"
        viewBox="0 0 80 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="robot-svg"
      >
        {/* Antenna */}
        <line x1="40" y1="5" x2="40" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="40" cy="3" r="3" fill="currentColor" className="antenna-tip" />

        {/* Head */}
        <rect x="25" y="15" width="30" height="28" rx="6" fill="currentColor" className="robot-head" />

        {/* Eyes */}
        <circle cx="33" cy="27" r="3" fill="white" className="eye-left" />
        <circle cx="47" cy="27" r="3" fill="white" className="eye-right" />

        {/* Mouth */}
        <line x1="32" y1="36" x2="48" y2="36" stroke="white" strokeWidth="2" strokeLinecap="round" />

        {/* Body */}
        <rect x="22" y="43" width="36" height="35" rx="8" fill="currentColor" className="robot-body" />

        {/* Body details */}
        <circle cx="40" cy="55" r="4" fill="white" opacity="0.3" />
        <rect x="32" y="65" width="4" height="8" rx="2" fill="white" opacity="0.3" />
        <rect x="44" y="65" width="4" height="8" rx="2" fill="white" opacity="0.3" />

        {/* Left Arm (static) */}
        <rect x="12" y="48" width="10" height="18" rx="5" fill="currentColor" className="robot-arm-left" />

        {/* Right Arm (waving) */}
        <g className="robot-arm-right">
          <rect x="58" y="48" width="10" height="18" rx="5" fill="currentColor" />
        </g>

        {/* Legs */}
        <rect x="28" y="78" width="8" height="18" rx="4" fill="currentColor" className="robot-leg-left" />
        <rect x="44" y="78" width="8" height="18" rx="4" fill="currentColor" className="robot-leg-right" />
      </svg>

      <style>{`
        .robot-container {
          position: absolute;
          bottom: -100px;
          right: 8px;
          z-index: 99;
          color: #111318;
          transition: bottom 0.5s ease-out;
        }

        .dark .robot-container {
          color: white;
        }

        .robot-container.animate {
          animation: peekAndWave 4s ease-in-out;
        }

        @keyframes peekAndWave {
          0% {
            bottom: -100px;
          }
          15% {
            bottom: 65px;
          }
          25%, 35%, 45% {
            bottom: 65px;
          }
          85% {
            bottom: 65px;
          }
          100% {
            bottom: -100px;
          }
        }

        .robot-container.animate .robot-arm-right {
          animation: wave 0.5s ease-in-out 1.5s 3;
          transform-origin: 63px 48px;
        }

        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-25deg);
          }
        }

        .robot-container.animate .antenna-tip {
          animation: blink 0.3s ease-in-out 1.2s 4;
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        .robot-container.animate .eye-left,
        .robot-container.animate .eye-right {
          animation: eyeBlink 0.2s ease-in-out 2s 2;
        }

        @keyframes eyeBlink {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.1);
          }
        }
      `}</style>
    </div>
  );
};

export default Robot;
