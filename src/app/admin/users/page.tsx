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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  Menu,
  ListItemIcon,
  Badge,
  Tooltip,
  Fab
} from '@mui/material';
import {
  People,
  PersonAdd,
  Edit,
  Delete,
  Block,
  CheckCircle,
  Search,
  FilterList,
  Download,
  Upload,
  Refresh,
  MoreVert,
  Visibility,
  Send,
  Security,
  AdminPanelSettings,
  Person,
  Group,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  TrendingUp,
  Warning
} from '@mui/icons-material';

// Mock data
const usersData = [
  {
    id: 1,
    name: 'أحمد محمد علي',
    email: 'ahmed.mohamed@email.com',
    phone: '01012345678',
    type: 'citizen',
    status: 'active',
    governorate: 'القاهرة',
    joinDate: '2024-01-15',
    lastActive: '2024-09-18',
    messagesCount: 12,
    problemsCount: 3,
    avatar: 'أ'
  },
  {
    id: 2,
    name: 'فاطمة أحمد حسن',
    email: 'fatma.ahmed@email.com',
    phone: '01098765432',
    type: 'citizen',
    status: 'active',
    governorate: 'الجيزة',
    joinDate: '2024-02-20',
    lastActive: '2024-09-17',
    messagesCount: 8,
    problemsCount: 1,
    avatar: 'ف'
  },
  {
    id: 3,
    name: 'د. خالد محمود',
    email: 'dr.khaled@parliament.gov.eg',
    phone: '01055555555',
    type: 'candidate',
    status: 'active',
    governorate: 'الإسكندرية',
    joinDate: '2024-01-10',
    lastActive: '2024-09-18',
    messagesCount: 156,
    problemsCount: 45,
    avatar: 'خ'
  },
  {
    id: 4,
    name: 'سارة علي محمد',
    email: 'sara.ali@email.com',
    phone: '01077777777',
    type: 'citizen',
    status: 'suspended',
    governorate: 'الشرقية',
    joinDate: '2024-03-05',
    lastActive: '2024-09-10',
    messagesCount: 2,
    problemsCount: 0,
    avatar: 'س'
  },
  {
    id: 5,
    name: 'محمد أحمد إبراهيم',
    email: 'mohamed.ahmed@email.com',
    phone: '01088888888',
    type: 'admin',
    status: 'active',
    governorate: 'القاهرة',
    joinDate: '2023-12-01',
    lastActive: '2024-09-18',
    messagesCount: 0,
    problemsCount: 0,
    avatar: 'م'
  }
];

const userStats = {
  total: 15847,
  active: 14523,
  suspended: 234,
  newThisMonth: 1890,
  citizens: 14234,
  candidates: 1456,
  admins: 157
};

const UserCard = ({ user, onEdit, onDelete, onToggleStatus }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'suspended': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'suspended': return 'موقوف';
      case 'pending': return 'في الانتظار';
      default: return 'غير محدد';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'citizen': return 'مواطن';
      case 'candidate': return 'مرشح';
      case 'admin': return 'مدير';
      default: return 'غير محدد';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'citizen': return '#4caf50';
      case 'candidate': return '#2196f3';
      case 'admin': return '#ff9800';
      default: return '#757575';
    }
  };

  return (
    <Card sx={{ mb: 2, border: user.status === 'suspended' ? '2px solid #f44336' : '1px solid #e0e0e0' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: getTypeColor(user.type),
              width: 56,
              height: 56,
              fontSize: '1.5rem'
            }}
          >
            {user.avatar}
          </Avatar>
          
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {user.name}
              </Typography>
              <Chip
                label={getTypeLabel(user.type)}
                size="small"
                sx={{ bgcolor: getTypeColor(user.type), color: 'white' }}
              />
              <Chip
                label={getStatusLabel(user.status)}
                size="small"
                color={getStatusColor(user.status) as any}
              />
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {user.phone}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {user.governorate}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Typography variant="body2">
                <strong>الرسائل:</strong> {user.messagesCount}
              </Typography>
              <Typography variant="body2">
                <strong>المشاكل:</strong> {user.problemsCount}
              </Typography>
              <Typography variant="body2">
                <strong>انضم:</strong> {user.joinDate}
              </Typography>
              <Typography variant="body2">
                <strong>آخر نشاط:</strong> {user.lastActive}
              </Typography>
            </Box>
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
        <MenuItem onClick={() => { onEdit(user); handleMenuClose(); }}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          تعديل
        </MenuItem>
        <MenuItem onClick={() => { console.log('View user:', user.id); handleMenuClose(); }}>
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          عرض التفاصيل
        </MenuItem>
        <MenuItem onClick={() => { console.log('Send message:', user.id); handleMenuClose(); }}>
          <ListItemIcon>
            <Send fontSize="small" />
          </ListItemIcon>
          إرسال رسالة
        </MenuItem>
        <MenuItem onClick={() => { onToggleStatus(user); handleMenuClose(); }}>
          <ListItemIcon>
            {user.status === 'active' ? <Block fontSize="small" /> : <CheckCircle fontSize="small" />}
          </ListItemIcon>
          {user.status === 'active' ? 'إيقاف الحساب' : 'تفعيل الحساب'}
        </MenuItem>
        <MenuItem onClick={() => { onDelete(user.id); handleMenuClose(); }} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          حذف المستخدم
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default function UsersPage() {
  const [users, setUsers] = useState(usersData);
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Filter users based on search and filters
  useEffect(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.phone.includes(searchTerm);
      const matchesType = filterType === 'all' || user.type === filterType;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    });
    
    setFilteredUsers(filtered);
    setPage(0);
  }, [searchTerm, filterType, filterStatus, users]);

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    setSnackbarMessage('تم حذف المستخدم بنجاح');
    setSnackbarOpen(true);
  };

  const handleToggleUserStatus = (user: any) => {
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    setUsers(users.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
    setSnackbarMessage(`تم ${newStatus === 'active' ? 'تفعيل' : 'إيقاف'} الحساب بنجاح`);
    setSnackbarOpen(true);
  };

  const handleSaveUser = () => {
    // Implement save user logic
    setEditDialogOpen(false);
    setSnackbarMessage('تم تحديث بيانات المستخدم بنجاح');
    setSnackbarOpen(true);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            إدارة المستخدمين 👥
          </Typography>
          <Typography variant="body1" color="textSecondary">
            إدارة حسابات المستخدمين والمرشحين والإدارة
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<Upload />}>
            استيراد
          </Button>
          <Button variant="outlined" startIcon={<Download />}>
            تصدير
          </Button>
          <Button variant="contained" startIcon={<PersonAdd />}>
            إضافة مستخدم
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Badge badgeContent={userStats.total} color="primary" max={99999}>
                <People sx={{ fontSize: 40, color: '#2196f3', mb: 1 }} />
              </Badge>
              <Typography variant="h6" fontWeight="bold">
                إجمالي المستخدمين
              </Typography>
              <Typography variant="h4" color="primary">
                {userStats.total.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Badge badgeContent={userStats.active} color="success" max={99999}>
                <CheckCircle sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
              </Badge>
              <Typography variant="h6" fontWeight="bold">
                المستخدمين النشطين
              </Typography>
              <Typography variant="h4" color="success.main">
                {userStats.active.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Badge badgeContent={userStats.newThisMonth} color="info" max={99999}>
                <TrendingUp sx={{ fontSize: 40, color: '#00bcd4', mb: 1 }} />
              </Badge>
              <Typography variant="h6" fontWeight="bold">
                جديد هذا الشهر
              </Typography>
              <Typography variant="h4" color="info.main">
                {userStats.newThisMonth.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Badge badgeContent={userStats.suspended} color="error" max={99999}>
                <Warning sx={{ fontSize: 40, color: '#f44336', mb: 1 }} />
              </Badge>
              <Typography variant="h6" fontWeight="bold">
                موقوفين
              </Typography>
              <Typography variant="h4" color="error.main">
                {userStats.suspended}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filter */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="البحث عن مستخدم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>نوع المستخدم</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label="نوع المستخدم"
              >
                <MenuItem value="all">جميع الأنواع</MenuItem>
                <MenuItem value="citizen">مواطن</MenuItem>
                <MenuItem value="candidate">مرشح</MenuItem>
                <MenuItem value="admin">مدير</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>الحالة</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="الحالة"
              >
                <MenuItem value="all">جميع الحالات</MenuItem>
                <MenuItem value="active">نشط</MenuItem>
                <MenuItem value="suspended">موقوف</MenuItem>
                <MenuItem value="pending">في الانتظار</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                setFilterStatus('all');
              }}
            >
              إعادة تعيين
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Users List */}
      <Paper>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            قائمة المستخدمين ({filteredUsers.length})
          </Typography>
          
          {paginatedUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              onToggleStatus={handleToggleUserStatus}
            />
          ))}
          
          {filteredUsers.length === 0 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              لا توجد مستخدمين مطابقين لمعايير البحث
            </Alert>
          )}
        </Box>
        
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="عدد الصفوف في الصفحة:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} من ${count}`}
        />
      </Paper>

      {/* Edit User Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>تعديل بيانات المستخدم</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="الاسم الكامل"
                  fullWidth
                  defaultValue={selectedUser.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="البريد الإلكتروني"
                  fullWidth
                  defaultValue={selectedUser.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="رقم الهاتف"
                  fullWidth
                  defaultValue={selectedUser.phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>المحافظة</InputLabel>
                  <Select defaultValue={selectedUser.governorate} label="المحافظة">
                    <MenuItem value="القاهرة">القاهرة</MenuItem>
                    <MenuItem value="الجيزة">الجيزة</MenuItem>
                    <MenuItem value="الإسكندرية">الإسكندرية</MenuItem>
                    <MenuItem value="الشرقية">الشرقية</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>نوع المستخدم</InputLabel>
                  <Select defaultValue={selectedUser.type} label="نوع المستخدم">
                    <MenuItem value="citizen">مواطن</MenuItem>
                    <MenuItem value="candidate">مرشح</MenuItem>
                    <MenuItem value="admin">مدير</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>الحالة</InputLabel>
                  <Select defaultValue={selectedUser.status} label="الحالة">
                    <MenuItem value="active">نشط</MenuItem>
                    <MenuItem value="suspended">موقوف</MenuItem>
                    <MenuItem value="pending">في الانتظار</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSaveUser} variant="contained">
            حفظ التغييرات
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
