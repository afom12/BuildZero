'use client';

import { useState } from 'react';
import { X, Search, Layout, ShoppingCart, Briefcase, Camera, BookOpen, Heart, Code, Music } from 'lucide-react';
import { Component, Page } from '@/types';
import { generateId } from '@/lib/utils';

export interface WebsiteTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  pages: Page[];
  preview?: string;
}

interface WebsiteTemplatesProps {
  onSelect: (template: WebsiteTemplate) => void;
  onClose: () => void;
}

const websiteTemplates: WebsiteTemplate[] = [
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Modern portfolio website for showcasing your work',
    category: 'Portfolio',
    thumbnail: '🎨',
    pages: [
      {
        id: generateId(),
        name: 'Home',
        components: [
          {
            id: generateId(),
            type: 'header',
            props: {},
            children: [
              {
                id: generateId(),
                type: 'navigation',
                props: {},
                children: [
                  { id: generateId(), type: 'link', props: { text: 'Home', href: '#home' } },
                  { id: generateId(), type: 'link', props: { text: 'About', href: '#about' } },
                  { id: generateId(), type: 'link', props: { text: 'Portfolio', href: '#portfolio' } },
                  { id: generateId(), type: 'link', props: { text: 'Contact', href: '#contact' } },
                ],
              },
            ],
          },
          {
            id: generateId(),
            type: 'section',
            props: {},
            style: { padding: '80px 20px', textAlign: 'center', backgroundColor: '#f8f9fa' },
            children: [
              { id: generateId(), type: 'heading', props: { text: 'Welcome to My Portfolio' }, style: { fontSize: '48px', marginBottom: '20px' } },
              { id: generateId(), type: 'text', props: { text: 'Creative Designer & Developer' }, style: { fontSize: '20px', color: '#666', marginBottom: '30px' } },
              { id: generateId(), type: 'button', props: { text: 'View My Work' }, style: { padding: '12px 30px', fontSize: '16px' } },
            ],
          },
          {
            id: generateId(),
            type: 'section',
            props: {},
            style: { padding: '60px 20px' },
            children: [
              { id: generateId(), type: 'heading', props: { text: 'Featured Projects' }, style: { fontSize: '36px', marginBottom: '40px', textAlign: 'center' } },
              {
                id: generateId(),
                type: 'container',
                props: {},
                style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
                children: [
                  { id: generateId(), type: 'card', props: {}, children: [{ id: generateId(), type: 'image', props: { src: '', alt: 'Project 1' } }] },
                  { id: generateId(), type: 'card', props: {}, children: [{ id: generateId(), type: 'image', props: { src: '', alt: 'Project 2' } }] },
                  { id: generateId(), type: 'card', props: {}, children: [{ id: generateId(), type: 'image', props: { src: '', alt: 'Project 3' } }] },
                ],
              },
            ],
          },
          {
            id: generateId(),
            type: 'footer',
            props: {},
            style: { padding: '40px 20px', backgroundColor: '#333', color: '#fff', textAlign: 'center' },
            children: [
              { id: generateId(), type: 'text', props: { text: '© 2024 My Portfolio. All rights reserved.' } },
            ],
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Professional business website template',
    category: 'Business',
    thumbnail: '💼',
    pages: [
      {
        id: generateId(),
        name: 'Home',
        components: [
          {
            id: generateId(),
            type: 'header',
            props: {},
            children: [
              {
                id: generateId(),
                type: 'navigation',
                props: {},
                children: [
                  { id: generateId(), type: 'link', props: { text: 'Home', href: '#home' } },
                  { id: generateId(), type: 'link', props: { text: 'Services', href: '#services' } },
                  { id: generateId(), type: 'link', props: { text: 'About', href: '#about' } },
                  { id: generateId(), type: 'link', props: { text: 'Contact', href: '#contact' } },
                ],
              },
            ],
          },
          {
            id: generateId(),
            type: 'section',
            props: {},
            style: { padding: '100px 20px', backgroundColor: '#1a1a1a', color: '#fff', textAlign: 'center' },
            children: [
              { id: generateId(), type: 'heading', props: { text: 'Your Business Solution' }, style: { fontSize: '56px', marginBottom: '20px' } },
              { id: generateId(), type: 'text', props: { text: 'We help businesses grow and succeed' }, style: { fontSize: '22px', marginBottom: '40px' } },
              { id: generateId(), type: 'button', props: { text: 'Get Started' }, style: { padding: '15px 40px', fontSize: '18px' } },
            ],
          },
          {
            id: generateId(),
            type: 'section',
            props: {},
            style: { padding: '80px 20px' },
            children: [
              { id: generateId(), type: 'heading', props: { text: 'Our Services' }, style: { fontSize: '40px', marginBottom: '50px', textAlign: 'center' } },
              {
                id: generateId(),
                type: 'container',
                props: {},
                style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' },
                children: [
                  { id: generateId(), type: 'card', props: {}, children: [{ id: generateId(), type: 'heading', props: { text: 'Service 1' } }] },
                  { id: generateId(), type: 'card', props: {}, children: [{ id: generateId(), type: 'heading', props: { text: 'Service 2' } }] },
                  { id: generateId(), type: 'card', props: {}, children: [{ id: generateId(), type: 'heading', props: { text: 'Service 3' } }] },
                ],
              },
            ],
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    description: 'Online store template with product showcase',
    category: 'E-Commerce',
    thumbnail: '🛒',
    pages: [
      {
        id: generateId(),
        name: 'Home',
        components: [
          {
            id: generateId(),
            type: 'header',
            props: {},
            children: [
              {
                id: generateId(),
                type: 'navigation',
                props: {},
                children: [
                  { id: generateId(), type: 'link', props: { text: 'Shop', href: '#shop' } },
                  { id: generateId(), type: 'link', props: { text: 'Categories', href: '#categories' } },
                  { id: generateId(), type: 'link', props: { text: 'About', href: '#about' } },
                  { id: generateId(), type: 'link', props: { text: 'Contact', href: '#contact' } },
                ],
              },
            ],
          },
          {
            id: generateId(),
            type: 'section',
            props: {},
            style: { padding: '60px 20px', backgroundColor: '#f5f5f5' },
            children: [
              { id: generateId(), type: 'heading', props: { text: 'Featured Products' }, style: { fontSize: '36px', marginBottom: '40px', textAlign: 'center' } },
              {
                id: generateId(),
                type: 'container',
                props: {},
                style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' },
                children: [
                  { id: generateId(), type: 'card', props: {}, children: [{ id: generateId(), type: 'image', props: { src: '', alt: 'Product' } }] },
                  { id: generateId(), type: 'card', props: {}, children: [{ id: generateId(), type: 'image', props: { src: '', alt: 'Product' } }] },
                  { id: generateId(), type: 'card', props: {}, children: [{ id: generateId(), type: 'image', props: { src: '', alt: 'Product' } }] },
                  { id: generateId(), type: 'card', props: {}, children: [{ id: generateId(), type: 'image', props: { src: '', alt: 'Product' } }] },
                ],
              },
            ],
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'blog',
    name: 'Blog',
    description: 'Clean blog template for content creators',
    category: 'Blog',
    thumbnail: '📝',
    pages: [
      {
        id: generateId(),
        name: 'Home',
        components: [
          {
            id: generateId(),
            type: 'header',
            props: {},
            children: [
              {
                id: generateId(),
                type: 'navigation',
                props: {},
                children: [
                  { id: generateId(), type: 'link', props: { text: 'Home', href: '#home' } },
                  { id: generateId(), type: 'link', props: { text: 'Blog', href: '#blog' } },
                  { id: generateId(), type: 'link', props: { text: 'About', href: '#about' } },
                ],
              },
            ],
          },
          {
            id: generateId(),
            type: 'section',
            props: {},
            style: { padding: '40px 20px', maxWidth: '800px', margin: '0 auto' },
            children: [
              { id: generateId(), type: 'heading', props: { text: 'Latest Posts' }, style: { fontSize: '32px', marginBottom: '30px' } },
              { id: generateId(), type: 'card', props: {}, children: [{ id: generateId(), type: 'heading', props: { text: 'Blog Post Title' } }] },
              { id: generateId(), type: 'card', props: {}, children: [{ id: generateId(), type: 'heading', props: { text: 'Blog Post Title' } }] },
            ],
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  },
];

export default function WebsiteTemplates({ onSelect, onClose }: WebsiteTemplatesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(websiteTemplates.map(t => t.category.toLowerCase())))];

  const filteredTemplates = websiteTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Layout size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Website Templates</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Filters */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-md">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded capitalize ${
                      selectedCategory === cat
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredTemplates.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <Layout size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">No templates found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => onSelect(template)}
                  >
                    <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-6xl">
                      {template.thumbnail}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{template.name}</h3>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          {template.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                      <button className="w-full px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors opacity-0 group-hover:opacity-100">
                        Use Template
                      </button>
                    </div>
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

