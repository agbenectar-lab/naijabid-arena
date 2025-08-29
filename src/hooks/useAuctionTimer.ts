import { useState, useEffect, useCallback } from 'react';

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  isExpired: boolean;
  isEndingSoon: boolean; // Less than 1 hour remaining
  isCritical: boolean;   // Less than 5 minutes remaining
}

export function useAuctionTimer(endTime: string) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
    isExpired: false,
    isEndingSoon: false,
    isCritical: false
  });

  const calculateTimeRemaining = useCallback((targetTime: string): TimeRemaining => {
    const now = new Date().getTime();
    const target = new Date(targetTime).getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
        isExpired: true,
        isEndingSoon: false,
        isCritical: false
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const totalHours = days * 24 + hours;
    const totalMinutes = totalHours * 60 + minutes;

    return {
      days,
      hours,
      minutes,
      seconds,
      total: difference,
      isExpired: false,
      isEndingSoon: totalHours < 1, // Less than 1 hour
      isCritical: totalMinutes < 5   // Less than 5 minutes
    };
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      setTimeRemaining(calculateTimeRemaining(endTime));
    };

    // Update immediately
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endTime, calculateTimeRemaining]);

  const formatTimeRemaining = useCallback((time: TimeRemaining): string => {
    if (time.isExpired) return 'Auction Ended';
    
    if (time.days > 0) {
      return `${time.days}d ${time.hours}h ${time.minutes}m`;
    } else if (time.hours > 0) {
      return `${time.hours}h ${time.minutes}m ${time.seconds}s`;
    } else {
      return `${time.minutes}m ${time.seconds}s`;
    }
  }, []);

  const getTimerVariant = useCallback((time: TimeRemaining): 'default' | 'warning' | 'destructive' => {
    if (time.isExpired) return 'destructive';
    if (time.isCritical) return 'destructive';
    if (time.isEndingSoon) return 'warning';
    return 'default';
  }, []);

  return {
    timeRemaining,
    formatTimeRemaining,
    getTimerVariant,
    isExpired: timeRemaining.isExpired,
    isEndingSoon: timeRemaining.isEndingSoon,
    isCritical: timeRemaining.isCritical
  };
}