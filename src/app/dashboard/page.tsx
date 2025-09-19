'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
  LinearProgress,
  IconButton,
} from '@mui/material';
import {
  Person,
  Email,
  Send,
  Inbox,
  ReportProblem,
  Star,
  Notifications,
  Settings,
  ExitToApp,
  Dashboard as DashboardIcon,
  Message,
  Assignment,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState({
    totalMessages: 0,
    unreadMessages: 0,
    totalProblems: 0,
    pendingProblems: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    
    // Fetch user stats
    fetchUserStats();
  }, [isAuthenticated, router]);

  const fetchUserStats = async () => {
    // This would fetch real stats from the API
    setStats({
      totalMessages: 12,
      unreadMessages: 3,
      totalProblems: 8,
      pendingProblems: 2,
    });
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <Typography>جاري التحميل...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                مرحباً، {user.first_name} {user.last_name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                لوحة التحكم الشخصية
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <IconButton color="primary">
                <Notifications />
              </IconButton>
              <IconButton color="primary">
                <Settings />
              </IconButton>
              <Button
                variant="outlined"
                startIcon={<ExitToApp />}
                onClick={handleLogout}
              >
                تسجيل الخروج
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Grid container spacing={4}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                  }}
                >
                  {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                </Avatar>
                
                <Typography variant="h6" gutterBottom>
                  {user.first_name} {user.last_name}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  @{user.username}
                </Typography>
                
                <Chip
                  label={user.user_type === 'citizen' ? 'مواطن' : 'مرشح/نائب'}
                  color="primary"
                  sx={{ mb: 2 }}
                />
                
                <Stack spacing={1} sx={{ textAlign: 'left' }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Email fontSize="small" color="action" />
                    <Typography variant="body2">{user.email}</Typography>
                  </Stack>
                  
                  {user.phone_number && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Person fontSize="small" color="action" />
                      <Typography variant="body2">{user.phone_number}</Typography>
                    </Stack>
                  )}
                </Stack>
                
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  startIcon={<Settings />}
                >
                  تعديل الملف الشخصي
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Stats and Actions */}
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              {/* Stats Cards */}
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Message color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4">{stats.totalMessages}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      إجمالي الرسائل
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Inbox color="warning" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4">{stats.unreadMessages}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      رسائل غير مقروءة
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Assignment color="error" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4">{stats.totalProblems}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      إجمالي المشاكل
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <ReportProblem color="info" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h4">{stats.pendingProblems}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      مشاكل معلقة
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Quick Actions */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    الإجراءات السريعة
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Send />}
                        onClick={() => router.push('/candidates')}
                      >
                        إرسال رسالة لنائب
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<ReportProblem />}
                        onClick={() => router.push('/candidates')}
                      >
                        الإبلاغ عن مشكلة
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    النشاط الأخير
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Send color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="تم إرسال رسالة إلى النائب أحمد محمد"
                        secondary="منذ يومين"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <ReportProblem color="warning" />
                      </ListItemIcon>
                      <ListItemText
                        primary="تم الإبلاغ عن مشكلة في الطرق"
                        secondary="منذ 3 أيام"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <Star color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="تم تقييم النائب سارة أحمد"
                        secondary="منذ أسبوع"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
