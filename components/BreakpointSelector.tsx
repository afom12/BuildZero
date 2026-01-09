'use client';

import { Breakpoint } from '@/types';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

interface BreakpointSelectorProps {
  currentBreakpoint: Breakpoint;
  onBreakpointChange: (breakpoint: Breakpoint) => void;
}

export default function BreakpointSelector({
  currentBreakpoint,
  onBreakpointChange,
}: BreakpointSelectorProps) {
  const breakpoints: { value: Breakpoint; label: string; icon: React.ReactNode }[] = [
    { value: 'mobile', label: 'Mobile', icon: <Smartphone size={18} /> },
    { value: 'tablet', label: 'Tablet', icon: <Tablet size={18} /> },
    { value: 'desktop', label: 'Desktop', icon: <Monitor size={18} /> },
  ];

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {breakpoints.map((bp) => (
        <button
          key={bp.value}
          onClick={() => onBreakpointChange(bp.value)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
            currentBreakpoint === bp.value
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          title={bp.label}
        >
          {bp.icon}
          <span className="text-sm font-medium">{bp.label}</span>
        </button>
      ))}
    </div>
  );
}

