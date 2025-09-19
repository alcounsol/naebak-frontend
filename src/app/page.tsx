'use client';

import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack,
  Paper,
} from '@mui/material';
import {
  AccountBalance,
  People,
  Message,
  TrendingUp,
  Security,
  Speed,
  ArrowBack,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { dataAPI } from '@/lib/api';

interface Statistics {
  total_users: number;
  total_candidates: number;
  total_messages: number;
  total_issues: number;
  resolved_issues: number;
  active_users: number;
}

export default function HomePage() {
  const router = useRouter();
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dataAPI.getStatistics();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const features = [
    {
      icon: <AccountBalance sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'تواصل مع النواب',
      description: 'تواصل مباشر مع نوابك ومرشحيك في البرلمان المصري',
    },
    {
      icon: <Message sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'رسائل قصيرة',
      description: 'أرسل رسائل قصيرة (حتى 500 حرف) للتعبير عن آرائك ومقترحاتك',
    },
    {
      icon: <People sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'مشاكل مفصلة',
      description: 'اكتب مشاكل مفصلة (حتى 1500 حرف) مع إمكانية إرفاق ملفات',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'تقييم النواب',
      description: 'نظام تقييم علني وشفاف لأداء النواب والمرشحين',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'أمان وخصوصية',
      description: 'حماية كاملة لبياناتك الشخصية مع أعلى معايير الأمان',
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'استجابة سريعة',
      description: 'نظام ذكي لتوجيه المشاكل والحصول على ردود سريعة',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h1" component="h1" gutterBottom>
            مرحباً بك في نائبك.كوم
          </Typography>
          <Typography variant="h5" component="h2" sx={{ mb: 4, opacity: 0.9 }}>
            منصة تربط المواطنين بالنواب والمرشحين في مصر
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            شارك في الحياة السياسية، تواصل مع نوابك، وساهم في بناء مصر أفضل من خلال منصة آمنة وشفافة
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
              }}
              onClick={() => router.push('/auth/register')}
            >
              ابدأ الآن
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
              }}
              onClick={() => router.push('/candidates')}
            >
              تصفح المرشحين
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Statistics Section */}
      {stats && (
        <Box sx={{ py: 6, bgcolor: 'grey.50' }}>
          <Container maxWidth="lg">
            <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
              إحصائيات المنصة
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h3" color="primary.main" gutterBottom>
                    {stats.total_users.toLocaleString()}
                  </Typography>
                  <Typography variant="body1">مستخدم مسجل</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h3" color="primary.main" gutterBottom>
                    {stats.total_candidates.toLocaleString()}
                  </Typography>
                  <Typography variant="body1">مرشح ونائب</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h3" color="primary.main" gutterBottom>
                    {stats.total_messages.toLocaleString()}
                  </Typography>
                  <Typography variant="body1">رسالة مرسلة</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h3" color="primary.main" gutterBottom>
                    {stats.resolved_issues.toLocaleString()}
                  </Typography>
                  <Typography variant="body1">مشكلة تم حلها</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            لماذا نائبك.كوم؟
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
          >
            منصة شاملة تجمع بين السهولة والأمان لتعزيز التواصل بين المواطنين ومسؤوليهم
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%', textAlign: 'center' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom>
            انضم إلى آلاف المواطنين
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            كن جزءاً من التغيير الإيجابي في مصر. سجل الآن وابدأ التواصل مع نوابك
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
              }}
              onClick={() => router.push('/auth/register')}
            >
              إنشاء حساب جديد
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
              }}
              onClick={() => router.push('/auth/login')}
            >
              تسجيل الدخول
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, bgcolor: 'grey.900', color: 'white', textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ mb: 2 }}>
            © 2025 نائبك.كوم - جميع الحقوق محفوظة
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Chip label="الخصوصية" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
            <Chip label="الشروط والأحكام" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
            <Chip label="اتصل بنا" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
