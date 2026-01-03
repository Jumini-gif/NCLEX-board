import React from 'react';
import { Stethoscope, PenSquare } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('HOME')}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-teal-500 p-2 rounded-lg text-white">
                <Stethoscope size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">NCLEX Success Hub</h1>
                <p className="text-xs text-slate-500 font-medium">RN Pass Community</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('HOME')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'HOME' ? 'text-teal-600 bg-teal-50' : 'text-slate-600 hover:text-teal-600'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => onNavigate('WRITE')}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md"
            >
              <PenSquare size={16} />
              <span>Write Review</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};