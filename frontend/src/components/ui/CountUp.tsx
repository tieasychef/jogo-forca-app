import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface CountUpProps {
  value: number;
  className?: string;
}

export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 24, stiffness: 90 });
  const emVisao = useInView(ref, { once: true, margin: '-10px' });

  useEffect(() => {
    if (emVisao) motionValue.set(value);
  }, [emVisao, motionValue, value]);

  useEffect(() => {
    return spring.on('change', (atual) => {
      if (ref.current) ref.current.textContent = Math.round(atual).toString();
    });
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
