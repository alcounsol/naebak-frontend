'use client';

import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  CircularProgress,
  Divider,
  Stack,
} from '@mui/material';
import {
  AccountCircle,
  Lock,
  Login as LoginIcon,
  PersonAdd,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { LoginForm } from '@/types';

// Schema للتحقق من صحة البيانات
const loginSchema = yup.object({
  username: yup
    .string()
    .required('اسم المستخدم مطلوب')
    .min(3, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل'),
  password: yup
    .string()
    .required('كلمة المرور مطلوبة')
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [showError, setShowError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setShowError(false);
      await login(data);
      router.push('/dashboard');
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <LoginIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              تسجيل الدخول
            </Typography>
            <Typography variant="body1" color="text.secondary">
              مرحباً بك في نائبك.كوم
            </Typography>
          </Box>

          {/* Error Alert */}
          {showError && error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              {/* Username Field */}
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="اسم المستخدم"
                    variant="outlined"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    InputProps={{
                      startAdornment: (
                        <AccountCircle sx={{ color: 'action.active', mr: 1 }} />
                      ),
                    }}
                    disabled={isLoading}
                  />
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="password"
                    label="كلمة المرور"
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      startAdornment: (
                        <Lock sx={{ color: 'action.active', mr: 1 }} />
                      ),
                    }}
                    disabled={isLoading}
                  />
                )}
              />

              {/* Login Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'تسجيل الدخول'
                )}
              </Button>
            </Stack>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              أو
            </Typography>
          </Divider>

          {/* Register Link */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              ليس لديك حساب؟
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<PersonAdd />}
              onClick={() => router.push('/auth/register')}
              sx={{ borderRadius: 2 }}
            >
              إنشاء حساب جديد
            </Button>
          </Box>

          {/* Footer Links */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Link
                href="#"
                variant="body2"
                color="text.secondary"
                underline="hover"
              >
                نسيت كلمة المرور؟
              </Link>
              <Link
                href="/"
                variant="body2"
                color="text.secondary"
                underline="hover"
              >
                العودة للرئيسية
              </Link>
            </Stack>
          </Box>
        </Paper>

        {/* Demo Credentials */}
        <Paper
          sx={{
            mt: 2,
            p: 2,
            bgcolor: 'info.light',
            color: 'info.contrastText',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>للتجربة:</strong>
          </Typography>
          <Typography variant="body2">
            اسم المستخدم: demo | كلمة المرور: demo123
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
