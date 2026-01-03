import React from 'react';
import { Post } from '../types';
import { Calendar, Clock, Eye, ThumbsUp, CheckCircle, Briefcase, BookOpen } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onClick: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <div 
      onClick={() => onClick(post.id)}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md hover:border-teal-300 transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                post.passStatus === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
                {post.passStatus}
            </span>
            {post.isVerified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    <CheckCircle size={10} /> Verified
                </span>
            )}
        </div>
        <span className="text-xs text-slate-400">{post.createdAt}</span>
      </div>

      <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
        {post.title}
      </h3>

      <div className="flex flex-wrap gap-2 mb-4 text-xs text-slate-500">
        <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-100">
            <Clock size={12} /> {post.studyPeriod}
        </div>
        <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-100">
            <Briefcase size={12} /> {post.baseInfo.isWorking ? 'Working' : 'Not Working'}
        </div>
         <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-100">
            <BookOpen size={12} /> {post.baseInfo.englishLevel} Eng
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {post.resources.slice(0, 3).map((res) => (
            <span key={res} className="text-[10px] uppercase font-semibold tracking-wide text-slate-500 bg-slate-100 px-2 py-1 rounded">
                #{res}
            </span>
        ))}
        {post.resources.length > 3 && (
            <span className="text-[10px] text-slate-400 px-1 py-1">+{post.resources.length - 3}</span>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-slate-400 text-xs">
        <span className="font-medium text-slate-600 truncate max-w-[100px]">{post.author}</span>
        <div className="flex gap-3">
            <span className="flex items-center gap-1"><Eye size={14} /> {post.viewCount}</span>
            <span className="flex items-center gap-1 text-teal-600"><ThumbsUp size={14} /> {post.likes}</span>
        </div>
      </div>
    </div>
  );
};