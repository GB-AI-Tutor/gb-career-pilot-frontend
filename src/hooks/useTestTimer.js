import { useState, useEffect, useCallback, useRef } from "react";

export const useTestTimer = (deadlineMs, onExpire) => {
  // Helper to calculate remaining time
  const getRemaining = useCallback(() => {
    if (!deadlineMs) return 0;
    const remaining = deadlineMs - Date.now();
    return Math.max(0, remaining);
  }, [deadlineMs]);

  // FIX 1: Lazy state initialization (Prevents cascading render)
  const [timeRemaining, setTimeRemaining] = useState(() => getRemaining());
  const [isExpired, setIsExpired] = useState(timeRemaining === 0);

  const onExpireRef = useRef(onExpire);
  const hasExpiredRef = useRef(false);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  // Update timer every second
  useEffect(() => {
    if (!deadlineMs || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      const newRemaining = getRemaining();
      setTimeRemaining(newRemaining);

      if (newRemaining <= 0 && !hasExpiredRef.current) {
        setIsExpired(true);
        hasExpiredRef.current = true;
        if (onExpireRef.current) {
          onExpireRef.current();
        }
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadlineMs, getRemaining, timeRemaining]);

  // Format time logic remains the same but simplified in return
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return {
    timeRemaining,
    isExpired,
    formattedTime: formatTime(timeRemaining),
  };
};
