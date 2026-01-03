import { Post } from '../types';

const API_BASE = 'http://localhost:8000/api';

// API 응답을 Post 형식으로 변환
function transformReview(data: any): Post {
  return {
    id: String(data.id),
    title: data.title,
    author: data.author,
    passStatus: data.pass_status,
    examDate: data.exam_date || '',
    studyPeriod: data.study_period || '',
    studyPeriodMonths: data.study_period_months || 0,
    baseInfo: {
      experience: data.experience || 'New Grad',
      englishLevel: data.english_level || 'Medium',
      isWorking: Boolean(data.is_working),
    },
    resources: data.resources || [],
    content: data.content,
    centerTips: data.center_tips,
    viewCount: data.view_count || 0,
    likes: data.likes || 0,
    createdAt: data.created_at?.split('T')[0] || data.created_at?.split(' ')[0] || '',
    isVerified: Boolean(data.is_verified),
  };
}

export interface ReviewsResponse {
  reviews: Post[];
  total: number;
  page: number;
  totalPages: number;
}

export interface StatsResponse {
  total_reviews: number;
  pass_rate: number;
  avg_study_months: number;
}

export async function fetchStats(): Promise<StatsResponse> {
  const res = await fetch(`${API_BASE}/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function fetchReviews(params: {
  page?: number;
  search?: string;
  isWorking?: string;
  englishLevel?: string;
  resource?: string;
}): Promise<ReviewsResponse> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set('page', String(params.page));
  if (params.search) searchParams.set('search', params.search);
  if (params.isWorking && params.isWorking !== 'all') searchParams.set('is_working', params.isWorking);
  if (params.englishLevel && params.englishLevel !== 'all') searchParams.set('english_level', params.englishLevel);
  if (params.resource && params.resource !== 'all') searchParams.set('resource', params.resource);

  const res = await fetch(`${API_BASE}/reviews?${searchParams}`);
  if (!res.ok) throw new Error('Failed to fetch reviews');

  const data = await res.json();
  return {
    reviews: data.reviews.map(transformReview),
    total: data.total,
    page: data.page,
    totalPages: data.total_pages,
  };
}

export async function fetchReview(id: string): Promise<Post> {
  const res = await fetch(`${API_BASE}/reviews/${id}`);
  if (!res.ok) throw new Error('Failed to fetch review');

  const data = await res.json();
  return transformReview(data);
}

export async function createReview(review: {
  title: string;
  author: string;
  passStatus?: string;
  examDate?: string;
  studyPeriod?: string;
  studyPeriodMonths?: number;
  experience?: string;
  englishLevel?: string;
  isWorking?: boolean;
  resources?: string[];
  content: string;
  centerTips?: string;
}): Promise<{ id: number }> {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: review.title,
      author: review.author,
      pass_status: review.passStatus || 'Pass',
      exam_date: review.examDate,
      study_period: review.studyPeriod,
      study_period_months: review.studyPeriodMonths,
      experience: review.experience,
      english_level: review.englishLevel,
      is_working: review.isWorking || false,
      resources: review.resources || [],
      content: review.content,
      center_tips: review.centerTips,
    }),
  });

  if (!res.ok) throw new Error('Failed to create review');
  return res.json();
}

export async function likeReview(id: string): Promise<{ likes: number }> {
  const res = await fetch(`${API_BASE}/reviews/${id}/like`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to like review');
  return res.json();
}

export async function fetchComments(reviewId: string): Promise<any[]> {
  const res = await fetch(`${API_BASE}/reviews/${reviewId}/comments`);
  if (!res.ok) throw new Error('Failed to fetch comments');
  const data = await res.json();
  return data.comments;
}

export async function createComment(reviewId: string, author: string, content: string): Promise<{ id: number }> {
  const res = await fetch(`${API_BASE}/reviews/${reviewId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author, content }),
  });

  if (!res.ok) throw new Error('Failed to create comment');
  return res.json();
}
