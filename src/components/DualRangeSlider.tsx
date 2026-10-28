import { useRef, useState, useCallback } from 'react';

type Props = {
  min: number;
  max: number;
  step: number;
  valueMin: number;
  valueMax: number;
  onChangeMin: (v: number) => void;
  onChangeMax: (v: number) => void;
};

export default function DualRangeSlider({ min, max, step, valueMin, valueMax, onChangeMin, onChangeMax }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<'min' | 'max' | null>(null);

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  const valueFromX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return min;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const raw = min + ratio * (max - min);
    return Math.round(raw / step) * step;
  }, [min, max, step]);

  const onPointerDown = (which: 'min' | 'max') => (e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(which);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const v = valueFromX(e.clientX);
    if (dragging === 'min') {
      onChangeMin(Math.min(v, valueMax - step));
    } else {
      onChangeMax(Math.max(v, valueMin + step));
    }
  };

  const onPointerUp = () => setDragging(null);

  const leftPct = pct(valueMin);
  const rightPct = pct(valueMax);

  return (
    <div className="relative h-8 select-none" onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerLeave={onPointerUp}>
      <div ref={trackRef} className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 bg-[#3A2A1F] rounded-full" />
      <div
        className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-[#D28A4C] rounded-full"
        style={{ left: `${leftPct}%`, width: `${rightPct - leftPct}%` }}
      />
      {/* Min thumb */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#D28A4C] rounded-full border-2 border-[#140D0A] cursor-grab shadow"
        style={{ left: `${leftPct}%` }}
        onPointerDown={onPointerDown('min')}
      />
      {/* Max thumb */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#D28A4C] rounded-full border-2 border-[#140D0A] cursor-grab shadow"
        style={{ left: `${rightPct}%` }}
        onPointerDown={onPointerDown('max')}
      />
    </div>
  );
}