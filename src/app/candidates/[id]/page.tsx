'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Stack,
  Divider,
  Rating,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  LocationOn,
  Email,
  Phone,
  Facebook,
  Twitter,
  Language,
  Star,
  Send,
  ReportProblem,
  ArrowBack,
  CheckCircle,
  Work,
  School,
  EmojiEvents,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { dataAPI } from '@/lib/api';
import { Candidate } from '@/types';

export default function CandidateDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Message Dialog
  const [messageDialog, setMessageDialog] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageLoading, setMessageLoading] = useState(false);
  
  // Problem Dialog
  const [problemDialog, setProblemDialog] = useState(false);
  const [problemText, setProblemText] = useState('');
  const [problemLoading, setProblemLoading] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchCandidate();
    }
  }, [params.id]);

  const fetchCandidate = async () => {
    try {
      setLoading(true);
      const response = await dataAPI.getCandidateById(Number(params.id));
      setCandidate(response.data);
      setError(null);
    } catch (error) {
      setError('فشل في تحميل بيانات المرشح. يرجى المحاولة مرة أخرى.');
      console.error('Failed to fetch candidate:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    try {
      setMessageLoading(true);
      await dataAPI.sendMessage({
        recipient_id: candidate!.id,
        message_type: 'message',
        content: messageText,
      });
      
      setMessageDialog(false);
      setMessageText('');
      // Show success message
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setMessageLoading(false);
    }
  };

  const handleReportProblem = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    try {
      setProblemLoading(true);
      await dataAPI.sendMessage({
        recipient_id: candidate!.id,
        message_type: 'problem',
        content: problemText,
      });
      
      setProblemDialog(false);
      setProblemText('');
      // Show success message
    } catch (error) {
      console.error('Failed to report problem:', error);
    } finally {
      setProblemLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !candidate) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'لم يتم العثور على المرشح'}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => router.push('/candidates')}
        >
          العودة للمرشحين
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 4, minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => router.push('/candidates')}
          sx={{ mb: 3 }}
        >
          العودة للمرشحين
        </Button>

        <Grid container spacing={4}>
          {/* Main Profile Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Avatar
                src={candidate.profile_image}
                sx={{
                  width: 150,
                  height: 150,
                  mx: 'auto',
                  mb: 2,
                  fontSize: '3rem',
                }}
              >
                {candidate.name.charAt(0)}
              </Avatar>

              <Typography variant="h4" component="h1" gutterBottom>
                {candidate.name}
              </Typography>

              {candidate.title && (
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {candidate.title}
                </Typography>
              )}

              <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 2 }}>
                <Chip
                  label={candidate.is_current_mp ? 'نائب حالي' : 'مرشح'}
                  color={candidate.is_current_mp ? 'success' : 'primary'}
                />
                {candidate.party && (
                  <Chip label={candidate.party} variant="outlined" />
                )}
              </Stack>

              {/* Rating */}
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                <Rating value={candidate.average_rating || 0} readOnly />
                <Typography variant="body2" color="text.secondary">
                  ({candidate.total_ratings || 0} تقييم)
                </Typography>
              </Stack>

              {/* Contact Info */}
              <Stack spacing={2} sx={{ mb: 3 }}>
                {candidate.governorate_name && (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <LocationOn color="action" />
                    <Typography variant="body2">{candidate.governorate_name}</Typography>
                  </Stack>
                )}
                
                {candidate.email && (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Email color="action" />
                    <Typography variant="body2">{candidate.email}</Typography>
                  </Stack>
                )}
                
                {candidate.phone && (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Phone color="action" />
                    <Typography variant="body2">{candidate.phone}</Typography>
                  </Stack>
                )}
              </Stack>

              {/* Social Links */}
              {(candidate.facebook_url || candidate.twitter_url || candidate.website_url) && (
                <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 3 }}>
                  {candidate.facebook_url && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Facebook />}
                      href={candidate.facebook_url}
                      target="_blank"
                    >
                      Facebook
                    </Button>
                  )}
                  {candidate.twitter_url && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Twitter />}
                      href={candidate.twitter_url}
                      target="_blank"
                    >
                      Twitter
                    </Button>
                  )}
                  {candidate.website_url && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Language />}
                      href={candidate.website_url}
                      target="_blank"
                    >
                      الموقع
                    </Button>
                  )}
                </Stack>
              )}

              {/* Action Buttons */}
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Send />}
                  onClick={() => setMessageDialog(true)}
                >
                  إرسال رسالة
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<ReportProblem />}
                  onClick={() => setProblemDialog(true)}
                >
                  الإبلاغ عن مشكلة
                </Button>
              </Stack>
            </Card>
          </Grid>

          {/* Details */}
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              {/* Bio */}
              {candidate.bio && (
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      نبذة شخصية
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                      {candidate.bio}
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {/* Experience */}
              {candidate.experience && (
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                      <Work color="primary" />
                      <Typography variant="h6">الخبرة المهنية</Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                      {candidate.experience}
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {/* Education */}
              {candidate.education && (
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                      <School color="primary" />
                      <Typography variant="h6">التعليم</Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                      {candidate.education}
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {/* Achievements */}
              {candidate.achievements && (
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                      <EmojiEvents color="primary" />
                      <Typography variant="h6">الإنجازات</Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                      {candidate.achievements}
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {/* Platform/Promises */}
              {candidate.platform && (
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      البرنامج الانتخابي
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                      {candidate.platform}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Stack>
          </Grid>
        </Grid>

        {/* Message Dialog */}
        <Dialog
          open={messageDialog}
          onClose={() => setMessageDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>إرسال رسالة إلى {candidate.name}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="نص الرسالة"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              margin="normal"
              placeholder="اكتب رسالتك هنا..."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setMessageDialog(false)}>إلغاء</Button>
            <Button
              onClick={handleSendMessage}
              variant="contained"
              disabled={!messageText.trim() || messageLoading}
            >
              {messageLoading ? <CircularProgress size={20} /> : 'إرسال'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Problem Dialog */}
        <Dialog
          open={problemDialog}
          onClose={() => setProblemDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>الإبلاغ عن مشكلة إلى {candidate.name}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="وصف المشكلة"
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              margin="normal"
              placeholder="اكتب تفاصيل المشكلة هنا..."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setProblemDialog(false)}>إلغاء</Button>
            <Button
              onClick={handleReportProblem}
              variant="contained"
              disabled={!problemText.trim() || problemLoading}
            >
              {problemLoading ? <CircularProgress size={20} /> : 'إرسال'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
