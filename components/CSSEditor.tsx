'use client';

import { useState } from 'react';
import { Component } from '@/types';
import { Code, X } from 'lucide-react';

interface CSSEditorProps {
  component: Component | null;
  onUpdate: (css: string) => void;
  onClose: () => void;
}

export default function CSSEditor({ component, onUpdate, onClose }: CSSEditorProps) {
  const [css, setCss] = useState(() => {
    if (!component?.style) return '';
    return Object.entries(component.style)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `  ${cssKey}: ${value};`;
      })
      .join('\n');
  });

  const handleApply = () => {
    // Parse CSS string to style object
    const styleObj: React.CSSProperties = {};
    const lines = css.split('\n');
    
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && trimmed.includes(':')) {
        const [key, ...valueParts] = trimmed.split(':');
        const value = valueParts.join(':').trim().replace(/;$/, '');
        const camelKey = key.trim().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        (styleObj as any)[camelKey] = value;
      }
    });

    onUpdate(css);
  };

  if (!component) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Code size={20} />
            <h2 className="text-lg font-semibold text-gray-800">Custom CSS Editor</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 p-4 overflow-auto">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CSS Styles for {component.type}
            </label>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              className="w-full h-64 p-3 font-mono text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter CSS properties, e.g:&#10;  color: #333;&#10;  padding: 20px;&#10;  margin: 10px;"
            />
          </div>
          <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
            <p className="font-semibold mb-1">Tip:</p>
            <p>Enter CSS properties in the format: property: value;</p>
            <p>Example: padding: 20px; background-color: #f0f0f0;</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
          >
            Apply CSS
          </button>
        </div>
      </div>
    </div>
  );
}

