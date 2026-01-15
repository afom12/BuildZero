'use client';

import { useState, useEffect } from 'react';
import { X, Upload, Search, Trash2, Plus } from 'lucide-react';

export interface Font {
  id: string;
  name: string;
  family: string;
  source: 'google' | 'custom' | 'system';
  url?: string;
  weights?: string[];
  styles?: string[];
}

interface FontManagerProps {
  onSelect?: (font: Font) => void;
  onClose: () => void;
}

const googleFonts: Font[] = [
  { id: 'roboto', name: 'Roboto', family: 'Roboto', source: 'google', weights: ['300', '400', '500', '700'] },
  { id: 'open-sans', name: 'Open Sans', family: 'Open Sans', source: 'google', weights: ['300', '400', '600', '700'] },
  { id: 'lato', name: 'Lato', family: 'Lato', source: 'google', weights: ['300', '400', '700'] },
  { id: 'montserrat', name: 'Montserrat', family: 'Montserrat', source: 'google', weights: ['400', '500', '600', '700'] },
  { id: 'raleway', name: 'Raleway', family: 'Raleway', source: 'google', weights: ['300', '400', '500', '600', '700'] },
  { id: 'poppins', name: 'Poppins', family: 'Poppins', source: 'google', weights: ['300', '400', '500', '600', '700'] },
  { id: 'playfair', name: 'Playfair Display', family: 'Playfair Display', source: 'google', weights: ['400', '700'] },
  { id: 'merriweather', name: 'Merriweather', family: 'Merriweather', source: 'google', weights: ['300', '400', '700'] },
  { id: 'oswald', name: 'Oswald', family: 'Oswald', source: 'google', weights: ['300', '400', '500', '600', '700'] },
  { id: 'source-sans', name: 'Source Sans Pro', family: 'Source Sans Pro', source: 'google', weights: ['300', '400', '600', '700'] },
];

const systemFonts: Font[] = [
  { id: 'arial', name: 'Arial', family: 'Arial, sans-serif', source: 'system' },
  { id: 'helvetica', name: 'Helvetica', family: 'Helvetica, Arial, sans-serif', source: 'system' },
  { id: 'times', name: 'Times New Roman', family: 'Times New Roman, serif', source: 'system' },
  { id: 'courier', name: 'Courier New', family: 'Courier New, monospace', source: 'system' },
  { id: 'verdana', name: 'Verdana', family: 'Verdana, sans-serif', source: 'system' },
  { id: 'georgia', name: 'Georgia', family: 'Georgia, serif', source: 'system' },
];

export default function FontManager({ onSelect, onClose }: FontManagerProps) {
  const [customFonts, setCustomFonts] = useState<Font[]>(() => {
    const saved = localStorage.getItem('no-code-custom-fonts');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState<'google' | 'custom' | 'system'>('google');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [newFont, setNewFont] = useState({ name: '', url: '', family: '' });

  useEffect(() => {
    // Load Google Fonts
    const fontFamilies = googleFonts.map(f => f.family).join('|');
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamilies.replace(/\s+/g, '+')}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const saveCustomFonts = (fonts: Font[]) => {
    setCustomFonts(fonts);
    localStorage.setItem('no-code-custom-fonts', JSON.stringify(fonts));
  };

  const addCustomFont = () => {
    if (!newFont.name || !newFont.family) return;

    const font: Font = {
      id: `custom-${Date.now()}`,
      name: newFont.name,
      family: newFont.family,
      source: 'custom',
      url: newFont.url,
    };

    // Load font if URL provided
    if (newFont.url) {
      const link = document.createElement('link');
      link.href = newFont.url;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    saveCustomFonts([...customFonts, font]);
    setNewFont({ name: '', url: '', family: '' });
    setShowAddCustom(false);
  };

  const deleteCustomFont = (id: string) => {
    saveCustomFonts(customFonts.filter(f => f.id !== id));
  };

  const filteredGoogleFonts = googleFonts.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCustomFonts = customFonts.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSystemFonts = systemFonts.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Font Manager</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'google', label: 'Google Fonts' },
              { id: 'custom', label: 'Custom Fonts' },
              { id: 'system', label: 'System Fonts' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fonts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Font List */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'google' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGoogleFonts.map(font => (
                  <div
                    key={font.id}
                    onClick={() => onSelect?.(font)}
                    className="p-4 border border-gray-200 rounded hover:border-primary-500 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800" style={{ fontFamily: font.family }}>
                        {font.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: font.family }}>
                      The quick brown fox jumps over the lazy dog
                    </p>
                    {font.weights && (
                      <p className="text-xs text-gray-400 mt-2">
                        Weights: {font.weights.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'custom' && (
              <div className="space-y-4">
                <button
                  onClick={() => setShowAddCustom(true)}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded hover:border-primary-500 flex items-center justify-center gap-2 text-gray-600 hover:text-primary-500"
                >
                  <Plus size={20} />
                  Add Custom Font
                </button>

                {showAddCustom && (
                  <div className="p-4 bg-gray-50 rounded border border-gray-200 space-y-3">
                    <input
                      type="text"
                      placeholder="Font Name"
                      value={newFont.name}
                      onChange={(e) => setNewFont({ ...newFont, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Font Family (e.g., 'MyFont', sans-serif)"
                      value={newFont.family}
                      onChange={(e) => setNewFont({ ...newFont, family: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Font URL (Google Fonts, etc.)"
                      value={newFont.url}
                      onChange={(e) => setNewFont({ ...newFont, url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={addCustomFont}
                        className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
                      >
                        Add Font
                      </button>
                      <button
                        onClick={() => {
                          setShowAddCustom(false);
                          setNewFont({ name: '', url: '', family: '' });
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {filteredCustomFonts.map(font => (
                  <div
                    key={font.id}
                    className="p-4 border border-gray-200 rounded flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800" style={{ fontFamily: font.family }}>
                        {font.name}
                      </h3>
                      <p className="text-sm text-gray-500" style={{ fontFamily: font.family }}>
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                    <button
                      onClick={() => deleteCustomFont(font.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'system' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSystemFonts.map(font => (
                  <div
                    key={font.id}
                    onClick={() => onSelect?.(font)}
                    className="p-4 border border-gray-200 rounded hover:border-primary-500 cursor-pointer transition-colors"
                  >
                    <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: font.family }}>
                      {font.name}
                    </h3>
                    <p className="text-sm text-gray-500" style={{ fontFamily: font.family }}>
                      The quick brown fox jumps over the lazy dog
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

