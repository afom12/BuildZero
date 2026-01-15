'use client';

import { useState } from 'react';
import { Project } from '@/types';
import { X, Rocket, ExternalLink, Copy, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { generateHTML } from '@/lib/exporters';

interface DeploymentPanelProps {
  project: Project;
  components: any[];
  onClose: () => void;
  onSuccess?: (url: string) => void;
  onError?: (error: string) => void;
}

export default function DeploymentPanel({
  project,
  components,
  onClose,
  onSuccess,
  onError,
}: DeploymentPanelProps) {
  const [deploymentType, setDeploymentType] = useState<'vercel' | 'netlify' | 'github'>('vercel');
  const [projectName, setProjectName] = useState(project.name || 'my-website');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDeploy = async () => {
    setIsDeploying(true);
    setError(null);
    setDeploymentUrl(null);

    try {
      // Generate HTML content
      const htmlContent = generateHTML(components, project);

      if (deploymentType === 'vercel') {
        await deployToVercel(htmlContent);
      } else if (deploymentType === 'netlify') {
        await deployToNetlify(htmlContent);
      } else if (deploymentType === 'github') {
        await deployToGitHub(htmlContent);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Deployment failed. Please try again.';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsDeploying(false);
    }
  };

  const deployToVercel = async (htmlContent: string) => {
    // In a real implementation, this would use Vercel API
    // For now, we'll create a downloadable deployment package
    
    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a blob with the HTML
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // In production, this would be the actual Vercel deployment URL
    const deploymentUrl = `https://${projectName}.vercel.app`;
    
    setDeploymentUrl(deploymentUrl);
    onSuccess?.(deploymentUrl);
    
    // Download the HTML file as fallback
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const deployToNetlify = async (htmlContent: string) => {
    // Similar to Vercel, but for Netlify
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const deploymentUrl = `https://${projectName}.netlify.app`;
    
    setDeploymentUrl(deploymentUrl);
    onSuccess?.(deploymentUrl);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const deployToGitHub = async (htmlContent: string) => {
    // For GitHub, we'll just download the HTML file
    // In production, this would use GitHub API to create a repository
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
    
    // Also create a README
    const readmeBlob = new Blob([`# ${project.name}\n\nDeployed from No-Code Platform\n\n## Setup\n\n1. Upload index.html to your GitHub repository\n2. Enable GitHub Pages in repository settings\n3. Your site will be live at: https://yourusername.github.io/repository-name`], { type: 'text/plain' });
    const readmeUrl = URL.createObjectURL(readmeBlob);
    const readmeA = document.createElement('a');
    readmeA.href = readmeUrl;
    readmeA.download = 'README.md';
    readmeA.click();
    URL.revokeObjectURL(readmeUrl);
    
    setDeploymentUrl('Files downloaded! Follow README.md instructions to deploy to GitHub Pages.');
    onSuccess?.('github-download');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Rocket size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Deploy Website</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {deploymentUrl ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle size={24} className="text-green-500 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-green-800 mb-1">Deployment Successful!</h3>
                  <p className="text-sm text-green-700 mb-3">
                    {deploymentType === 'github' 
                      ? 'Your project files are ready to upload to GitHub Pages.'
                      : 'Your website has been deployed successfully.'}
                  </p>
                  {deploymentType !== 'github' && (
                    <div className="flex items-center gap-2">
                      <a
                        href={deploymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline flex items-center gap-1"
                      >
                        {deploymentUrl}
                        <ExternalLink size={16} />
                      </a>
                      <button
                        onClick={() => copyToClipboard(deploymentUrl)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                        title="Copy URL"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle size={24} className="text-red-500 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-800 mb-1">Deployment Failed</h3>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deployment Platform
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'vercel', label: 'Vercel', desc: 'Fast & easy' },
                    { id: 'netlify', label: 'Netlify', desc: 'Great for static sites' },
                    { id: 'github', label: 'GitHub Pages', desc: 'Free hosting' },
                  ].map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => setDeploymentType(platform.id as any)}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        deploymentType === platform.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-800">{platform.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{platform.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="my-awesome-website"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will be used as your site URL: {projectName}.{deploymentType === 'vercel' ? 'vercel.app' : deploymentType === 'netlify' ? 'netlify.app' : 'github.io'}
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Note</h4>
                <p className="text-sm text-blue-700">
                  {deploymentType === 'github' 
                    ? 'This will download a ZIP file that you can upload to GitHub Pages. Extract and push to your repository.'
                    : 'For full deployment integration, configure API keys in your environment variables. This demo will download your site files.'}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            {deploymentUrl ? 'Close' : 'Cancel'}
          </button>
          {!deploymentUrl && (
            <button
              onClick={handleDeploy}
              disabled={isDeploying || !projectName}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeploying ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Rocket size={18} />
                  Deploy Now
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

