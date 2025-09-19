'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Button,
  Alert,
  Divider,
  useTheme
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  Message,
  Warning,
  CheckCircle,
  Schedule,
  Visibility,
  MoreVert,
  Refresh,
  Download,
  NotificationImportant,
  Assignment,
  Speed,
  Security
} from '@mui/icons-material';

// Mock data - في التطبيق الحقيقي سيتم جلبها من API
const dashboardStats = {
  totalUsers: 15847,
  activeUsers: 1234,
  totalMessages: 8923,
  todayMessages: 89,
  pendingProblems: 23,
  resolvedProblems: 156,
  systemHealth: 98.5,
  responseTime: 145
};

const recentActivities = [
  {
    id: 1,
    type: 'user_registration',
    user: 'أحمد محمد',
    action: 'تسجيل مستخدم جديد',
    time: '5 دقائق',
    avatar: 'أ',
    color: '#4caf50'
  },
  {
    id: 2,
    type: 'message_sent',
    user: 'فاطمة علي',
    action: 'إرسال رسالة للنائب محمد أحمد',
    time: '12 دقيقة',
    avatar: 'ف',
    color: '#2196f3'
  },
  {
    id: 3,
    type: 'problem_reported',
    user: 'خالد حسن',
    action: 'إبلاغ عن مشكلة في الطرق',
    time: '25 دقيقة',
    avatar: 'خ',
    color: '#ff9800'
  },
  {
    id: 4,
    type: 'problem_resolved',
    user: 'النائب سارة محمد',
    action: 'حل مشكلة في التعليم',
    time: '1 ساعة',
    avatar: 'س',
    color: '#4caf50'
  }
];

const systemAlerts = [
  {
    id: 1,
    type: 'warning',
    title: 'استخدام عالي للخادم',
    message: 'استخدام المعالج وصل إلى 85%',
    time: '10 دقائق'
  },
  {
    id: 2,
    type: 'info',
    title: 'تحديث النظام',
    message: 'تحديث أمني جديد متاح',
    time: '2 ساعة'
  },
  {
    id: 3,
    type: 'success',
    title: 'نسخة احتياطية مكتملة',
    message: 'تم إنشاء النسخة الاحتياطية بنجاح',
    time: '6 ساعات'
  }
];

const StatCard = ({ title, value, change, icon, color, subtitle }: any) => {
  const theme = useTheme();
  const isPositive = change > 0;

  return (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          {isPositive ? (
            <TrendingUp sx={{ color: '#4caf50', mr: 1 }} />
          ) : (
            <TrendingDown sx={{ color: '#f44336', mr: 1 }} />
          )}
          <Typography
            variant="body2"
            sx={{ color: isPositive ? '#4caf50' : '#f44336' }}
          >
            {isPositive ? '+' : ''}{change}%
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
            من الشهر الماضي
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const ActivityItem = ({ activity }: any) => {
  return (
    <ListItem
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        mb: 1,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: activity.color }}>
          {activity.avatar}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={activity.action}
        secondary={`${activity.user} • منذ ${activity.time}`}
        primaryTypographyProps={{ fontWeight: 'medium' }}
      />
      <IconButton size="small">
        <MoreVert />
      </IconButton>
    </ListItem>
  );
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            مرحباً بك في لوحة الإدارة 👋
          </Typography>
          <Typography variant="body1" color="textSecondary">
            إليك نظرة عامة على أداء المنصة اليوم
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            disabled={loading}
          >
            تحديث
          </Button>
          <Button
            variant="contained"
            startIcon={<Download />}
          >
            تصدير التقرير
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="إجمالي المستخدمين"
            value={dashboardStats.totalUsers.toLocaleString()}
            change={12.5}
            icon={<People />}
            color="#4caf50"
            subtitle={`${dashboardStats.activeUsers} نشط اليوم`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="الرسائل اليوم"
            value={dashboardStats.todayMessages}
            change={8.2}
            icon={<Message />}
            color="#2196f3"
            subtitle={`${dashboardStats.totalMessages} إجمالي`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="المشاكل المعلقة"
            value={dashboardStats.pendingProblems}
            change={-5.1}
            icon={<Warning />}
            color="#ff9800"
            subtitle={`${dashboardStats.resolvedProblems} تم حلها`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="صحة النظام"
            value={`${dashboardStats.systemHealth}%`}
            change={2.1}
            icon={<Speed />}
            color="#9c27b0"
            subtitle={`${dashboardStats.responseTime}ms زمن الاستجابة`}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: 'fit-content' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                النشاطات الأخيرة
              </Typography>
              <Chip label="مباشر" color="success" size="small" />
            </Box>
            
            {loading ? (
              <LinearProgress sx={{ mb: 2 }} />
            ) : null}
            
            <List sx={{ p: 0 }}>
              {recentActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </List>
            
            <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
              عرض جميع النشاطات
            </Button>
          </Paper>
        </Grid>

        {/* System Alerts & Quick Actions */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* System Alerts */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                تنبيهات النظام
              </Typography>
              
              {systemAlerts.map((alert) => (
                <Alert
                  key={alert.id}
                  severity={alert.type as any}
                  sx={{ mb: 1 }}
                  action={
                    <IconButton size="small">
                      <MoreVert />
                    </IconButton>
                  }
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    {alert.title}
                  </Typography>
                  <Typography variant="body2">
                    {alert.message}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    منذ {alert.time}
                  </Typography>
                </Alert>
              ))}
            </Paper>

            {/* Quick Actions */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                إجراءات سريعة
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<People />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  إدارة المستخدمين
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Assignment />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  مراجعة المشاكل
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<NotificationImportant />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  إرسال إشعار عام
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Security />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  إعدادات الأمان
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
