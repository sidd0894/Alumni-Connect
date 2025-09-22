"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxWrapper({ children, speed = 0.5, className }: ParallaxWrapperProps) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      style={{
        transform: `translateY(${offset}px)`,
      }}
    >
      {children}
    </div>
  );
}
