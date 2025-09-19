'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  LinearProgress,
  CircularProgress,
  Alert,
  Divider,
  useTheme
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Analytics,
  Download,
  Refresh,
  DateRange,
  People,
  Message,
  Assignment,
  Speed,
  Visibility,
  Share,
  Print,
  FilterList
} from '@mui/icons-material';

// Mock data for analytics
const analyticsData = {
  overview: {
    totalUsers: 15847,
    activeUsers: 1234,
    newUsersToday: 45,
    userGrowthRate: 12.5,
    totalMessages: 8923,
    messagesGrowthRate: 8.2,
    totalProblems: 456,
    resolvedProblems: 387,
    resolutionRate: 84.9,
    avgResponseTime: 2.4
  },
  userStats: [
    { month: 'يناير', users: 1200, active: 980 },
    { month: 'فبراير', users: 1450, active: 1180 },
    { month: 'مارس', users: 1680, active: 1380 },
    { month: 'أبريل', users: 1920, active: 1580 },
    { month: 'مايو', users: 2150, active: 1750 },
    { month: 'يونيو', users: 2380, active: 1920 }
  ],
  messageStats: [
    { category: 'التعليم', count: 1245, percentage: 28.5, color: '#4caf50' },
    { category: 'الصحة', count: 987, percentage: 22.6, color: '#2196f3' },
    { category: 'الطرق والمواصلات', count: 756, percentage: 17.3, color: '#ff9800' },
    { category: 'الخدمات العامة', count: 634, percentage: 14.5, color: '#9c27b0' },
    { category: 'الأمان', count: 423, percentage: 9.7, color: '#f44336' },
    { category: 'أخرى', count: 321, percentage: 7.4, color: '#607d8b' }
  ],
  topCandidates: [
    { name: 'د. أحمد محمد', messages: 234, rating: 4.8, responseTime: '2.1 ساعة' },
    { name: 'م. فاطمة علي', messages: 198, rating: 4.6, responseTime: '3.2 ساعة' },
    { name: 'أ. خالد حسن', messages: 176, rating: 4.4, responseTime: '4.1 ساعة' },
    { name: 'د. سارة أحمد', messages: 154, rating: 4.2, responseTime: '5.3 ساعة' },
    { name: 'م. محمد علي', messages: 132, rating: 4.0, responseTime: '6.2 ساعة' }
  ],
  governorateStats: [
    { name: 'القاهرة', users: 3245, messages: 1876, problems: 234 },
    { name: 'الجيزة', users: 2876, messages: 1654, problems: 198 },
    { name: 'الإسكندرية', users: 2134, messages: 1234, problems: 156 },
    { name: 'الشرقية', users: 1876, messages: 987, problems: 134 },
    { name: 'البحيرة', users: 1654, messages: 876, problems: 112 }
  ]
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const StatCard = ({ title, value, change, icon, color, subtitle, loading = false }: any) => {
  const isPositive = change > 0;

  return (
    <Card sx={{ height: '100%', position: 'relative' }}>
      <CardContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
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
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

const SimpleBarChart = ({ data, title }: any) => {
  const maxValue = Math.max(...data.map((item: any) => item.users));
  
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ mt: 2 }}>
        {data.map((item: any, index: number) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">{item.month}</Typography>
              <Typography variant="body2" fontWeight="bold">
                {item.users.toLocaleString()}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(item.users / maxValue) * 100}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

const CategoryChart = ({ data, title }: any) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ mt: 2 }}>
        {data.map((item: any, index: number) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2">{item.category}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                  {item.count.toLocaleString()}
                </Typography>
                <Chip
                  label={`${item.percentage}%`}
                  size="small"
                  sx={{ bgcolor: item.color, color: 'white', minWidth: 50 }}
                />
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={item.percentage}
              sx={{
                height: 8,
                borderRadius: 4,
                '& .MuiLinearProgress-bar': {
                  bgcolor: item.color
                }
              }}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default function AnalyticsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleTimeRangeChange = (event: any) => {
    setTimeRange(event.target.value);
    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 1500);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting analytics data...');
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            التحليلات والتقارير 📊
          </Typography>
          <Typography variant="body1" color="textSecondary">
            تحليل شامل لأداء المنصة وإحصائيات الاستخدام
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>الفترة الزمنية</InputLabel>
            <Select
              value={timeRange}
              onChange={handleTimeRangeChange}
              label="الفترة الزمنية"
            >
              <MenuItem value="7days">آخر 7 أيام</MenuItem>
              <MenuItem value="30days">آخر 30 يوم</MenuItem>
              <MenuItem value="3months">آخر 3 شهور</MenuItem>
              <MenuItem value="6months">آخر 6 شهور</MenuItem>
              <MenuItem value="1year">السنة الماضية</MenuItem>
            </Select>
          </FormControl>
          
          <IconButton onClick={handleRefresh} disabled={loading}>
            <Refresh />
          </IconButton>
          
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={handleExport}
          >
            تصدير
          </Button>
        </Box>
      </Box>

      {/* Overview Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="إجمالي المستخدمين"
            value={analyticsData.overview.totalUsers.toLocaleString()}
            change={analyticsData.overview.userGrowthRate}
            icon={<People />}
            color="#4caf50"
            subtitle={`${analyticsData.overview.newUsersToday} جديد اليوم`}
            loading={loading}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="إجمالي الرسائل"
            value={analyticsData.overview.totalMessages.toLocaleString()}
            change={analyticsData.overview.messagesGrowthRate}
            icon={<Message />}
            color="#2196f3"
            subtitle="رسالة مرسلة"
            loading={loading}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="معدل الحل"
            value={`${analyticsData.overview.resolutionRate}%`}
            change={5.2}
            icon={<Assignment />}
            color="#ff9800"
            subtitle={`${analyticsData.overview.resolvedProblems} من ${analyticsData.overview.totalProblems}`}
            loading={loading}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="متوسط الاستجابة"
            value={`${analyticsData.overview.avgResponseTime} ساعة`}
            change={-8.1}
            icon={<Speed />}
            color="#9c27b0"
            subtitle="زمن الرد"
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="نمو المستخدمين" />
          <Tab label="تحليل الرسائل" />
          <Tab label="أداء المرشحين" />
          <Tab label="الإحصائيات الجغرافية" />
        </Tabs>

        {/* User Growth Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <SimpleBarChart
                data={analyticsData.userStats}
                title="نمو المستخدمين الشهري"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  إحصائيات المستخدمين
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2">المستخدمين النشطين</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {analyticsData.overview.activeUsers.toLocaleString()}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(analyticsData.overview.activeUsers / analyticsData.overview.totalUsers) * 100}
                    sx={{ mb: 3, height: 8, borderRadius: 4 }}
                  />
                  
                  <Alert severity="info">
                    معدل النشاط: {((analyticsData.overview.activeUsers / analyticsData.overview.totalUsers) * 100).toFixed(1)}%
                  </Alert>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Message Analysis Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <CategoryChart
                data={analyticsData.messageStats}
                title="توزيع الرسائل حسب الفئة"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  ملخص الرسائل
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  {analyticsData.messageStats.slice(0, 3).map((category, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: category.color
                          }}
                        />
                        <Typography variant="body2">{category.category}</Typography>
                      </Box>
                      <Typography variant="h6" fontWeight="bold">
                        {category.count.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {category.percentage}% من الإجمالي
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Candidates Performance Tab */}
        <TabPanel value={tabValue} index={2}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>المرشح</TableCell>
                  <TableCell align="center">عدد الرسائل</TableCell>
                  <TableCell align="center">التقييم</TableCell>
                  <TableCell align="center">متوسط الاستجابة</TableCell>
                  <TableCell align="center">الحالة</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {analyticsData.topCandidates.map((candidate, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: '#2196f3' }}>
                          {candidate.name.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" fontWeight="medium">
                          {candidate.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" fontWeight="bold">
                        {candidate.messages}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <Typography variant="body2" fontWeight="bold">
                          {candidate.rating}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          / 5.0
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {candidate.responseTime}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={candidate.rating >= 4.5 ? 'ممتاز' : candidate.rating >= 4.0 ? 'جيد' : 'متوسط'}
                        color={candidate.rating >= 4.5 ? 'success' : candidate.rating >= 4.0 ? 'primary' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Geographic Statistics Tab */}
        <TabPanel value={tabValue} index={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>المحافظة</TableCell>
                  <TableCell align="center">عدد المستخدمين</TableCell>
                  <TableCell align="center">الرسائل</TableCell>
                  <TableCell align="center">المشاكل</TableCell>
                  <TableCell align="center">النشاط</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {analyticsData.governorateStats.map((gov, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {gov.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" fontWeight="bold">
                        {gov.users.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {gov.messages.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {gov.problems}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <LinearProgress
                        variant="determinate"
                        value={(gov.messages / gov.users) * 10}
                        sx={{ width: 60, height: 6, borderRadius: 3 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </Box>
  );
}
