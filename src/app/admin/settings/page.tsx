'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Switch,
  FormControlLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Chip,
  Avatar,
  Badge
} from '@mui/material';
import {
  Settings,
  Security,
  Backup,
  CloudDownload,
  CloudUpload,
  Database,
  Speed,
  Notifications,
  Email,
  Sms,
  Language,
  Palette,
  Storage,
  Memory,
  NetworkCheck,
  Update,
  BugReport,
  Help,
  Info,
  Warning,
  CheckCircle,
  Error,
  Refresh,
  Save,
  RestoreFromTrash,
  DeleteForever,
  Schedule
} from '@mui/icons-material';

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
      id={`settings-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// Mock system data
const systemStatus = {
  uptime: '15 يوم، 7 ساعات',
  cpuUsage: 45,
  memoryUsage: 62,
  diskUsage: 34,
  networkStatus: 'متصل',
  lastBackup: '2024-09-18 02:00:00',
  version: '2.1.4',
  environment: 'production'
};

const backupHistory = [
  {
    id: 1,
    date: '2024-09-18 02:00:00',
    size: '2.4 GB',
    status: 'completed',
    type: 'automatic'
  },
  {
    id: 2,
    date: '2024-09-17 02:00:00',
    size: '2.3 GB',
    status: 'completed',
    type: 'automatic'
  },
  {
    id: 3,
    date: '2024-09-16 02:00:00',
    size: '2.2 GB',
    status: 'failed',
    type: 'automatic'
  }
];

const systemLogs = [
  {
    id: 1,
    timestamp: '2024-09-18 14:30:25',
    level: 'info',
    message: 'تم تسجيل دخول مستخدم جديد',
    source: 'auth_service'
  },
  {
    id: 2,
    timestamp: '2024-09-18 14:25:12',
    level: 'warning',
    message: 'استخدام الذاكرة وصل إلى 85%',
    source: 'system_monitor'
  },
  {
    id: 3,
    timestamp: '2024-09-18 14:20:08',
    level: 'error',
    message: 'فشل في إرسال إشعار بريد إلكتروني',
    source: 'notification_service'
  }
];

export default function SettingsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [backupDialogOpen, setBackupDialogOpen] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [isBackingUp, setIsBackingUp] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'نائبك.كوم',
    siteDescription: 'منصة التواصل مع النواب والمرشحين',
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    notificationFrequency: 'immediate',
    
    // Performance Settings
    cacheEnabled: true,
    compressionEnabled: true,
    cdnEnabled: true,
    maxFileSize: 10,
    
    // Backup Settings
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: 30,
    backupLocation: 'cloud'
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // Implement save settings logic
    console.log('Saving settings:', settings);
    setSnackbarMessage('تم حفظ الإعدادات بنجاح');
    setSnackbarOpen(true);
  };

  const handleCreateBackup = () => {
    setIsBackingUp(true);
    setBackupProgress(0);
    
    // Simulate backup progress
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          setBackupDialogOpen(false);
          setSnackbarMessage('تم إنشاء النسخة الاحتياطية بنجاح');
          setSnackbarOpen(true);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  const getLogLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return <Error />;
      case 'warning': return <Warning />;
      case 'info': return <Info />;
      default: return <CheckCircle />;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            إعدادات النظام ⚙️
          </Typography>
          <Typography variant="body1" color="textSecondary">
            إدارة إعدادات النظام والأمان والنسخ الاحتياطي
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => window.location.reload()}
          >
            تحديث
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSaveSettings}
          >
            حفظ الإعدادات
          </Button>
        </Box>
      </Box>

      {/* System Status Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Speed sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                أداء المعالج
              </Typography>
              <Typography variant="h4" color="success.main">
                {systemStatus.cpuUsage}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={systemStatus.cpuUsage}
                sx={{ mt: 1, height: 6, borderRadius: 3 }}
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Memory sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                استخدام الذاكرة
              </Typography>
              <Typography variant="h4" color="warning.main">
                {systemStatus.memoryUsage}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={systemStatus.memoryUsage}
                color="warning"
                sx={{ mt: 1, height: 6, borderRadius: 3 }}
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Storage sx={{ fontSize: 40, color: '#2196f3', mb: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                مساحة التخزين
              </Typography>
              <Typography variant="h4" color="primary">
                {systemStatus.diskUsage}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={systemStatus.diskUsage}
                sx={{ mt: 1, height: 6, borderRadius: 3 }}
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <NetworkCheck sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                حالة الشبكة
              </Typography>
              <Chip
                label={systemStatus.networkStatus}
                color="success"
                sx={{ mt: 1, fontSize: '1rem', fontWeight: 'bold' }}
              />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                وقت التشغيل: {systemStatus.uptime}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Settings Tabs */}
      <Paper>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="الإعدادات العامة" />
          <Tab label="الأمان" />
          <Tab label="الإشعارات" />
          <Tab label="الأداء" />
          <Tab label="النسخ الاحتياطي" />
          <Tab label="سجلات النظام" />
        </Tabs>

        {/* General Settings Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  معلومات الموقع
                </Typography>
                
                <TextField
                  label="اسم الموقع"
                  fullWidth
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange('siteName', e.target.value)}
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  label="وصف الموقع"
                  fullWidth
                  multiline
                  rows={3}
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                  sx={{ mb: 2 }}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.maintenanceMode}
                      onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                    />
                  }
                  label="وضع الصيانة"
                />
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  إعدادات التسجيل
                </Typography>
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.registrationEnabled}
                      onChange={(e) => handleSettingChange('registrationEnabled', e.target.checked)}
                    />
                  }
                  label="السماح بالتسجيل الجديد"
                  sx={{ mb: 2, display: 'block' }}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailVerificationRequired}
                      onChange={(e) => handleSettingChange('emailVerificationRequired', e.target.checked)}
                    />
                  }
                  label="تأكيد البريد الإلكتروني مطلوب"
                  sx={{ mb: 2, display: 'block' }}
                />
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Security Settings Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  إعدادات الأمان
                </Typography>
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                    />
                  }
                  label="المصادقة الثنائية"
                  sx={{ mb: 2, display: 'block' }}
                />
                
                <TextField
                  label="مهلة انتهاء الجلسة (دقيقة)"
                  type="number"
                  fullWidth
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  label="حد محاولات تسجيل الدخول"
                  type="number"
                  fullWidth
                  value={settings.maxLoginAttempts}
                  onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  label="الحد الأدنى لطول كلمة المرور"
                  type="number"
                  fullWidth
                  value={settings.passwordMinLength}
                  onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
                />
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  معلومات الأمان
                </Typography>
                
                <Alert severity="success" sx={{ mb: 2 }}>
                  آخر تحديث أمني: {systemStatus.version}
                </Alert>
                
                <Alert severity="info" sx={{ mb: 2 }}>
                  البيئة: {systemStatus.environment}
                </Alert>
                
                <Button
                  variant="outlined"
                  startIcon={<Security />}
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  فحص الأمان
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Update />}
                  fullWidth
                >
                  تحديث النظام
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Notifications Settings Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  أنواع الإشعارات
                </Typography>
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    />
                  }
                  label="إشعارات البريد الإلكتروني"
                  sx={{ mb: 2, display: 'block' }}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.smsNotifications}
                      onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                    />
                  }
                  label="إشعارات الرسائل النصية"
                  sx={{ mb: 2, display: 'block' }}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.pushNotifications}
                      onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                    />
                  }
                  label="الإشعارات الفورية"
                  sx={{ mb: 2, display: 'block' }}
                />
                
                <FormControl fullWidth>
                  <InputLabel>تكرار الإشعارات</InputLabel>
                  <Select
                    value={settings.notificationFrequency}
                    onChange={(e) => handleSettingChange('notificationFrequency', e.target.value)}
                    label="تكرار الإشعارات"
                  >
                    <MenuItem value="immediate">فوري</MenuItem>
                    <MenuItem value="hourly">كل ساعة</MenuItem>
                    <MenuItem value="daily">يومي</MenuItem>
                    <MenuItem value="weekly">أسبوعي</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Performance Settings Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  تحسين الأداء
                </Typography>
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.cacheEnabled}
                      onChange={(e) => handleSettingChange('cacheEnabled', e.target.checked)}
                    />
                  }
                  label="تفعيل التخزين المؤقت"
                  sx={{ mb: 2, display: 'block' }}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.compressionEnabled}
                      onChange={(e) => handleSettingChange('compressionEnabled', e.target.checked)}
                    />
                  }
                  label="ضغط البيانات"
                  sx={{ mb: 2, display: 'block' }}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.cdnEnabled}
                      onChange={(e) => handleSettingChange('cdnEnabled', e.target.checked)}
                    />
                  }
                  label="شبكة توصيل المحتوى (CDN)"
                  sx={{ mb: 2, display: 'block' }}
                />
                
                <TextField
                  label="الحد الأقصى لحجم الملف (MB)"
                  type="number"
                  fullWidth
                  value={settings.maxFileSize}
                  onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
                />
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Backup Settings Tab */}
        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  إعدادات النسخ الاحتياطي
                </Typography>
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoBackup}
                      onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                    />
                  }
                  label="النسخ الاحتياطي التلقائي"
                  sx={{ mb: 2, display: 'block' }}
                />
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>تكرار النسخ الاحتياطي</InputLabel>
                  <Select
                    value={settings.backupFrequency}
                    onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                    label="تكرار النسخ الاحتياطي"
                  >
                    <MenuItem value="hourly">كل ساعة</MenuItem>
                    <MenuItem value="daily">يومي</MenuItem>
                    <MenuItem value="weekly">أسبوعي</MenuItem>
                    <MenuItem value="monthly">شهري</MenuItem>
                  </Select>
                </FormControl>
                
                <TextField
                  label="مدة الاحتفاظ (أيام)"
                  type="number"
                  fullWidth
                  value={settings.backupRetention}
                  onChange={(e) => handleSettingChange('backupRetention', parseInt(e.target.value))}
                  sx={{ mb: 2 }}
                />
                
                <Button
                  variant="contained"
                  startIcon={<Backup />}
                  fullWidth
                  onClick={() => setBackupDialogOpen(true)}
                >
                  إنشاء نسخة احتياطية الآن
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  سجل النسخ الاحتياطي
                </Typography>
                
                <List>
                  {backupHistory.map((backup) => (
                    <ListItem key={backup.id}>
                      <ListItemText
                        primary={backup.date}
                        secondary={`${backup.size} - ${backup.type}`}
                      />
                      <ListItemSecondaryAction>
                        <Chip
                          label={backup.status === 'completed' ? 'مكتمل' : 'فاشل'}
                          color={backup.status === 'completed' ? 'success' : 'error'}
                          size="small"
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* System Logs Tab */}
        <TabPanel value={tabValue} index={5}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              سجلات النظام
            </Typography>
            
            <List>
              {systemLogs.map((log) => (
                <ListItem key={log.id}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getLogLevelIcon(log.level)}
                        <Typography variant="body2">
                          {log.message}
                        </Typography>
                      </Box>
                    }
                    secondary={`${log.timestamp} - ${log.source}`}
                  />
                  <ListItemSecondaryAction>
                    <Chip
                      label={log.level}
                      color={getLogLevelColor(log.level) as any}
                      size="small"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </TabPanel>
      </Paper>

      {/* Backup Dialog */}
      <Dialog
        open={backupDialogOpen}
        onClose={() => !isBackingUp && setBackupDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>إنشاء نسخة احتياطية</DialogTitle>
        <DialogContent>
          {isBackingUp ? (
            <Box sx={{ py: 2 }}>
              <Typography variant="body1" gutterBottom>
                جاري إنشاء النسخة الاحتياطية...
              </Typography>
              <LinearProgress
                variant="determinate"
                value={backupProgress}
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="textSecondary">
                {backupProgress}% مكتمل
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1">
              هل تريد إنشاء نسخة احتياطية كاملة من النظام؟ قد تستغرق هذه العملية عدة دقائق.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          {!isBackingUp && (
            <>
              <Button onClick={() => setBackupDialogOpen(false)}>
                إلغاء
              </Button>
              <Button
                onClick={handleCreateBackup}
                variant="contained"
                startIcon={<Backup />}
              >
                بدء النسخ الاحتياطي
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}
