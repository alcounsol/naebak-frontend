import axios from 'axios';

// إعداد Axios للتواصل مع Backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://naebak-backend-822351033701.us-central1.run.app';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// إضافة token إلى كل طلب إذا كان متوفراً
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// معالجة الاستجابات والأخطاء
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // إزالة token المنتهي الصلاحية
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // إعادة توجيه لصفحة تسجيل الدخول
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// دوال API محددة
export const authAPI = {
  login: (credentials: { username: string; password: string }) =>
    api.post('/auth/login/', credentials),
  
  register: (userData: any) =>
    api.post('/auth/register/', userData),
  
  logout: () =>
    api.post('/auth/logout/'),
  
  getCurrentUser: () =>
    api.get('/auth/user/'),
  
  refreshToken: () =>
    api.post('/auth/refresh/'),
};

export const candidatesAPI = {
  getAll: (params?: any) =>
    api.get('/candidates/', { params }),
  
  getById: (id: string) =>
    api.get(`/candidates/${id}/`),
  
  search: (query: string) =>
    api.get(`/candidates/search/?q=${query}`),
};

export const messagesAPI = {
  getConversations: () =>
    api.get('/messaging/conversations/'),
  
  getMessages: (conversationId: string) =>
    api.get(`/messaging/conversations/${conversationId}/messages/`),
  
  sendMessage: (messageData: any) =>
    api.post('/messaging/messages/', messageData),
  
  markAsRead: (messageId: string) =>
    api.patch(`/messaging/messages/${messageId}/`, { is_read: true }),
};

export const issuesAPI = {
  getAll: (params?: any) =>
    api.get('/issues/', { params }),
  
  getById: (id: string) =>
    api.get(`/issues/${id}/`),
  
  create: (issueData: any) =>
    api.post('/issues/', issueData),
  
  update: (id: string, issueData: any) =>
    api.patch(`/issues/${id}/`, issueData),
  
  delete: (id: string) =>
    api.delete(`/issues/${id}/`),
};

export const dataAPI = {
  getGovernorates: () =>
    api.get('/governorates/'),
  
  getCategories: () =>
    api.get('/categories/'),
  
  getStatistics: () =>
    api.get('/statistics/'),
  
  getHealthCheck: () =>
    api.get('/health/'),
};
