import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, Zap } from "lucide-react";
import { useAuctionTimer } from "@/hooks/useAuctionTimer";
import { cn } from "@/lib/utils";

interface AuctionTimerProps {
  endTime: string;
  className?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function AuctionTimer({ 
  endTime, 
  className, 
  showIcon = true, 
  size = 'md' 
}: AuctionTimerProps) {
  const { timeRemaining, formatTimeRemaining, getTimerVariant } = useAuctionTimer(endTime);
  
  const variant = getTimerVariant(timeRemaining);
  const displayText = formatTimeRemaining(timeRemaining);

  const getIcon = () => {
    if (timeRemaining.isExpired) return null;
    if (timeRemaining.isCritical) return AlertTriangle;
    if (timeRemaining.isEndingSoon) return Zap;
    return Clock;
  };

  const Icon = getIcon();

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <Badge
      variant={variant}
      className={cn(
        "font-mono font-medium flex items-center gap-1.5 transition-all duration-300",
        sizeClasses[size],
        timeRemaining.isCritical && "animate-pulse-bid",
        timeRemaining.isEndingSoon && !timeRemaining.isCritical && "animate-countdown",
        className
      )}
    >
      {showIcon && Icon && (
        <Icon className={cn(iconSizes[size], "flex-shrink-0")} />
      )}
      <span className="whitespace-nowrap">{displayText}</span>
    </Badge>
  );
}

interface CountdownDisplayProps {
  endTime: string;
  className?: string;
}

export function CountdownDisplay({ endTime, className }: CountdownDisplayProps) {
  const { timeRemaining } = useAuctionTimer(endTime);

  if (timeRemaining.isExpired) {
    return (
      <div className={cn("text-center", className)}>
        <div className="text-2xl font-bold text-destructive mb-2">
          Auction Ended
        </div>
        <p className="text-muted-foreground">This auction has concluded</p>
      </div>
    );
  }

  return (
    <div className={cn("text-center", className)}>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-card rounded-lg p-3 border shadow-sm">
          <div className={cn(
            "text-2xl font-bold",
            timeRemaining.isCritical ? "text-destructive" : 
            timeRemaining.isEndingSoon ? "text-warning" : "text-primary"
          )}>
            {timeRemaining.days.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            Days
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-3 border shadow-sm">
          <div className={cn(
            "text-2xl font-bold",
            timeRemaining.isCritical ? "text-destructive" : 
            timeRemaining.isEndingSoon ? "text-warning" : "text-primary"
          )}>
            {timeRemaining.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            Hours
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-3 border shadow-sm">
          <div className={cn(
            "text-2xl font-bold",
            timeRemaining.isCritical ? "text-destructive" : 
            timeRemaining.isEndingSoon ? "text-warning" : "text-primary"
          )}>
            {timeRemaining.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            Minutes
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-3 border shadow-sm">
          <div className={cn(
            "text-2xl font-bold transition-all duration-300",
            timeRemaining.isCritical ? "text-destructive animate-pulse" : 
            timeRemaining.isEndingSoon ? "text-warning" : "text-primary"
          )}>
            {timeRemaining.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            Seconds
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <AuctionTimer endTime={endTime} size="lg" />
      </div>
    </div>
  );
}