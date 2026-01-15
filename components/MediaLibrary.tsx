'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, FileImage, Trash2, Search, Grid, List } from 'lucide-react';

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  uploadedAt: string;
  thumbnail?: string;
}

interface MediaLibraryProps {
  onSelect?: (media: MediaItem) => void;
  onClose: () => void;
}

export default function MediaLibrary({ onSelect, onClose }: MediaLibraryProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    // Load from localStorage
    const saved = localStorage.getItem('no-code-media-library');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveMediaItems = useCallback((items: MediaItem[]) => {
    setMediaItems(items);
    localStorage.setItem('no-code-media-library', JSON.stringify(items));
  }, []);

  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newItems: MediaItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type.startsWith('image/') ? 'image' : 
                      file.type.startsWith('video/') ? 'video' : 'document';

      // Convert to base64 for storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        const newItem: MediaItem = {
          id: `media-${Date.now()}-${i}`,
          name: file.name,
          url,
          type: fileType,
          size: file.size,
          uploadedAt: new Date().toISOString(),
          thumbnail: fileType === 'image' ? url : undefined,
        };
        newItems.push(newItem);
        
        if (newItems.length === files.length) {
          saveMediaItems([...mediaItems, ...newItems]);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [mediaItems, saveMediaItems]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files);
  }, [handleFileUpload]);

  const handleDelete = useCallback((id: string) => {
    if (confirm('Are you sure you want to delete this media item?')) {
      saveMediaItems(mediaItems.filter(item => item.id !== id));
    }
  }, [mediaItems, saveMediaItems]);

  const filteredItems = mediaItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ImageIcon size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Media Library</h2>
            <span className="text-sm text-gray-500">({mediaItems.length} items)</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center gap-2">
              <div className="relative flex-1 max-w-md">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search media..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                <List size={18} />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
              >
                <Upload size={18} />
                Upload Media
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`m-4 border-2 border-dashed rounded-lg p-8 transition-colors ${
              isDragging
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <div className="text-center">
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">
                Drag and drop files here, or{' '}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary-500 hover:underline"
                >
                  browse
                </button>
              </p>
              <p className="text-sm text-gray-400">
                Supports images and videos
              </p>
            </div>
          </div>

          {/* Media Grid/List */}
          <div className="flex-1 overflow-y-auto p-4">
            {filteredItems.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <FileImage size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">No media items found</p>
                <p className="text-sm mt-2">Upload some files to get started</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all"
                    onClick={() => onSelect?.(item)}
                  >
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileImage size={32} className="text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs truncate">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => onSelect?.(item)}
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileImage size={24} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {(item.size / 1024).toFixed(2)} KB • {new Date(item.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
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

