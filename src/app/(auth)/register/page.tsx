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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import {
  AccountCircle,
  Lock,
  Email,
  Person,
  Phone,
  LocationOn,
  PersonAdd,
  Login as LoginIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { RegisterForm, Governorate } from '@/types';
import { dataAPI } from '@/lib/api';

// Schema للتحقق من صحة البيانات
const registerSchema = yup.object({
  username: yup
    .string()
    .required('اسم المستخدم مطلوب')
    .min(3, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل')
    .matches(/^[a-zA-Z0-9_]+$/, 'اسم المستخدم يجب أن يحتوي على أحرف وأرقام فقط'),
  email: yup
    .string()
    .required('البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صحيح'),
  password: yup
    .string()
    .required('كلمة المرور مطلوبة')
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم'
    ),
  password_confirm: yup
    .string()
    .required('تأكيد كلمة المرور مطلوب')
    .oneOf([yup.ref('password')], 'كلمة المرور غير متطابقة'),
  first_name: yup
    .string()
    .required('الاسم الأول مطلوب')
    .min(2, 'الاسم الأول يجب أن يكون حرفين على الأقل'),
  last_name: yup
    .string()
    .required('الاسم الأخير مطلوب')
    .min(2, 'الاسم الأخير يجب أن يكون حرفين على الأقل'),
  user_type: yup
    .string()
    .required('نوع المستخدم مطلوب')
    .oneOf(['citizen', 'candidate'], 'نوع المستخدم غير صحيح'),
  phone_number: yup
    .string()
    .matches(/^01[0-2,5]{1}[0-9]{8}$/, 'رقم الهاتف غير صحيح (مثال: 01012345678)'),
  governorate: yup.string(),
});

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error } = useAuthStore();
  const [showError, setShowError] = useState(false);
  const [governorates, setGovernorates] = useState<Governorate[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      password_confirm: '',
      first_name: '',
      last_name: '',
      user_type: 'citizen',
      phone_number: '',
      governorate: '',
    },
  });

  const userType = watch('user_type');

  useEffect(() => {
    const fetchGovernorates = async () => {
      try {
        const response = await dataAPI.getGovernorates();
        setGovernorates(response.data);
      } catch (error) {
        console.error('Failed to fetch governorates:', error);
      }
    };

    fetchGovernorates();
  }, []);

  const onSubmit = async (data: RegisterForm) => {
    try {
      setShowError(false);
      await register(data);
      router.push('/dashboard');
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="md">
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
            <PersonAdd sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              إنشاء حساب جديد
            </Typography>
            <Typography variant="body1" color="text.secondary">
              انضم إلى منصة نائبك.كوم
            </Typography>
          </Box>

          {/* Error Alert */}
          {showError && error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Register Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              {/* User Type Selection */}
              <Controller
                name="user_type"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.user_type}>
                    <InputLabel>نوع المستخدم</InputLabel>
                    <Select {...field} label="نوع المستخدم" disabled={isLoading}>
                      <MenuItem value="citizen">مواطن</MenuItem>
                      <MenuItem value="candidate">مرشح/نائب</MenuItem>
                    </Select>
                    <FormHelperText>{errors.user_type?.message}</FormHelperText>
                  </FormControl>
                )}
              />

              {/* Name Fields */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="الاسم الأول"
                      variant="outlined"
                      error={!!errors.first_name}
                      helperText={errors.first_name?.message}
                      InputProps={{
                        startAdornment: (
                          <Person sx={{ color: 'action.active', mr: 1 }} />
                        ),
                      }}
                      disabled={isLoading}
                    />
                  )}
                />
                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="الاسم الأخير"
                      variant="outlined"
                      error={!!errors.last_name}
                      helperText={errors.last_name?.message}
                      disabled={isLoading}
                    />
                  )}
                />
              </Stack>

              {/* Username and Email */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="email"
                      label="البريد الإلكتروني"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputProps={{
                        startAdornment: (
                          <Email sx={{ color: 'action.active', mr: 1 }} />
                        ),
                      }}
                      disabled={isLoading}
                    />
                  )}
                />
              </Stack>

              {/* Password Fields */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
                <Controller
                  name="password_confirm"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="password"
                      label="تأكيد كلمة المرور"
                      variant="outlined"
                      error={!!errors.password_confirm}
                      helperText={errors.password_confirm?.message}
                      InputProps={{
                        startAdornment: (
                          <Lock sx={{ color: 'action.active', mr: 1 }} />
                        ),
                      }}
                      disabled={isLoading}
                    />
                  )}
                />
              </Stack>

              {/* Phone and Governorate */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="رقم الهاتف (اختياري)"
                      variant="outlined"
                      error={!!errors.phone_number}
                      helperText={errors.phone_number?.message}
                      placeholder="01012345678"
                      InputProps={{
                        startAdornment: (
                          <Phone sx={{ color: 'action.active', mr: 1 }} />
                        ),
                      }}
                      disabled={isLoading}
                    />
                  )}
                />
                <Controller
                  name="governorate"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.governorate}>
                      <InputLabel>المحافظة (اختياري)</InputLabel>
                      <Select
                        {...field}
                        label="المحافظة (اختياري)"
                        disabled={isLoading}
                        startAdornment={
                          <LocationOn sx={{ color: 'action.active', mr: 1 }} />
                        }
                      >
                        <MenuItem value="">اختر المحافظة</MenuItem>
                        {governorates.map((gov) => (
                          <MenuItem key={gov.id} value={gov.id}>
                            {gov.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.governorate?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Stack>

              {/* Register Button */}
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
                  mt: 2,
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'إنشاء الحساب'
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

          {/* Login Link */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              لديك حساب بالفعل؟
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<LoginIcon />}
              onClick={() => router.push('/auth/login')}
              sx={{ borderRadius: 2 }}
            >
              تسجيل الدخول
            </Button>
          </Box>

          {/* Footer Links */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Link
                href="/privacy"
                variant="body2"
                color="text.secondary"
                underline="hover"
              >
                سياسة الخصوصية
              </Link>
              <Link
                href="/terms"
                variant="body2"
                color="text.secondary"
                underline="hover"
              >
                الشروط والأحكام
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
      </Container>
    </Box>
  );
}
