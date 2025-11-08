"use client";
import { useState, useRef, useEffect } from "react";

export function useSwipeGesture() {
  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const [direction, setDirection] = useState(null);

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEnd.current = e.changedTouches[0].clientX;
    detectSwipe();
  };

  const detectSwipe = () => {
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setDirection("left");
      setTimeout(() => setDirection(null), 300);
    }
    if (isRightSwipe) {
      setDirection("right");
      setTimeout(() => setDirection(null), 300);
    }
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    direction,
  };
}
