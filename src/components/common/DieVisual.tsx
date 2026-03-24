interface DieVisualProps {
  value: number;
  animate?: boolean;
}

/**
 * Visual representation of a six-sided die showing a value.
 * 56x56px with inset shadow for physical dice feel.
 */
export function DieVisual({ value, animate = false }: DieVisualProps) {
  return (
    <div
      className={`w-14 h-14 bg-gradient-to-br from-red-800 to-red-950 rounded-small shadow-lg flex items-center justify-center relative border-2 border-red-950 ${
        animate ? 'animate-tumble' : ''
      }`}
      style={{
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.2)',
      }}
    >
      <span className="text-white text-3xl font-bold drop-shadow-md">{value}</span>
    </div>
  );
}
