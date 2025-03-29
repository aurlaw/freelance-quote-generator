"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Quote {
  id: number;
  projectType: string;
  scope: string;
  isRush: boolean;
  estimatedCost: number;
  estimatedTime: string;
}

export default function QuoteDetail() {
  const { id } = useParams();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get(`/api/quotes/${id}`);
        setQuote(response.data);
      } catch (error) {
        console.error('Error fetching quote:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuote();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Quote not found</p>
      </div>
    );
  }

  return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Quote Details</h1>
        <div className="space-y-4">
          <p className="text-lg">
            Project Type: <span className="font-semibold">{quote.projectType}</span>
          </p>
          <p className="text-lg">
            Scope: <span className="font-semibold">{quote.scope}</span>
          </p>
          <p className="text-lg">
            Rush Job: <span className="font-semibold">{quote.isRush ? 'Yes' : 'No'}</span>
          </p>
          <p className="text-lg">
            Estimated Cost: <span className="font-semibold">${quote.estimatedCost.toFixed(2)}</span>
          </p>
          <p className="text-lg">
            Estimated Time: <span className="font-semibold">{quote.estimatedTime}</span>
          </p>
        <Link href="/" className="mt-6 block text-center p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}