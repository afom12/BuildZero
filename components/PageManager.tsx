'use client';

import { Page } from '@/types';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { useState } from 'react';

interface PageManagerProps {
  pages: Page[];
  currentPageId: string;
  onPageSelect: (pageId: string) => void;
  onPageAdd: () => void;
  onPageDelete: (pageId: string) => void;
  onPageRename: (pageId: string, newName: string) => void;
}

export default function PageManager({
  pages,
  currentPageId,
  onPageSelect,
  onPageAdd,
  onPageDelete,
  onPageRename,
}: PageManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleStartEdit = (page: Page) => {
    setEditingId(page.id);
    setEditName(page.name);
  };

  const handleSaveEdit = (pageId: string) => {
    if (editName.trim()) {
      onPageRename(pageId, editName.trim());
    }
    setEditingId(null);
    setEditName('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center gap-2 overflow-x-auto">
        {pages.map((page) => (
          <div
            key={page.id}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
              currentPageId === page.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => onPageSelect(page.id)}
          >
            {editingId === page.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit(page.id);
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  className="px-2 py-0.5 text-sm rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveEdit(page.id);
                  }}
                  className="text-white hover:text-gray-200"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancelEdit();
                  }}
                  className="text-white hover:text-gray-200"
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <>
                <span className="text-sm font-medium">{page.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartEdit(page);
                  }}
                  className="opacity-70 hover:opacity-100"
                >
                  <Edit2 size={12} />
                </button>
                {pages.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPageDelete(page.id);
                    }}
                    className="opacity-70 hover:opacity-100"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </>
            )}
          </div>
        ))}
        <button
          onClick={onPageAdd}
          className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Plus size={16} />
          <span className="text-sm">Add Page</span>
        </button>
      </div>
    </div>
  );
}

