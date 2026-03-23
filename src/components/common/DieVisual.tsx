interface DieVisualProps {
  value: number;
}

/**
 * Visual representation of a six-sided die showing a value.
 */
export function DieVisual({ value }: DieVisualProps) {
  return (
    <div className="w-12 h-12 bg-red-900 rounded-lg shadow-inner flex items-center justify-center relative border-2 border-red-950">
      <span className="text-white text-2xl font-bold">{value}</span>
      <div className="absolute inset-0 bg-white/5 rounded-md"></div>
    </div>
  );
}
