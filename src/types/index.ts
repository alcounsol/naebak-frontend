// تعريفات الأنواع الأساسية للمشروع

export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: 'citizen' | 'candidate' | 'admin';
  phone_number?: string;
  governorate?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Candidate {
  id: string;
  user: User;
  party?: string;
  position: string;
  bio?: string;
  experience?: string;
  education?: string;
  achievements?: string;
  contact_info?: string;
  social_media?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Governorate {
  id: string;
  name: string;
  name_en: string;
  code: string;
  is_active: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface Message {
  id: string;
  sender: User;
  recipient: User;
  subject: string;
  content: string;
  category?: Category;
  is_read: boolean;
  is_urgent: boolean;
  created_at: string;
  updated_at: string;
}

export interface Issue {
  id: string;
  reporter: User;
  assigned_to?: User;
  title: string;
  description: string;
  category: Category;
  governorate: Governorate;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  attachments?: string[];
  created_at: string;
  updated_at: string;
}

export interface Statistics {
  total_users: number;
  total_candidates: number;
  total_messages: number;
  total_issues: number;
  resolved_issues: number;
  active_users: number;
}

// أنواع النماذج
export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
  user_type: 'citizen' | 'candidate';
  phone_number?: string;
  governorate?: string;
}

export interface MessageForm {
  recipient_id: string;
  subject: string;
  content: string;
  category_id?: string;
  is_urgent?: boolean;
}

export interface IssueForm {
  title: string;
  description: string;
  category_id: string;
  governorate_id: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  attachments?: File[];
}

// أنواع الاستجابات من API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

// أنواع الحالة (State)
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  governorates: Governorate[];
  categories: Category[];
  statistics: Statistics | null;
  isLoading: boolean;
  error: string | null;
}
