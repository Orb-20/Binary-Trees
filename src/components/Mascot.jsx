// src/components/Mascot.jsx
import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../animations/sapling-lottie.json";
import BranchSVG from "../assets/branch.svg";

export default function Mascot({ state }) {
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const eventListeners = useRef([]);

  const getMarker = (name) => {
    const markers = animationData.markers || [];
    return markers.find(m => m.cm === name);
  };

  const playSegment = (startMarkerName, endMarkerName, loop = false) => {
    if (!animRef.current) return;
    const start = getMarker(startMarkerName);
    const end = getMarker(endMarkerName);

    if (start && end) {
      animRef.current.setLoop(loop);
      animRef.current.playSegments([start.tm, end.tm], true);
    } else {
      const ranges = { idle: [0, 90], correct: [91, 161], wrong: [162, 232] };
      const range = ranges[startMarkerName.replace('_start', '')] || ranges.idle;
      animRef.current.setLoop(loop);
      animRef.current.playSegments(range, true);
    }
  };

  useEffect(() => {
    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet'
      }
    });

    playSegment('idle_start', 'idle_end', true);

    return () => {
      eventListeners.current.forEach(remove => remove());
      animRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!animRef.current) return;

    eventListeners.current.forEach(remove => remove());
    eventListeners.current = [];

    const returnToIdle = () => {
      playSegment('idle_start', 'idle_end', true);
    };

    if (state === 'correct') {
      playSegment('correct_start', 'correct_end');
      const remove = animRef.current.addEventListener('complete', returnToIdle);
      eventListeners.current.push(() => animRef.current.removeEventListener('complete', returnToIdle));
    } else if (state === 'wrong') {
      playSegment('wrong_start', 'wrong_end');
      const remove = animRef.current.addEventListener('complete', returnToIdle);
      eventListeners.current.push(() => animRef.current.removeEventListener('complete', returnToIdle));
    } else {
      playSegment('idle_start', 'idle_end', true);
    }
  }, [state]);

  return (
    <div style={{ position: 'relative', width: 220, height: 220, pointerEvents: 'none', zIndex: 10 }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
        <img src={BranchSVG} alt="branch" style={{ width: 240, height: 'auto' }} />
      </div>
      <div style={{
        position: 'absolute',
        top: 28,
        left: '50%',
        width: 2,
        height: 44,
        background: '#8B5E3C',
        transform: 'translateX(-50%)',
        transformOrigin: 'top center',
        animation: state === 'idle' ? 'swing 3s ease-in-out infinite' : 'none'
      }} />
      <div ref={containerRef} style={{
        position: 'absolute',
        top: 70,
        left: '50%',
        width: 150,
        height: 150,
        transform: 'translateX(-50%)'
      }} />
      <style>{`
        @keyframes swing {
          0% { transform: translateX(-50%) rotate(-5deg); }
          50% { transform: translateX(-50%) rotate(5deg); }
          100% { transform: translateX(-50%) rotate(-5deg); }
        }
      `}</style>
    </div>
  );
}