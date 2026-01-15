'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types';
import { Cloud, Upload, Download, Trash2, RefreshCw } from 'lucide-react';
import { getCloudStorage } from '@/lib/cloudStorage';
import { useToast } from '@/hooks/useToast';
import ToastContainer from '@/components/Toast';

interface CloudStoragePanelProps {
  currentProject: Project;
  onProjectLoad: (project: Project) => void;
  onClose: () => void;
}

export default function CloudStoragePanel({
  currentProject,
  onProjectLoad,
  onClose,
}: CloudStoragePanelProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const storage = getCloudStorage();
  const toast = useToast();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const loadedProjects = await storage.listProjects();
      setProjects(loadedProjects);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await storage.saveProject(currentProject);
      await loadProjects();
      toast.success('Project saved to cloud successfully!');
    } catch (error) {
      console.error('Failed to save project:', error);
      toast.error('Failed to save project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoad = async (projectId: string) => {
    setLoading(true);
    try {
      const project = await storage.loadProject(projectId);
      if (project) {
        onProjectLoad(project);
        toast.success('Project loaded successfully!');
      }
    } catch (error) {
      console.error('Failed to load project:', error);
      toast.error('Failed to load project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    setLoading(true);
    try {
      await storage.deleteProject(projectId);
      await loadProjects();
      toast.success('Project deleted successfully!');
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Cloud size={20} />
          <h2 className="text-lg font-semibold text-gray-800">Cloud Storage</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors disabled:opacity-50 mb-4"
      >
        <Upload size={18} />
        Save Current Project
      </button>

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Saved Projects</h3>
        <button
          onClick={loadProjects}
          disabled={loading}
          className="text-gray-400 hover:text-gray-600"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading && projects.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <RefreshCw size={32} className="mx-auto mb-2 animate-spin" />
          <p className="text-sm">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <Cloud size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">No saved projects</p>
          <p className="text-xs mt-1">Save your current project to get started</p>
        </div>
      ) : (
        <div className="space-y-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-3 bg-white border border-gray-200 rounded hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-sm">{project.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleLoad(project.id)}
                    className="p-1 text-primary-600 hover:bg-primary-50 rounded"
                    title="Load project"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Delete project"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                {project.pages.length} page{project.pages.length !== 1 ? 's' : ''}
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </div>
  );
}

