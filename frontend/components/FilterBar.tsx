import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { RESOURCE_OPTIONS } from '../types';

interface FilterState {
  search: string;
  isWorking: string; // 'all' | 'yes' | 'no'
  englishLevel: string; // 'all' | 'High' | 'Medium' | 'Low'
  resource: string;
}

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  const handleChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search titles, authors, content..."
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition-all"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <div className="relative min-w-[140px]">
             <select
              className="block w-full pl-3 pr-8 py-2 text-sm border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 bg-slate-50"
              value={filters.isWorking}
              onChange={(e) => handleChange('isWorking', e.target.value)}
            >
              <option value="all">Working Status</option>
              <option value="yes">Working (Job)</option>
              <option value="no">Not Working</option>
            </select>
          </div>

          <div className="relative min-w-[140px]">
             <select
              className="block w-full pl-3 pr-8 py-2 text-sm border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 bg-slate-50"
              value={filters.englishLevel}
              onChange={(e) => handleChange('englishLevel', e.target.value)}
            >
              <option value="all">English Level</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="relative min-w-[140px]">
             <select
              className="block w-full pl-3 pr-8 py-2 text-sm border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 bg-slate-50"
              value={filters.resource}
              onChange={(e) => handleChange('resource', e.target.value)}
            >
              <option value="all">Resource Used</option>
              {RESOURCE_OPTIONS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          
           <button 
            onClick={() => setFilters({ search: '', isWorking: 'all', englishLevel: 'all', resource: 'all' })}
            className="p-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            title="Reset Filters"
           >
             <RefreshCw size={20} />
           </button>
        </div>
      </div>
    </div>
  );
};