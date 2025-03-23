import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
    const [formData, setFormData] = useState({
        projectType: 'Website',
        scope: 'Small',
        isRush: false,
    });
    const [result, setResult] = useState<{ cost: number; time: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/quotes', formData); // Proxied by Vite
            setResult({ cost: response.data.estimatedCost, time: response.data.estimatedTime });
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Freelance Quote Generator</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Project Type</label>
                        <select
                            value={formData.projectType}
                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Website">Website</option>
                            <option value="Web App">Web App</option>
                            <option value="Mobile Add-On">Mobile Add-On</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Scope</label>
                        <select
                            value={formData.scope}
                            onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Small">Small (1-3 pages)</option>
                            <option value="Medium">Medium (4-7 pages)</option>
                            <option value="Large">Large (8+ pages)</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={formData.isRush}
                                onChange={(e) => setFormData({ ...formData, isRush: e.target.checked })}
                                className="mr-2"
                            />
                            Rush Job (+20% cost, faster delivery)
                        </label>
                    </div>
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Get Quote
                    </button>
                </form>
                {result && (
                    <div className="mt-4 p-4 bg-green-100 rounded text-center">
                        <p>Estimated Cost: ${result.cost.toFixed(2)}</p>
                        <p>Estimated Time: {result.time}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App
