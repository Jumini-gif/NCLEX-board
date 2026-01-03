import React, { useState } from 'react';
import { RESOURCE_OPTIONS, ViewState } from '../types';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

interface FormData {
  title: string;
  author: string;
  experience: string;
  englishLevel: string;
  isWorking: string;
  studyPeriod: string;
  resources: string[];
  content: string;
  centerTips?: string;
}

interface WritePostProps {
  onCancel: () => void;
  onSave: (data: FormData) => void;
}

export const WritePost: React.FC<WritePostProps> = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    author: '',
    experience: 'New Grad',
    englishLevel: 'Medium',
    isWorking: 'no',
    studyPeriod: '',
    resources: [],
    content: '',
    centerTips: ''
  });

  const handleResourceToggle = (res: string) => {
    setFormData(prev => {
        if (prev.resources.includes(res)) {
            return { ...prev, resources: prev.resources.filter(r => r !== res) };
        }
        return { ...prev, resources: [...prev.resources, res] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.title || !formData.content || !formData.author) return;
    onSave(formData);
  };

  const applyTemplate = (type: 'daily' | 'tips' | 'general') => {
      let template = '';
      if (type === 'general') {
          template = `### 1. 공부 배경\n(졸업 연차, 영어 베이스 등)\n\n### 2. 기간별 공부법\n- 첫 1달:\n- 2~3달차:\n\n### 3. 시험장 후기\n\n### 4. 후배들에게 한마디`;
      } else if (type === 'daily') {
          template = `### 직장 병행 하루 루틴\n\n- 07:00 ~ 16:00 : 근무\n- 19:00 ~ 21:00 : 문제 풀이 (50문제)\n- 21:00 ~ 22:00 : 오답 정리`;
      }
      setFormData(prev => ({ ...prev, content: template }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
        <button 
        onClick={onCancel}
        className="flex items-center text-slate-500 hover:text-teal-600 transition-colors mb-6 font-medium"
      >
        <ArrowLeft size={20} className="mr-2" /> Cancel
      </button>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-teal-600 px-6 py-4 border-b border-teal-700">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Write Your Review
            </h2>
            <p className="text-teal-100 text-sm mt-1">Share your success story to inspire others.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            {/* Author */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nickname *</label>
                <input
                    type="text"
                    className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Your nickname"
                    value={formData.author}
                    onChange={e => setFormData({...formData, author: e.target.value})}
                    required
                />
            </div>

            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                <input
                    type="text"
                    className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="e.g. Passed in 75 questions! How I studied with a full-time job"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    required
                />
            </div>

            {/* Base Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
                     <select 
                        className="w-full rounded-lg border-slate-300 border p-2.5 bg-white"
                        value={formData.experience}
                        onChange={e => setFormData({...formData, experience: e.target.value})}
                     >
                         <option>New Grad</option>
                         <option>1-2 Years</option>
                         <option>3-5 Years</option>
                         <option>5+ Years</option>
                     </select>
                </div>
                 <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">English Level</label>
                     <select 
                        className="w-full rounded-lg border-slate-300 border p-2.5 bg-white"
                        value={formData.englishLevel}
                        onChange={e => setFormData({...formData, englishLevel: e.target.value})}
                     >
                         <option>Low</option>
                         <option>Medium</option>
                         <option>High</option>
                     </select>
                </div>
                <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Working Status</label>
                     <select 
                        className="w-full rounded-lg border-slate-300 border p-2.5 bg-white"
                        value={formData.isWorking}
                        onChange={e => setFormData({...formData, isWorking: e.target.value})}
                     >
                         <option value="yes">Working</option>
                         <option value="no">Not Working</option>
                     </select>
                </div>
            </div>

            {/* Resources */}
            <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Resources Used</label>
                 <div className="flex flex-wrap gap-2">
                     {RESOURCE_OPTIONS.map(res => (
                         <button
                            key={res}
                            type="button"
                            onClick={() => handleResourceToggle(res)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                formData.resources.includes(res)
                                ? 'bg-teal-100 border-teal-200 text-teal-800'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                         >
                             {res}
                         </button>
                     ))}
                 </div>
            </div>

             {/* Study Period */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Study Period</label>
                <input 
                    type="text" 
                    className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g. 3 months"
                    value={formData.studyPeriod}
                    onChange={e => setFormData({...formData, studyPeriod: e.target.value})}
                />
            </div>

            {/* Content with Templates */}
            <div>
                 <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-slate-700">Content</label>
                    <div className="flex gap-2 text-xs">
                        <span className="text-slate-400 self-center mr-1">Templates:</span>
                        <button type="button" onClick={() => applyTemplate('general')} className="text-teal-600 hover:underline">General Strategy</button>
                        <span className="text-slate-300">|</span>
                        <button type="button" onClick={() => applyTemplate('daily')} className="text-teal-600 hover:underline">Daily Routine</button>
                    </div>
                 </div>
                 <textarea 
                    className="w-full rounded-lg border-slate-300 border p-3 min-h-[300px] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-sm"
                    placeholder="Describe your study method..."
                    value={formData.content}
                    onChange={e => setFormData({...formData, content: e.target.value})}
                    required
                 />
                 <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                    <AlertCircle size={12} /> Markdown supported
                 </p>
            </div>

            {/* Center Tips */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Test Center Tips (Optional)</label>
                <textarea
                    className="w-full rounded-lg border-slate-300 border p-3 min-h-[100px] focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Any tips about the test center, environment, what to bring, etc."
                    value={formData.centerTips}
                    onChange={e => setFormData({...formData, centerTips: e.target.value})}
                />
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button 
                    type="button" 
                    onClick={onCancel}
                    className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="px-5 py-2.5 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 shadow-sm transition-all flex items-center gap-2"
                >
                    <Save size={18} /> Submit Review
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};