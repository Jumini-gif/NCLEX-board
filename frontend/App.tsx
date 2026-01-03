import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { StatsHero } from './components/StatsHero';
import { FilterBar } from './components/FilterBar';
import { PostCard } from './components/PostCard';
import { PostDetail } from './components/PostDetail';
import { WritePost } from './components/WritePost';
import { Post, ViewState } from './types';
import { fetchReviews, fetchReview, createReview } from './services/api';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [filters, setFilters] = useState({
    search: '',
    isWorking: 'all',
    englishLevel: 'all',
    resource: 'all'
  });

  // 리뷰 목록 가져오기
  const loadReviews = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchReviews({
        search: filters.search,
        isWorking: filters.isWorking,
        englishLevel: filters.englishLevel,
        resource: filters.resource,
      });
      setPosts(data.reviews);
      setTotal(data.total);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (currentView === 'HOME') {
      loadReviews();
    }
  }, [currentView, loadReviews]);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    if (view === 'HOME') {
      setSelectedPostId(null);
      setSelectedPost(null);
    }
  };

  const handlePostClick = async (id: string) => {
    setSelectedPostId(id);
    setCurrentView('DETAIL');
    try {
      const post = await fetchReview(id);
      setSelectedPost(post);
    } catch (error) {
      console.error('Failed to load review:', error);
    }
  };

  const handleSavePost = async (data: {
    title: string;
    author: string;
    experience: string;
    englishLevel: string;
    isWorking: string;
    studyPeriod: string;
    resources: string[];
    content: string;
    centerTips?: string;
  }) => {
    try {
      // 공부 기간을 개월수로 변환
      let months = 0;
      const match = data.studyPeriod.match(/(\d+)/);
      if (match) {
        months = parseInt(match[1]);
        if (data.studyPeriod.toLowerCase().includes('year')) {
          months *= 12;
        }
      }

      await createReview({
        title: data.title,
        author: data.author,
        experience: data.experience,
        englishLevel: data.englishLevel,
        isWorking: data.isWorking === 'yes',
        studyPeriod: data.studyPeriod,
        studyPeriodMonths: months,
        resources: data.resources,
        content: data.content,
        centerTips: data.centerTips,
      });

      alert("Review submitted successfully!");
      setCurrentView('HOME');
    } catch (error) {
      console.error('Failed to create review:', error);
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-10">
      <Navbar onNavigate={handleNavigate} currentView={currentView} />

      {currentView === 'HOME' && (
        <>
          <StatsHero />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FilterBar filters={filters} setFilters={setFilters} />

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">
                    Recent Reviews <span className="text-slate-400 font-normal text-sm ml-2">({total} results)</span>
                </h2>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent"></div>
                <p className="mt-4 text-slate-500">Loading reviews...</p>
              </div>
            ) : posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} onClick={handlePostClick} />
                ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                    <p className="text-slate-400 text-lg">No reviews found matching your criteria.</p>
                    <button
                        onClick={() => setFilters({ search: '', isWorking: 'all', englishLevel: 'all', resource: 'all' })}
                        className="mt-4 text-teal-600 font-medium hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
          </div>
        </>
      )}

      {currentView === 'DETAIL' && selectedPost && (
        <PostDetail post={selectedPost} onBack={() => handleNavigate('HOME')} />
      )}

      {currentView === 'WRITE' && (
        <WritePost onCancel={() => handleNavigate('HOME')} onSave={handleSavePost} />
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
            <p>&copy; 2024 NCLEX Success Hub. Built for nurses, by nurses.</p>
            <p className="mt-2">Not affiliated with NCSBN or Pearson VUE.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
