import React, { useState, useEffect } from 'react';
import { Award, TrendingUp, Users } from 'lucide-react';
import { fetchStats, StatsResponse } from '../services/api';

export const StatsHero: React.FC = () => {
  const [stats, setStats] = useState<StatsResponse>({
    total_reviews: 0,
    pass_rate: 0,
    avg_study_months: 4
  });

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch(err => console.error('Failed to fetch stats:', err));
  }, []);

  return (
    <div className="bg-white border-b border-slate-200 pb-8 pt-6 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">
              Your Journey to <span className="text-teal-600">RN License</span> Starts Here
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Explore verified passing strategies from nurses who have been in your shoes.
              From study plans to test center tips.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 text-center">
                <div className="flex justify-center mb-2 text-teal-600"><Users size={24} /></div>
                <div className="font-bold text-2xl text-slate-800">{stats.total_reviews.toLocaleString()}</div>
                <div className="text-xs text-slate-500 uppercase font-semibold">Reviews</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                <div className="flex justify-center mb-2 text-blue-600"><Award size={24} /></div>
                <div className="font-bold text-2xl text-slate-800">{stats.pass_rate}%</div>
                <div className="text-xs text-slate-500 uppercase font-semibold">Pass Rate</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-center">
                <div className="flex justify-center mb-2 text-orange-600"><TrendingUp size={24} /></div>
                <div className="font-bold text-2xl text-slate-800">{stats.avg_study_months} Mo</div>
                <div className="text-xs text-slate-500 uppercase font-semibold">Avg Study Time</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-teal-700 p-8 rounded-2xl shadow-lg hidden md:block text-white">
            <h3 className="text-xl font-bold mb-4">Share Your Story</h3>
            <p className="text-teal-100 mb-4">
              Help fellow nurses by sharing your NCLEX journey. Your experience could be the motivation someone needs!
            </p>
            <div className="flex gap-4 text-sm">
              <div className="bg-white/20 px-3 py-2 rounded-lg">
                <span className="font-bold">Step 1:</span> Write your review
              </div>
              <div className="bg-white/20 px-3 py-2 rounded-lg">
                <span className="font-bold">Step 2:</span> Inspire others
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
