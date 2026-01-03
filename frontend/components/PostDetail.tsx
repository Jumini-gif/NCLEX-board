import React from 'react';
import { Post } from '../types';
import { ArrowLeft, Calendar, CheckCircle, Clock, MapPin, Download, Share2, ThumbsUp, MessageCircle, BadgeCheck } from 'lucide-react';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-teal-600 transition-colors mb-6 font-medium"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to List
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-6">
        <div className="flex flex-wrap gap-3 mb-4">
           <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                post.passStatus === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
                {post.passStatus}
            </span>
             {post.isVerified && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    <BadgeCheck size={16} /> Verified Result
                </span>
            )}
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
            {post.title}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between text-slate-500 text-sm border-t border-slate-100 pt-4 gap-4">
            <div className="flex items-center gap-4">
                <span className="font-semibold text-slate-900">{post.author}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>{post.createdAt}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="flex items-center gap-1"><Clock size={14} /> {post.studyPeriod} Prep</span>
            </div>
            <div className="flex gap-2">
                 <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors" onClick={handlePrint}>
                    <Download size={16} /> <span className="hidden sm:inline">Save PDF</span>
                 </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                    <Share2 size={16} /> 
                 </button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-teal-500 rounded-full"></div>
                    Review & Strategy
                </h3>
                <div className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-a:text-teal-600 whitespace-pre-line">
                    {post.content}
                </div>
            </div>

            {post.centerTips && (
                 <div className="bg-orange-50 rounded-2xl border border-orange-100 p-6">
                    <h3 className="text-lg font-bold text-orange-800 mb-3 flex items-center gap-2">
                        <MapPin size={20} /> Center Tips
                    </h3>
                    <p className="text-orange-900/80 leading-relaxed">
                        {post.centerTips}
                    </p>
                </div>
            )}
            
            {/* Interaction */}
             <div className="bg-white rounded-xl border border-slate-200 p-4 flex justify-between items-center">
                <div className="font-medium text-slate-500">Was this helpful?</div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors">
                        <ThumbsUp size={20} /> <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors">
                        <MessageCircle size={20} /> <span>12 Comments</span>
                    </button>
                </div>
             </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
             {/* Background Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Candidate Profile</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                        <span className="text-slate-500">Experience</span>
                        <span className="font-semibold text-slate-800">{post.baseInfo.experience}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                        <span className="text-slate-500">English</span>
                        <span className="font-semibold text-slate-800">{post.baseInfo.englishLevel}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                        <span className="text-slate-500">Work Status</span>
                        <span className="font-semibold text-slate-800">{post.baseInfo.isWorking ? 'Working' : 'Not Working'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500">Exam Date</span>
                        <span className="font-semibold text-slate-800">{post.examDate}</span>
                    </div>
                </div>
            </div>

            {/* Resources Card */}
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Resources Used</h3>
                <div className="flex flex-wrap gap-2">
                    {post.resources.map(res => (
                        <span key={res} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium border border-slate-200">
                            {res}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};