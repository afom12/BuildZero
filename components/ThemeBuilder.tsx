'use client';

import { useState } from 'react';
import { X, Palette, Save, Plus, Trash2 } from 'lucide-react';

export interface ColorPalette {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    success?: string;
    warning?: string;
    error?: string;
  };
}

interface ThemeBuilderProps {
  onSelect?: (palette: ColorPalette) => void;
  onClose: () => void;
}

const defaultPalettes: ColorPalette[] = [
  {
    id: 'default',
    name: 'Default',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  },
  {
    id: 'dark',
    name: 'Dark Theme',
    colors: {
      primary: '#60a5fa',
      secondary: '#a78bfa',
      accent: '#fbbf24',
      background: '#1f2937',
      text: '#f9fafb',
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#14b8a6',
      background: '#f0f9ff',
      text: '#0c4a6e',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#84cc16',
      background: '#f0fdf4',
      text: '#064e3b',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    colors: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#dc2626',
      background: '#fff7ed',
      text: '#7c2d12',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  },
];

export default function ThemeBuilder({ onSelect, onClose }: ThemeBuilderProps) {
  const [palettes, setPalettes] = useState<ColorPalette[]>(() => {
    const saved = localStorage.getItem('no-code-color-palettes');
    return saved ? JSON.parse(saved) : defaultPalettes;
  });
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newPalette, setNewPalette] = useState<ColorPalette>({
    id: '',
    name: '',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  });

  const savePalettes = (newPalettes: ColorPalette[]) => {
    setPalettes(newPalettes);
    localStorage.setItem('no-code-color-palettes', JSON.stringify(newPalettes));
  };

  const createPalette = () => {
    if (!newPalette.name) return;
    const palette: ColorPalette = {
      ...newPalette,
      id: `palette-${Date.now()}`,
    };
    savePalettes([...palettes, palette]);
    setNewPalette({
      id: '',
      name: '',
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1f2937',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
    });
    setShowCreate(false);
  };

  const updatePaletteColor = (paletteId: string, colorKey: string, value: string) => {
    const updated = palettes.map(p => {
      if (p.id === paletteId) {
        return {
          ...p,
          colors: {
            ...p.colors,
            [colorKey]: value,
          },
        };
      }
      return p;
    });
    savePalettes(updated);
  };

  const deletePalette = (id: string) => {
    if (confirm('Are you sure you want to delete this palette?')) {
      savePalettes(palettes.filter(p => p.id !== id));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Palette size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Theme Builder</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex">
          {/* Palette List */}
          <div className="w-64 border-r border-gray-200 p-4 overflow-y-auto">
            <button
              onClick={() => setShowCreate(true)}
              className="w-full mb-4 p-3 border-2 border-dashed border-gray-300 rounded hover:border-primary-500 flex items-center justify-center gap-2 text-gray-600"
            >
              <Plus size={18} />
              New Palette
            </button>
            <div className="space-y-2">
              {palettes.map(palette => (
                <div
                  key={palette.id}
                  onClick={() => setSelectedPalette(palette)}
                  className={`p-3 rounded cursor-pointer transition-colors ${
                    selectedPalette?.id === palette.id
                      ? 'bg-primary-50 border-2 border-primary-500'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm text-gray-800">{palette.name}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePalette(palette.id);
                      }}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="flex gap-1">
                    {Object.values(palette.colors).slice(0, 5).map((color, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Palette Editor */}
          <div className="flex-1 p-6 overflow-y-auto">
            {showCreate ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Create New Palette</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Palette Name</label>
                  <input
                    type="text"
                    value={newPalette.name}
                    onChange={(e) => setNewPalette({ ...newPalette, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="My Custom Theme"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(newPalette.colors).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key}</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) =>
                            setNewPalette({
                              ...newPalette,
                              colors: { ...newPalette.colors, [key]: e.target.value },
                            })
                          }
                          className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            setNewPalette({
                              ...newPalette,
                              colors: { ...newPalette.colors, [key]: e.target.value },
                            })
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={createPalette}
                    className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
                  >
                    Create Palette
                  </button>
                  <button
                    onClick={() => {
                      setShowCreate(false);
                      setNewPalette({
                        id: '',
                        name: '',
                        colors: {
                          primary: '#3b82f6',
                          secondary: '#8b5cf6',
                          accent: '#f59e0b',
                          background: '#ffffff',
                          text: '#1f2937',
                          success: '#10b981',
                          warning: '#f59e0b',
                          error: '#ef4444',
                        },
                      });
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : selectedPalette ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{selectedPalette.name}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedPalette.colors).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key}</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={value}
                            onChange={(e) => updatePaletteColor(selectedPalette.id, key, e.target.value)}
                            className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => updatePaletteColor(selectedPalette.id, key, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Preview</h4>
                  <div
                    className="p-6 rounded-lg border border-gray-200"
                    style={{ backgroundColor: selectedPalette.colors.background }}
                  >
                    <h4
                      className="text-2xl font-bold mb-2"
                      style={{ color: selectedPalette.colors.primary }}
                    >
                      Sample Heading
                    </h4>
                    <p className="mb-4" style={{ color: selectedPalette.colors.text }}>
                      This is a sample text to preview your color palette.
                    </p>
                    <div className="flex gap-2">
                      <button
                        className="px-4 py-2 rounded text-white"
                        style={{ backgroundColor: selectedPalette.colors.primary }}
                      >
                        Primary Button
                      </button>
                      <button
                        className="px-4 py-2 rounded text-white"
                        style={{ backgroundColor: selectedPalette.colors.secondary }}
                      >
                        Secondary Button
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelect?.(selectedPalette)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
                >
                  <Save size={18} />
                  Apply Palette
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <Palette size={64} className="mx-auto mb-4 opacity-50" />
                <p>Select a palette to edit or create a new one</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

