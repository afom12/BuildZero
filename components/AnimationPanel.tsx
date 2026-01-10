'use client';

import { Component, AnimationType, AnimationTrigger } from '@/types';
import { X } from 'lucide-react';

interface AnimationPanelProps {
  component: Component | null;
  onUpdate: (animation: Component['animation']) => void;
  onClose: () => void;
}

export default function AnimationPanel({
  component,
  onUpdate,
  onClose,
}: AnimationPanelProps) {
  if (!component) return null;

  const animations: { value: AnimationType; label: string }[] = [
    { value: 'none', label: 'None' },
    { value: 'fadeIn', label: 'Fade In' },
    { value: 'fadeOut', label: 'Fade Out' },
    { value: 'slideInLeft', label: 'Slide In Left' },
    { value: 'slideInRight', label: 'Slide In Right' },
    { value: 'slideInUp', label: 'Slide In Up' },
    { value: 'slideInDown', label: 'Slide In Down' },
    { value: 'zoomIn', label: 'Zoom In' },
    { value: 'zoomOut', label: 'Zoom Out' },
    { value: 'bounce', label: 'Bounce' },
    { value: 'rotate', label: 'Rotate' },
    { value: 'pulse', label: 'Pulse' },
    { value: 'shake', label: 'Shake' },
  ];

  const triggers: { value: AnimationTrigger; label: string }[] = [
    { value: 'onLoad', label: 'On Load' },
    { value: 'onHover', label: 'On Hover' },
    { value: 'onClick', label: 'On Click' },
    { value: 'onScroll', label: 'On Scroll' },
  ];

  const handleChange = (field: keyof Component['animation'], value: any) => {
    onUpdate({
      ...component.animation,
      [field]: value,
    });
  };

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Animations</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Animation Type
          </label>
          <select
            value={component.animation?.type || 'none'}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {animations.map((anim) => (
              <option key={anim.value} value={anim.value}>
                {anim.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trigger
          </label>
          <select
            value={component.animation?.trigger || 'onLoad'}
            onChange={(e) => handleChange('trigger', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {triggers.map((trigger) => (
              <option key={trigger.value} value={trigger.value}>
                {trigger.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration (seconds)
          </label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            max="10"
            value={parseFloat(component.animation?.duration || '1s') || 1}
            onChange={(e) => handleChange('duration', `${e.target.value}s`)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delay (seconds)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={parseFloat(component.animation?.delay || '0s') || 0}
            onChange={(e) => handleChange('delay', `${e.target.value}s`)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Easing
          </label>
          <select
            value={component.animation?.easing || 'ease'}
            onChange={(e) => handleChange('easing', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="ease">Ease</option>
            <option value="ease-in">Ease In</option>
            <option value="ease-out">Ease Out</option>
            <option value="ease-in-out">Ease In Out</option>
            <option value="linear">Linear</option>
            <option value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">Bounce</option>
          </select>
        </div>
      </div>
    </div>
  );
}

