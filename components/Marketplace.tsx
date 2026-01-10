'use client';

import { useState } from 'react';
import { ComponentMarketplaceItem, Component } from '@/types';
import { Search, Star, Download, Upload, X } from 'lucide-react';

interface MarketplaceProps {
  onClose: () => void;
  onImport: (component: Component) => void;
  onExport: (component: Component) => void;
}

export default function Marketplace({ onClose, onImport, onExport }: MarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUpload, setShowUpload] = useState(false);

  // Mock marketplace data - in real app, this would come from an API
  const [marketplaceItems] = useState<ComponentMarketplaceItem[]>([
    {
      id: '1',
      name: 'Modern Hero Section',
      description: 'A beautiful hero section with gradient background',
      author: 'DesignPro',
      category: 'Sections',
      tags: ['hero', 'gradient', 'modern'],
      downloads: 1234,
      rating: 4.8,
      createdAt: '2024-01-15',
      component: {
        id: 'marketplace-1',
        type: 'section',
        props: {},
        style: {
          padding: '80px 20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          textAlign: 'center',
          color: '#ffffff',
        },
        children: [],
      },
    },
    {
      id: '2',
      name: 'Pricing Card',
      description: 'Professional pricing card component',
      author: 'UIExpert',
      category: 'Cards',
      tags: ['pricing', 'card', 'business'],
      downloads: 856,
      rating: 4.6,
      createdAt: '2024-01-20',
      component: {
        id: 'marketplace-2',
        type: 'card',
        props: {},
        style: {
          padding: '32px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
        children: [],
      },
    },
  ]);

  const categories = ['all', 'Sections', 'Cards', 'Forms', 'Navigation', 'Layout'];

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Component Marketplace</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
            >
              <Upload size={18} />
              Share Component
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Marketplace Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gray-100 rounded mb-3 flex items-center justify-center">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover rounded" />
                  ) : (
                    <div className="text-gray-400 text-sm">No Preview</div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Download size={14} />
                    <span>{item.downloads}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onImport(item.component)}
                    className="flex-1 px-3 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors text-sm"
                  >
                    Import
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  by {item.author} • {item.category}
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No components found</p>
              <p className="text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

