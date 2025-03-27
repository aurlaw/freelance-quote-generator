"use client"; // Client-side component

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [formData, setFormData] = useState({
    projectType: 'Website',
    scope: 'Small',
    isRush: false,
  });
  const [result, setResult] = useState<{ id?: number; cost: number; time: string } | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/quotes', formData);
      setResult({
        id: response.data.id,
        cost: response.data.estimatedCost,
        time: response.data.estimatedTime,
      });
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Freelance Quote Generator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Project Type</label>
            <select
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Website">Website</option>
              <option value="Web App">Web App</option>
              <option value="Mobile Add-On">Mobile Add-On</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Scope</label>
            <select
              value={formData.scope}
              onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Small">Small (1-3 pages)</option>
              <option value="Medium">Medium (4-7 pages)</option>
              <option value="Large">Large (8+ pages)</option>
            </select>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isRush}
                onChange={(e) => setFormData({ ...formData, isRush: e.target.checked })}
                className="mr-2 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm">Rush Job (+20% cost, faster delivery)</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Get Quote
          </button>
        </form>
        {result && (
          <div className="mt-6 p-4 bg-gray-700 rounded text-center">
            <p className="text-lg">
              Estimated Cost: <span className="font-semibold">${result.cost.toFixed(2)}</span>
            </p>
            <p className="text-lg">
              Estimated Time: <span className="font-semibold">{result.time}</span>
            </p>
            {result.id && (
              <Link
                href={`/quote/${result.id}`}
                className="mt-4 inline-block p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                View Quote Details
              </Link>
            )}
          </div>
        )}        
      </div>
    </div>
  );
}