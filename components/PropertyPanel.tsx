'use client';

import { Component } from '@/types';
import { X, Code } from 'lucide-react';
import AnimationPanel from './AnimationPanel';

interface PropertyPanelProps {
  selectedComponent: Component | null;
  onUpdate: (updates: Partial<Component>) => void;
  onClose: () => void;
  onDelete: () => void;
}

export default function PropertyPanel({
  selectedComponent,
  onUpdate,
  onClose,
  onDelete,
}: PropertyPanelProps) {
  if (!selectedComponent) {
    return (
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
        <p className="text-gray-400 text-sm text-center mt-8">
          Select a component to edit its properties
        </p>
      </div>
    );
  }

  const handlePropChange = (key: string, value: any) => {
    onUpdate({
      props: {
        ...selectedComponent.props,
        [key]: value,
      },
    });
  };

  const handleStyleChange = (key: string, value: string) => {
    onUpdate({
      style: {
        ...selectedComponent.style,
        [key]: value,
      },
    });
  };

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Properties
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Component Type
          </label>
          <div className="px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-600">
            {selectedComponent.type}
          </div>
        </div>

        {/* Text content */}
        {(selectedComponent.type === 'text' ||
          selectedComponent.type === 'heading' ||
          selectedComponent.type === 'button') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text
            </label>
            <input
              type="text"
              value={selectedComponent.props.text || ''}
              onChange={(e) => handlePropChange('text', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        )}

        {/* Image properties */}
        {selectedComponent.type === 'image' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={selectedComponent.props.src || ''}
                  onChange={(e) => handlePropChange('src', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={() => {
                    // This will be handled by parent component
                    if ((window as any).openMediaLibrary) {
                      (window as any).openMediaLibrary();
                    }
                  }}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                  title="Open Media Library"
                >
                  📁
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alt Text
              </label>
              <input
                type="text"
                value={selectedComponent.props.alt || ''}
                onChange={(e) => handlePropChange('alt', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </>
        )}

        {/* Form Builder */}
        {selectedComponent.type === 'form' && (
          <div>
            <button
              onClick={() => {
                if ((window as any).openFormBuilder) {
                  (window as any).openFormBuilder(selectedComponent);
                }
              }}
              className="w-full px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors text-sm"
            >
              Open Form Builder
            </button>
          </div>
        )}

        {/* Custom JavaScript */}
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={() => {
              if ((window as any).openCodeEditor) {
                (window as any).openCodeEditor(selectedComponent);
              }
            }}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm flex items-center justify-center gap-2"
          >
            <Code size={16} />
            Custom JavaScript
          </button>
        </div>

        {/* Input properties */}
        {selectedComponent.type === 'input' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label
              </label>
              <input
                type="text"
                value={selectedComponent.props.label || ''}
                onChange={(e) => handlePropChange('label', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Placeholder
              </label>
              <input
                type="text"
                value={selectedComponent.props.placeholder || ''}
                onChange={(e) => handlePropChange('placeholder', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={selectedComponent.props.type || 'text'}
                onChange={(e) => handlePropChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="password">Password</option>
                <option value="number">Number</option>
              </select>
            </div>
          </>
        )}

        {/* Textarea properties */}
        {selectedComponent.type === 'textarea' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label
              </label>
              <input
                type="text"
                value={selectedComponent.props.label || ''}
                onChange={(e) => handlePropChange('label', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Placeholder
              </label>
              <input
                type="text"
                value={selectedComponent.props.placeholder || ''}
                onChange={(e) => handlePropChange('placeholder', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </>
        )}

        {/* Link properties */}
        {selectedComponent.type === 'link' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link Text
              </label>
              <input
                type="text"
                value={selectedComponent.props.text || ''}
                onChange={(e) => handlePropChange('text', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL (href)
              </label>
              <input
                type="text"
                value={selectedComponent.props.href || ''}
                onChange={(e) => handlePropChange('href', e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </>
        )}

        {/* Style properties */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Styles</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background Color
              </label>
              <input
                type="color"
                value={selectedComponent.style?.backgroundColor || '#ffffff'}
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text Color
              </label>
              <input
                type="color"
                value={selectedComponent.style?.color || '#000000'}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Padding (px)
              </label>
              <input
                type="number"
                value={parseInt(selectedComponent.style?.padding as string) || 0}
                onChange={(e) => handleStyleChange('padding', `${e.target.value}px`)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Margin (px)
              </label>
              <input
                type="number"
                value={parseInt(selectedComponent.style?.margin as string) || 0}
                onChange={(e) => handleStyleChange('margin', `${e.target.value}px`)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Animations */}
        <AnimationPanel
          component={selectedComponent}
          onUpdate={(animation) => onUpdate({ animation })}
          onClose={() => {}}
        />

        {/* Delete button */}
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={onDelete}
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Delete Component
          </button>
        </div>
      </div>
    </div>
  );
}

