'use client';

import { useState } from 'react';
import { ProjectVersion, Project } from '@/types';
import { GitBranch, Clock, User, Plus, X, Check } from 'lucide-react';
import { generateId } from '@/lib/utils';

interface VersionControlProps {
  project: Project;
  onVersionSelect: (version: ProjectVersion) => void;
  onVersionCreate: (name: string, description: string, branch?: string) => void;
  onClose: () => void;
}

export default function VersionControl({
  project,
  onVersionSelect,
  onVersionCreate,
  onClose,
}: VersionControlProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [versionName, setVersionName] = useState('');
  const [versionDescription, setVersionDescription] = useState('');
  const [branchName, setBranchName] = useState('');

  // Load versions from localStorage
  const [versions] = useState<ProjectVersion[]>(() => {
    const saved = localStorage.getItem(`project-versions-${project.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const handleCreateVersion = () => {
    if (!versionName.trim()) return;

    const newVersion: ProjectVersion = {
      id: generateId(),
      version: `v${versions.length + 1}.0.0`,
      name: versionName,
      description: versionDescription,
      project: JSON.parse(JSON.stringify(project)), // Deep clone
      createdAt: new Date().toISOString(),
      createdBy: 'Current User', // In real app, get from auth
      branch: branchName || undefined,
    };

    const updatedVersions = [newVersion, ...versions];
    localStorage.setItem(`project-versions-${project.id}`, JSON.stringify(updatedVersions));
    onVersionCreate(versionName, versionDescription, branchName || undefined);
    setShowCreate(false);
    setVersionName('');
    setVersionDescription('');
    setBranchName('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <GitBranch size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Version Control</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
            >
              <Plus size={18} />
              Create Version
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
          {showCreate ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Create New Version</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Version Name *
                </label>
                <input
                  type="text"
                  value={versionName}
                  onChange={(e) => setVersionName(e.target.value)}
                  placeholder="e.g., Initial Release"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={versionDescription}
                  onChange={(e) => setVersionDescription(e.target.value)}
                  placeholder="What changed in this version?"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch Name (optional)
                </label>
                <input
                  type="text"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  placeholder="e.g., feature/new-design"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCreateVersion}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                >
                  <Check size={18} />
                  Create Version
                </button>
                <button
                  onClick={() => {
                    setShowCreate(false);
                    setVersionName('');
                    setVersionDescription('');
                    setBranchName('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {versions.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <GitBranch size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No versions yet</p>
                  <p className="text-sm mt-2">Create your first version to start tracking changes</p>
                </div>
              ) : (
                versions.map((version) => (
                  <div
                    key={version.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onVersionSelect(version)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-800">{version.name}</span>
                          <span className="text-sm text-gray-500">{version.version}</span>
                          {version.branch && (
                            <span className="flex items-center gap-1 text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded">
                              <GitBranch size={12} />
                              {version.branch}
                            </span>
                          )}
                        </div>
                        {version.description && (
                          <p className="text-sm text-gray-600 mb-2">{version.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User size={12} />
                            {version.createdBy}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            {new Date(version.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onVersionSelect(version);
                        }}
                        className="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors text-sm"
                      >
                        Restore
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

