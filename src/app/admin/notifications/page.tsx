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
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Badge,
  Tabs,
  Tab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
  Fab,
  Menu,
  ListItemIcon
} from '@mui/material';
import {
  Notifications,
  NotificationImportant,
  Add,
  Send,
  Delete,
  Edit,
  MarkAsUnread,
  MarkEmailRead,
  FilterList,
  Search,
  Refresh,
  Settings,
  People,
  Message,
  Warning,
  Info,
  CheckCircle,
  Schedule,
  Visibility,
  MoreVert,
  Campaign,
  PersonAdd,
  Assignment,
  Security
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
      id={`notification-tabpanel-${index}`}
      aria-labelledby={`notification-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// Mock data
const notifications = [
  {
    id: 1,
    type: 'user_registration',
    title: 'مستخدم جديد',
    message: 'انضم أحمد محمد إلى المنصة',
    time: '5 دقائق',
    read: false,
    priority: 'medium',
    category: 'users',
    avatar: 'أ',
    color: '#4caf50'
  },
  {
    id: 2,
    type: 'message_urgent',
    title: 'رسالة عاجلة',
    message: 'رسالة عاجلة من المواطن خالد حسن حول مشكلة في الكهرباء',
    time: '12 دقيقة',
    read: false,
    priority: 'high',
    category: 'messages',
    avatar: 'خ',
    color: '#f44336'
  },
  {
    id: 3,
    type: 'system_alert',
    title: 'تنبيه النظام',
    message: 'استخدام الخادم وصل إلى 85%',
    time: '25 دقيقة',
    read: true,
    priority: 'high',
    category: 'system',
    avatar: '⚠️',
    color: '#ff9800'
  },
  {
    id: 4,
    type: 'problem_resolved',
    title: 'تم حل المشكلة',
    message: 'تم حل مشكلة الطرق في منطقة المعادي',
    time: '1 ساعة',
    read: true,
    priority: 'low',
    category: 'problems',
    avatar: '✅',
    color: '#4caf50'
  }
];

const notificationStats = {
  total: 156,
  unread: 23,
  urgent: 5,
  today: 34
};

const NotificationCard = ({ notification, onMarkRead, onDelete }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#757575';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'عاجل';
      case 'medium': return 'متوسط';
      case 'low': return 'عادي';
      default: return 'غير محدد';
    }
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        border: !notification.read ? '2px solid #2196f3' : '1px solid #e0e0e0',
        bgcolor: !notification.read ? '#f3f8ff' : 'white'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Avatar sx={{ bgcolor: notification.color }}>
            {notification.avatar}
          </Avatar>
          
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {notification.title}
              </Typography>
              <Chip 
                label={getPriorityLabel(notification.priority)}
                size="small"
                sx={{ 
                  bgcolor: getPriorityColor(notification.priority),
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
              {!notification.read && (
                <Chip label="جديد" size="small" color="primary" />
              )}
            </Box>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              {notification.message}
            </Typography>
            
            <Typography variant="caption" color="textSecondary">
              منذ {notification.time}
            </Typography>
          </Box>
          
          <IconButton onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
        </Box>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { onMarkRead(notification.id); handleMenuClose(); }}>
          <ListItemIcon>
            {notification.read ? <MarkAsUnread /> : <MarkEmailRead />}
          </ListItemIcon>
          {notification.read ? 'تحديد كغير مقروء' : 'تحديد كمقروء'}
        </MenuItem>
        <MenuItem onClick={() => { onDelete(notification.id); handleMenuClose(); }}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          حذف الإشعار
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default function NotificationsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  // New notification form state
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info',
    priority: 'medium',
    targetAudience: 'all',
    scheduleTime: ''
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCreateNotification = () => {
    // Implement create notification logic
    console.log('Creating notification:', newNotification);
    setCreateDialogOpen(false);
    setSnackbarMessage('تم إرسال الإشعار بنجاح');
    setSnackbarOpen(true);
    // Reset form
    setNewNotification({
      title: '',
      message: '',
      type: 'info',
      priority: 'medium',
      targetAudience: 'all',
      scheduleTime: ''
    });
  };

  const handleMarkRead = (id: number) => {
    setSnackbarMessage('تم تحديث حالة الإشعار');
    setSnackbarOpen(true);
  };

  const handleDeleteNotification = (id: number) => {
    setSnackbarMessage('تم حذف الإشعار');
    setSnackbarOpen(true);
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || notification.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || notification.priority === selectedPriority;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            إدارة الإشعارات 🔔
          </Typography>
          <Typography variant="body1" color="textSecondary">
            إدارة وإرسال الإشعارات للمستخدمين والإدارة
          </Typography>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Badge badgeContent={notificationStats.total} color="primary" max={999}>
                <Notifications sx={{ fontSize: 40, color: '#2196f3', mb: 1 }} />
              </Badge>
              <Typography variant="h6" fontWeight="bold">
                إجمالي الإشعارات
              </Typography>
              <Typography variant="h4" color="primary">
                {notificationStats.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Badge badgeContent={notificationStats.unread} color="error" max={999}>
                <MarkAsUnread sx={{ fontSize: 40, color: '#f44336', mb: 1 }} />
              </Badge>
              <Typography variant="h6" fontWeight="bold">
                غير مقروءة
              </Typography>
              <Typography variant="h4" color="error">
                {notificationStats.unread}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Badge badgeContent={notificationStats.urgent} color="warning" max={999}>
                <NotificationImportant sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
              </Badge>
              <Typography variant="h6" fontWeight="bold">
                عاجلة
              </Typography>
              <Typography variant="h4" color="warning.main">
                {notificationStats.urgent}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Badge badgeContent={notificationStats.today} color="success" max={999}>
                <Schedule sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
              </Badge>
              <Typography variant="h6" fontWeight="bold">
                اليوم
              </Typography>
              <Typography variant="h4" color="success.main">
                {notificationStats.today}
              </Typography>
            </CardContent>
          </Card>
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
          <Tab label="جميع الإشعارات" />
          <Tab label="غير مقروءة" />
          <Tab label="عاجلة" />
          <Tab label="إعدادات الإشعارات" />
        </Tabs>

        {/* Search and Filter Bar */}
        <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="البحث في الإشعارات..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
            sx={{ flex: 1 }}
          />
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>الفئة</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="الفئة"
            >
              <MenuItem value="all">جميع الفئات</MenuItem>
              <MenuItem value="users">المستخدمين</MenuItem>
              <MenuItem value="messages">الرسائل</MenuItem>
              <MenuItem value="problems">المشاكل</MenuItem>
              <MenuItem value="system">النظام</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>الأولوية</InputLabel>
            <Select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              label="الأولوية"
            >
              <MenuItem value="all">جميع الأولويات</MenuItem>
              <MenuItem value="high">عاجل</MenuItem>
              <MenuItem value="medium">متوسط</MenuItem>
              <MenuItem value="low">عادي</MenuItem>
            </Select>
          </FormControl>

          <IconButton>
            <Refresh />
          </IconButton>
        </Box>

        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ px: 2, pb: 2 }}>
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkRead={handleMarkRead}
                onDelete={handleDeleteNotification}
              />
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 2, pb: 2 }}>
            {filteredNotifications.filter(n => !n.read).map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkRead={handleMarkRead}
                onDelete={handleDeleteNotification}
              />
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ px: 2, pb: 2 }}>
            {filteredNotifications.filter(n => n.priority === 'high').map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkRead={handleMarkRead}
                onDelete={handleDeleteNotification}
              />
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Box sx={{ px: 2, pb: 2 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              إعدادات الإشعارات تسمح لك بتخصيص كيفية ووقت إرسال الإشعارات
            </Alert>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    إعدادات عامة
                  </Typography>
                  
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="تفعيل الإشعارات الفورية"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="إشعارات البريد الإلكتروني"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="إشعارات SMS"
                  />
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    أوقات الإرسال
                  </Typography>
                  
                  <TextField
                    label="بداية ساعات العمل"
                    type="time"
                    defaultValue="09:00"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="نهاية ساعات العمل"
                    type="time"
                    defaultValue="17:00"
                    fullWidth
                  />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Paper>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="إضافة إشعار"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setCreateDialogOpen(true)}
      >
        <Add />
      </Fab>

      {/* Create Notification Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>إنشاء إشعار جديد</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="عنوان الإشعار"
                fullWidth
                value={newNotification.title}
                onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="محتوى الإشعار"
                fullWidth
                multiline
                rows={4}
                value={newNotification.message}
                onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>نوع الإشعار</InputLabel>
                <Select
                  value={newNotification.type}
                  onChange={(e) => setNewNotification({...newNotification, type: e.target.value})}
                  label="نوع الإشعار"
                >
                  <MenuItem value="info">معلوماتي</MenuItem>
                  <MenuItem value="warning">تحذير</MenuItem>
                  <MenuItem value="success">نجاح</MenuItem>
                  <MenuItem value="error">خطأ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>الأولوية</InputLabel>
                <Select
                  value={newNotification.priority}
                  onChange={(e) => setNewNotification({...newNotification, priority: e.target.value})}
                  label="الأولوية"
                >
                  <MenuItem value="low">عادي</MenuItem>
                  <MenuItem value="medium">متوسط</MenuItem>
                  <MenuItem value="high">عاجل</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>الجمهور المستهدف</InputLabel>
                <Select
                  value={newNotification.targetAudience}
                  onChange={(e) => setNewNotification({...newNotification, targetAudience: e.target.value})}
                  label="الجمهور المستهدف"
                >
                  <MenuItem value="all">جميع المستخدمين</MenuItem>
                  <MenuItem value="citizens">المواطنين</MenuItem>
                  <MenuItem value="candidates">المرشحين</MenuItem>
                  <MenuItem value="admins">الإدارة</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="وقت الإرسال (اختياري)"
                type="datetime-local"
                fullWidth
                value={newNotification.scheduleTime}
                onChange={(e) => setNewNotification({...newNotification, scheduleTime: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>
            إلغاء
          </Button>
          <Button
            onClick={handleCreateNotification}
            variant="contained"
            startIcon={<Send />}
          >
            إرسال الإشعار
          </Button>
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
