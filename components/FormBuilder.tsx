'use client';

import { useState } from 'react';
import { Component } from '@/types';
import { X, Plus, Trash2, Save, Code, Settings } from 'lucide-react';

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'file';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select, radio
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface FormConfig {
  id: string;
  name: string;
  action: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  fields: FormField[];
  successMessage?: string;
  errorMessage?: string;
  redirectUrl?: string;
  backendEndpoint?: string;
  apiKey?: string;
}

interface FormBuilderProps {
  component: Component;
  onUpdate: (updates: Partial<Component>) => void;
  onClose: () => void;
}

export default function FormBuilder({ component, onUpdate, onClose }: FormBuilderProps) {
  const [config, setConfig] = useState<FormConfig>(() => {
    return component.props.formConfig || {
      id: component.id,
      name: 'Form',
      action: '',
      method: 'POST',
      fields: [],
      successMessage: 'Form submitted successfully!',
      errorMessage: 'An error occurred. Please try again.',
    };
  });

  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [showFieldEditor, setShowFieldEditor] = useState(false);

  const addField = () => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: 'text',
      label: 'New Field',
      required: false,
    };
    setConfig({
      ...config,
      fields: [...config.fields, newField],
    });
    setEditingField(newField);
    setShowFieldEditor(true);
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setConfig({
      ...config,
      fields: config.fields.map(f => f.id === fieldId ? { ...f, ...updates } : f),
    });
  };

  const deleteField = (fieldId: string) => {
    setConfig({
      ...config,
      fields: config.fields.filter(f => f.id !== fieldId),
    });
  };

  const handleSave = () => {
    onUpdate({
      props: {
        ...component.props,
        formConfig: config,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Settings size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Form Builder</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex">
          {/* Form Fields List */}
          <div className="w-1/3 border-r border-gray-200 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Form Fields</h3>
              <button
                onClick={addField}
                className="p-2 bg-primary-500 text-white rounded hover:bg-primary-600"
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="space-y-2">
              {config.fields.map((field) => (
                <div
                  key={field.id}
                  className="p-3 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:border-primary-500 transition-colors"
                  onClick={() => {
                    setEditingField(field);
                    setShowFieldEditor(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-gray-800">{field.label}</div>
                      <div className="text-xs text-gray-500">{field.type}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteField(field.id);
                      }}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {config.fields.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <p className="text-sm">No fields yet</p>
                  <p className="text-xs mt-1">Click + to add a field</p>
                </div>
              )}
            </div>
          </div>

          {/* Field Editor / Form Settings */}
          <div className="flex-1 p-6 overflow-y-auto">
            {showFieldEditor && editingField ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Edit Field</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
                  <select
                    value={editingField.type}
                    onChange={(e) => updateField(editingField.id, { type: e.target.value as FormField['type'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="password">Password</option>
                    <option value="number">Number</option>
                    <option value="textarea">Textarea</option>
                    <option value="select">Select</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                    <option value="date">Date</option>
                    <option value="file">File Upload</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                  <input
                    type="text"
                    value={editingField.label}
                    onChange={(e) => updateField(editingField.id, { label: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
                  <input
                    type="text"
                    value={editingField.placeholder || ''}
                    onChange={(e) => updateField(editingField.id, { placeholder: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="required"
                    checked={editingField.required}
                    onChange={(e) => updateField(editingField.id, { required: e.target.checked })}
                  />
                  <label htmlFor="required" className="text-sm text-gray-700">Required Field</label>
                </div>

                {(editingField.type === 'select' || editingField.type === 'radio') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Options (one per line)</label>
                    <textarea
                      value={editingField.options?.join('\n') || ''}
                      onChange={(e) => updateField(editingField.id, { options: e.target.value.split('\n').filter(o => o.trim()) })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="Option 1&#10;Option 2&#10;Option 3"
                    />
                  </div>
                )}

                <button
                  onClick={() => {
                    setShowFieldEditor(false);
                    setEditingField(null);
                  }}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Done Editing
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Form Settings</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Form Name</label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => setConfig({ ...config, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">HTTP Method</label>
                  <select
                    value={config.method}
                    onChange={(e) => setConfig({ ...config, method: e.target.value as FormConfig['method'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Backend Endpoint URL</label>
                  <input
                    type="text"
                    value={config.backendEndpoint || ''}
                    onChange={(e) => setConfig({ ...config, backendEndpoint: e.target.value })}
                    placeholder="https://api.example.com/submit"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty to use form action</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Key (Optional)</label>
                  <input
                    type="password"
                    value={config.apiKey || ''}
                    onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                    placeholder="Your API key"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Success Message</label>
                  <input
                    type="text"
                    value={config.successMessage || ''}
                    onChange={(e) => setConfig({ ...config, successMessage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Redirect URL (Optional)</label>
                  <input
                    type="text"
                    value={config.redirectUrl || ''}
                    onChange={(e) => setConfig({ ...config, redirectUrl: e.target.value })}
                    placeholder="https://example.com/thank-you"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2"
          >
            <Save size={18} />
            Save Form
          </button>
        </div>
      </div>
    </div>
  );
}

