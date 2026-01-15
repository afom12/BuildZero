'use client';

import { useState, useEffect, useRef } from 'react';
import { Component } from '@/types';
import { Grid, Ruler, Move, X } from 'lucide-react';

interface AlignmentGuidesProps {
  components: Component[];
  selectedComponent: Component | null;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onClose: () => void;
}

export default function AlignmentGuides({ components, selectedComponent, enabled, onToggle, onClose }: AlignmentGuidesProps) {
  const [gridSize, setGridSize] = useState(10);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [showGuides, setShowGuides] = useState(true);
  const [smartGuides, setSmartGuides] = useState(true);

  useEffect(() => {
    if (enabled && snapToGrid) {
      // Apply grid snapping styles
      document.documentElement.style.setProperty('--grid-size', `${gridSize}px`);
      document.body.classList.add('snap-to-grid');
    } else {
      document.body.classList.remove('snap-to-grid');
    }
  }, [enabled, snapToGrid, gridSize]);

  return (
    <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Ruler size={20} />
          <h3 className="font-semibold text-gray-800">Alignment & Grid</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-700">Enable Guides</label>
          <button
            onClick={() => onToggle(!enabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              enabled ? 'bg-primary-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                enabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {enabled && (
          <>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Snap to Grid</label>
              <button
                onClick={() => setSnapToGrid(!snapToGrid)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  snapToGrid ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    snapToGrid ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Show Grid</label>
              <button
                onClick={() => setShowGuides(!showGuides)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  showGuides ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    showGuides ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Smart Guides</label>
              <button
                onClick={() => setSmartGuides(!smartGuides)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  smartGuides ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    smartGuides ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {snapToGrid && (
              <div>
                <label className="block text-sm text-gray-700 mb-2">Grid Size: {gridSize}px</label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={gridSize}
                  onChange={(e) => setGridSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
          </>
        )}
      </div>

      {enabled && showGuides && (
        <div
          className="fixed inset-0 pointer-events-none z-40"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`,
            backgroundSize: `${gridSize}px ${gridSize}px`,
          }}
        />
      )}
    </div>
  );
}

