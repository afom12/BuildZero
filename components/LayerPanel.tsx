'use client';

import { Component } from '@/types';
import { Layers, Eye, EyeOff, Lock, Unlock, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface LayerPanelProps {
  components: Component[];
  selectedComponent: Component | null;
  onSelect: (component: Component | null) => void;
  onUpdate: (id: string, updates: Partial<Component>) => void;
  onDelete: (id: string) => void;
}

export default function LayerPanel({
  components,
  selectedComponent,
  onSelect,
  onUpdate,
  onDelete,
}: LayerPanelProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [locked, setLocked] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const toggleHidden = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newHidden = new Set(hidden);
    if (newHidden.has(id)) {
      newHidden.delete(id);
    } else {
      newHidden.add(id);
    }
    setHidden(newHidden);
  };

  const toggleLocked = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLocked = new Set(locked);
    if (newLocked.has(id)) {
      newLocked.delete(id);
    } else {
      newLocked.add(id);
    }
    setLocked(newLocked);
  };

  const renderLayer = (component: Component, depth: number = 0): React.ReactNode => {
    const isExpanded = expanded.has(component.id);
    const isHidden = hidden.has(component.id);
    const isLocked = locked.has(component.id);
    const isSelected = selectedComponent?.id === component.id;
    const hasChildren = component.children && component.children.length > 0;

    return (
      <div key={component.id}>
        <div
          className={`flex items-center gap-1 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-100 transition-colors ${
            isSelected ? 'bg-primary-50 border border-primary-200' : ''
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => !isLocked && onSelect(component)}
        >
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(component.id);
              }}
              className="p-0.5 hover:bg-gray-200 rounded"
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          ) : (
            <div className="w-4" />
          )}
          <Layers size={14} className="text-gray-500" />
          <span className={`flex-1 text-sm truncate ${isHidden ? 'opacity-50' : ''}`}>
            {component.type}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => toggleHidden(component.id, e)}
              className="p-1 hover:bg-gray-200 rounded"
              title={isHidden ? 'Show' : 'Hide'}
            >
              {isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            <button
              onClick={(e) => toggleLocked(component.id, e)}
              className="p-1 hover:bg-gray-200 rounded"
              title={isLocked ? 'Unlock' : 'Lock'}
            >
              {isLocked ? <Lock size={14} className="text-red-500" /> : <Unlock size={14} />}
            </button>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {component.children?.map((child) => renderLayer(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <Layers size={20} />
        <h2 className="text-lg font-semibold text-gray-800">Layers</h2>
      </div>
      <div className="space-y-1">
        {components.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            <Layers size={32} className="mx-auto mb-2 opacity-50" />
            <p>No components</p>
            <p className="text-xs mt-1">Add components to see them here</p>
          </div>
        ) : (
          components.map((component) => renderLayer(component))
        )}
      </div>
    </div>
  );
}

