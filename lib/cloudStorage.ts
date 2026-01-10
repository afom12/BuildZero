import { Project } from '@/types';

// Cloud storage interface - can be implemented with Firebase, Supabase, etc.
export interface CloudStorage {
  saveProject(project: Project): Promise<void>;
  loadProject(projectId: string): Promise<Project | null>;
  listProjects(): Promise<Project[]>;
  deleteProject(projectId: string): Promise<void>;
}

// LocalStorage implementation (fallback)
export class LocalStorageCloudStorage implements CloudStorage {
  async saveProject(project: Project): Promise<void> {
    try {
      const projects = await this.listProjects();
      const existingIndex = projects.findIndex(p => p.id === project.id);
      
      if (existingIndex >= 0) {
        projects[existingIndex] = project;
      } else {
        projects.push(project);
      }
      
      localStorage.setItem('cloud-projects', JSON.stringify(projects));
    } catch (error) {
      console.error('Failed to save project:', error);
      throw error;
    }
  }

  async loadProject(projectId: string): Promise<Project | null> {
    try {
      const projects = await this.listProjects();
      return projects.find(p => p.id === projectId) || null;
    } catch (error) {
      console.error('Failed to load project:', error);
      return null;
    }
  }

  async listProjects(): Promise<Project[]> {
    try {
      const saved = localStorage.getItem('cloud-projects');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to list projects:', error);
      return [];
    }
  }

  async deleteProject(projectId: string): Promise<void> {
    try {
      const projects = await this.listProjects();
      const filtered = projects.filter(p => p.id !== projectId);
      localStorage.setItem('cloud-projects', JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw error;
    }
  }
}

// Firebase implementation (placeholder - requires Firebase setup)
export class FirebaseCloudStorage implements CloudStorage {
  // This would require Firebase initialization
  async saveProject(project: Project): Promise<void> {
    // Implementation would use Firebase Firestore
    throw new Error('Firebase storage not configured');
  }

  async loadProject(projectId: string): Promise<Project | null> {
    // Implementation would use Firebase Firestore
    throw new Error('Firebase storage not configured');
  }

  async listProjects(): Promise<Project[]> {
    // Implementation would use Firebase Firestore
    throw new Error('Firebase storage not configured');
  }

  async deleteProject(projectId: string): Promise<void> {
    // Implementation would use Firebase Firestore
    throw new Error('Firebase storage not configured');
  }
}

// Factory function to get storage instance
export function getCloudStorage(): CloudStorage {
  // Check if Firebase is configured, otherwise use localStorage
  const useFirebase = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';
  
  if (useFirebase) {
    return new FirebaseCloudStorage();
  }
  
  return new LocalStorageCloudStorage();
}

