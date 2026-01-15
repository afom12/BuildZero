'use client';

import { useState, useEffect, useRef } from 'react';
import { Component } from '@/types';
import { X, Play, Save, Code as CodeIcon } from 'lucide-react';

interface CodeEditorProps {
  component: Component;
  onUpdate: (updates: Partial<Component>) => void;
  onClose: () => void;
}

export default function CodeEditor({ component, onUpdate, onClose }: CodeEditorProps) {
  const [code, setCode] = useState(() => {
    return component.props.customJavaScript || '';
  });
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  const handleSave = () => {
    try {
      // Basic validation - check if it's valid JavaScript syntax
      if (code.trim()) {
        // Try to parse as function or code block
        new Function(code);
      }
      onUpdate({
        props: {
          ...component.props,
          customJavaScript: code,
        },
      });
      setError(null);
      onClose();
    } catch (e: any) {
      setError(e.message || 'Invalid JavaScript syntax');
    }
  };

  const handleRun = () => {
    try {
      if (code.trim()) {
        const func = new Function(code);
        func();
        setError(null);
      }
    } catch (e: any) {
      setError(e.message || 'Error executing code');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <CodeIcon size={24} />
            <h2 className="text-2xl font-bold text-gray-800">JavaScript Code Editor</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Info Bar */}
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-gray-600">
              Write custom JavaScript code for this component. The code will execute when the component loads.
            </p>
            {error && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                Error: {error}
              </div>
            )}
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-hidden">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(null);
              }}
              className="w-full h-full p-4 font-mono text-sm border-0 focus:outline-none resize-none"
              placeholder={`// Example: Add event listeners or custom functionality
document.addEventListener('click', function() {
  console.log('Component clicked!');
});`}
              spellCheck={false}
            />
          </div>

          {/* Line Numbers (simplified) */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Lines: {code.split('\n').length} | Characters: {code.length}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRun}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <Play size={18} />
                Run Code
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
              >
                <Save size={18} />
                Save Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

