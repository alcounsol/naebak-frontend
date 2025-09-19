import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/types';
import { authAPI } from '@/lib/api';

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: { username: string; password: string }) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  getCurrentUser: () => Promise<void>;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.login(credentials);
          const { user, access_token } = response.data;
          
          set({
            user,
            token: access_token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          // حفظ في localStorage
          localStorage.setItem('token', access_token);
          localStorage.setItem('user', JSON.stringify(user));
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'فشل في تسجيل الدخول';
          set({
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.register(userData);
          const { user, access_token } = response.data;
          
          set({
            user,
            token: access_token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          // حفظ في localStorage
          localStorage.setItem('token', access_token);
          localStorage.setItem('user', JSON.stringify(user));
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'فشل في إنشاء الحساب';
          set({
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      logout: () => {
        // إزالة من localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // مسح الحالة
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        
        // استدعاء API logout (اختياري)
        authAPI.logout().catch(() => {
          // تجاهل الأخطاء في logout
        });
      },

      getCurrentUser: async () => {
        const { token } = get();
        if (!token) return;
        
        set({ isLoading: true });
        try {
          const response = await authAPI.getCurrentUser();
          const user = response.data;
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          // تحديث localStorage
          localStorage.setItem('user', JSON.stringify(user));
        } catch (error: any) {
          // إذا فشل في الحصول على المستخدم، قم بتسجيل الخروج
          get().logout();
        }
      },

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setError: (error) => set({ error }),
      setLoading: (isLoading) => set({ isLoading }),
      
      clearAuth: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
