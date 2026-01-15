'use client';

import { useState } from 'react';
import { Project } from '@/types';
import { X, Search, FileText, Code, Download, CheckCircle, AlertCircle } from 'lucide-react';

interface AdvancedSEOToolsProps {
  project: Project;
  onUpdate: (updates: Partial<Project>) => void;
  onClose: () => void;
}

export default function AdvancedSEOTools({ project, onUpdate, onClose }: AdvancedSEOToolsProps) {
  const [activeTab, setActiveTab] = useState<'schema' | 'sitemap' | 'robots' | 'analysis'>('schema');
  const [schemaType, setSchemaType] = useState('Organization');
  const [schemaData, setSchemaData] = useState({
    name: project.name || '',
    url: '',
    logo: '',
    description: project.settings?.siteDescription || '',
    address: '',
    phone: '',
    email: '',
  });

  const generateSchemaMarkup = () => {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: schemaData.name,
    };

    if (schemaData.url) schema.url = schemaData.url;
    if (schemaData.logo) schema.logo = schemaData.logo;
    if (schemaData.description) schema.description = schemaData.description;
    if (schemaData.address) schema.address = schemaData.address;
    if (schemaData.phone) schema.telephone = schemaData.phone;
    if (schemaData.email) schema.email = schemaData.email;

    return JSON.stringify(schema, null, 2);
  };

  const generateSitemap = () => {
    const baseUrl = schemaData.url || 'https://example.com';
    const pages = project.pages.map(page => ({
      url: `${baseUrl}/${page.name.toLowerCase().replace(/\s+/g, '-')}`,
      lastmod: page.updatedAt,
      changefreq: 'monthly',
      priority: page.id === project.currentPageId ? '1.0' : '0.8',
    }));

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  };

  const generateRobotsTxt = () => {
    const baseUrl = schemaData.url || 'https://example.com';
    return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const analyzeSEO = () => {
    const issues: string[] = [];
    const suggestions: string[] = [];

    if (!project.settings?.siteTitle) {
      issues.push('Missing site title');
    }
    if (!project.settings?.siteDescription) {
      issues.push('Missing meta description');
    }
    if (project.settings?.siteDescription && project.settings.siteDescription.length < 120) {
      suggestions.push('Meta description should be at least 120 characters');
    }
    if (!project.settings?.favicon) {
      suggestions.push('Add a favicon for better branding');
    }
    if (!schemaData.url) {
      suggestions.push('Add your website URL for schema markup');
    }

    return { issues, suggestions };
  };

  const { issues, suggestions } = analyzeSEO();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Search size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Advanced SEO Tools</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'schema', label: 'Schema Markup', icon: Code },
              { id: 'sitemap', label: 'Sitemap', icon: FileText },
              { id: 'robots', label: 'Robots.txt', icon: FileText },
              { id: 'analysis', label: 'SEO Analysis', icon: Search },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'schema' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Schema Type</label>
                  <select
                    value={schemaType}
                    onChange={(e) => setSchemaType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="Organization">Organization</option>
                    <option value="WebSite">Website</option>
                    <option value="LocalBusiness">Local Business</option>
                    <option value="Article">Article</option>
                    <option value="Product">Product</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={schemaData.name}
                      onChange={(e) => setSchemaData({ ...schemaData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                    <input
                      type="text"
                      value={schemaData.url}
                      onChange={(e) => setSchemaData({ ...schemaData, url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                    <input
                      type="text"
                      value={schemaData.logo}
                      onChange={(e) => setSchemaData({ ...schemaData, logo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={schemaData.email}
                      onChange={(e) => setSchemaData({ ...schemaData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={schemaData.phone}
                      onChange={(e) => setSchemaData({ ...schemaData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={schemaData.address}
                      onChange={(e) => setSchemaData({ ...schemaData, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Generated Schema JSON</label>
                  <pre className="w-full p-4 bg-gray-50 border border-gray-300 rounded overflow-x-auto text-sm">
                    {generateSchemaMarkup()}
                  </pre>
                </div>

                <button
                  onClick={() => downloadFile(generateSchemaMarkup(), 'schema.json', 'application/json')}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
                >
                  <Download size={18} />
                  Download Schema JSON
                </button>
              </div>
            )}

            {activeTab === 'sitemap' && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    A sitemap helps search engines discover and index all pages on your website.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Generated Sitemap XML</label>
                    <pre className="w-full p-4 bg-gray-50 border border-gray-300 rounded overflow-x-auto text-sm">
                      {generateSitemap()}
                    </pre>
                  </div>
                </div>
                <button
                  onClick={() => downloadFile(generateSitemap(), 'sitemap.xml', 'application/xml')}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
                >
                  <Download size={18} />
                  Download Sitemap XML
                </button>
              </div>
            )}

            {activeTab === 'robots' && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    robots.txt tells search engines which pages they can and cannot access.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Generated robots.txt</label>
                    <pre className="w-full p-4 bg-gray-50 border border-gray-300 rounded overflow-x-auto text-sm">
                      {generateRobotsTxt()}
                    </pre>
                  </div>
                </div>
                <button
                  onClick={() => downloadFile(generateRobotsTxt(), 'robots.txt', 'text/plain')}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
                >
                  <Download size={18} />
                  Download robots.txt
                </button>
              </div>
            )}

            {activeTab === 'analysis' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertCircle size={20} className="text-red-500" />
                    Issues Found ({issues.length})
                  </h3>
                  {issues.length === 0 ? (
                    <div className="p-4 bg-green-50 border border-green-200 rounded flex items-center gap-2">
                      <CheckCircle size={20} className="text-green-500" />
                      <span className="text-green-700">No critical issues found!</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {issues.map((issue, idx) => (
                        <div key={idx} className="p-3 bg-red-50 border border-red-200 rounded flex items-center gap-2">
                          <AlertCircle size={18} className="text-red-500" />
                          <span className="text-red-700">{issue}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Suggestions</h3>
                  {suggestions.length === 0 ? (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                      <span className="text-gray-600">No suggestions at this time.</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {suggestions.map((suggestion, idx) => (
                        <div key={idx} className="p-3 bg-blue-50 border border-blue-200 rounded">
                          <span className="text-blue-700">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

