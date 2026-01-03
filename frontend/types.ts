export interface BaseInfo {
  experience: string; // e.g., "New Grad", "3 Years", "5+ Years"
  englishLevel: 'High' | 'Medium' | 'Low';
  isWorking: boolean; // Working while studying
}

export interface Post {
  id: string;
  title: string;
  author: string;
  passStatus: 'Pass' | 'Fail';
  examDate: string;
  studyPeriod: string; // e.g. "3 months"
  studyPeriodMonths: number; // for filtering
  baseInfo: BaseInfo;
  resources: string[];
  content: string; // Markdown-like text
  centerTips?: string;
  viewCount: number;
  likes: number;
  createdAt: string;
  isVerified: boolean; // Verified pass result
}

export type ViewState = 'HOME' | 'DETAIL' | 'WRITE';

export const RESOURCE_OPTIONS = [
  "UWorld",
  "Archer",
  "Saunders",
  "Mark Klimek",
  "Princeton Review",
  "Kaplan",
  "SimpleNursing"
];