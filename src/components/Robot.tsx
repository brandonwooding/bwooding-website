import React from 'react';

interface RobotProps {
  isAnimating: boolean;
  hasAnimated: boolean;
}

const Robot: React.FC<RobotProps> = ({ isAnimating, hasAnimated }) => {
  return (
    <div className={`robot-container ${isAnimating ? 'animate' : ''} ${hasAnimated ? 'peeked' : ''}`}>
      <svg
        width="60"
        height="60"
        viewBox="-6 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="robot-svg"
      >
        {/* Antennas (Android style) */}
        <line x1="14" y1="8" x2="10" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="8" x2="38" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

        {/* Head (rounded rectangle) */}
        <rect x="12" y="8" width="24" height="20" rx="12" fill="currentColor" className="robot-head" />

        {/* Eyes */}
        <circle cx="20" cy="16" r="2.5" fill="white" className="eye-left" style={{ transformOrigin: '20px 16px' }} />
        <circle cx="28" cy="16" r="2.5" fill="white" className="eye-right" style={{ transformOrigin: '28px 16px' }} />

        {/* Body */}
        <rect x="14" y="28" width="20" height="22" rx="3" fill="currentColor" className="robot-body" />

        {/* Left Arm (waving) */}
        <g className="robot-arm-left" style={{ transformOrigin: '9px 30px' }}>
          <rect x="6" y="30" width="6" height="14" rx="3" fill="currentColor" />
        </g>

        {/* Right Arm (static) */}
        <rect x="36" y="30" width="6" height="14" rx="3" fill="currentColor" className="robot-arm-right" />
      </svg>

      <style>{`
        .robot-container {
          position: fixed;
          bottom: 17px;
          right: 22px;
          z-index: 99;
          color: #135bec;
          pointer-events: none;
          overflow: visible;
        }

        .robot-svg {
          overflow: visible;
        }

        .robot-container:not(.peeked) {
          transform: translateY(0);
        }

        .robot-container.peeked {
          transform: translateY(-22px);
        }

        .robot-container:not(.peeked).animate {
          animation: peekInitial 3.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .robot-container.peeked.animate {
          animation: peekFromPeeked 3.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes peekInitial {
          0%, 5% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-42px);
          }
          45% {
            transform: translateY(-42px);
          }
          85% {
            transform: translateY(-42px);
          }
          100% {
            transform: translateY(-22px);
          }
        }

        @keyframes peekFromPeeked {
          0%, 5% {
            transform: translateY(-22px);
          }
          25% {
            transform: translateY(-42px);
          }
          45% {
            transform: translateY(-42px);
          }
          85% {
            transform: translateY(-42px);
          }
          100% {
            transform: translateY(-22px);
          }
        }

        .robot-container.animate .robot-arm-left {
          animation: overhandWave 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.2s 1;
        }

        @keyframes overhandWave {
          0%, 10% {
            transform: rotate(0deg);
          }
          35% {
            transform: rotate(140deg);
          }
          65% {
            transform: rotate(100deg);
          }
          85% {
            transform: rotate(140deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        .robot-container.animate .eye-left,
        .robot-container.animate .eye-right {
          animation: eyeBlink 0.15s ease-in-out 0.8s 1;
        }

        .robot-container.peeked:not(.animate) .eye-left,
        .robot-container.peeked:not(.animate) .eye-right {
          animation: idleBlink 5s ease-in-out infinite;
        }

        @keyframes eyeBlink {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.05);
          }
        }

        @keyframes idleBlink {
          0%, 96%, 100% {
            transform: scaleY(1);
          }
          98% {
            transform: scaleY(0.05);
          }
        }
      `}</style>
    </div>
  );
};

export default Robot;
