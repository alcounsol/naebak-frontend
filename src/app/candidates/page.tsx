'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Avatar,
  Rating,
  Pagination,
  CircularProgress,
  Alert,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  LocationOn,
  Person,
  Email,
  Phone,
  Star,
  Visibility,
  FilterList,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { dataAPI } from '@/lib/api';
import { Candidate, Governorate, Category } from '@/types';

export default function CandidatesPage() {
  const router = useRouter();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [searchTerm, selectedGovernorate, selectedCategory, currentPage]);

  const fetchInitialData = async () => {
    try {
      const [govResponse, catResponse] = await Promise.all([
        dataAPI.getGovernorates(),
        dataAPI.getCategories(),
      ]);
      setGovernorates(govResponse.data);
      setCategories(catResponse.data);
    } catch (error) {
      console.error('Failed to fetch initial data:', error);
    }
  };

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const params = {
        search: searchTerm,
        governorate: selectedGovernorate,
        category: selectedCategory,
        page: currentPage,
      };
      
      const response = await dataAPI.getCandidates(params);
      setCandidates(response.data.results || response.data);
      setTotalPages(response.data.total_pages || 1);
      setError(null);
    } catch (error) {
      setError('فشل في تحميل المرشحين. يرجى المحاولة مرة أخرى.');
      console.error('Failed to fetch candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCandidateClick = (candidateId: number) => {
    router.push(`/candidates/${candidateId}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGovernorate('');
    setSelectedCategory('');
    setCurrentPage(1);
  };

  return (
    <Box sx={{ py: 4, minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            المرشحون والنواب
          </Typography>
          <Typography variant="h6" color="text.secondary">
            تعرف على المرشحين والنواب في محافظتك وتواصل معهم
          </Typography>
        </Box>

        {/* Filters */}
        <Card sx={{ mb: 4, p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <FilterList color="primary" />
            <Typography variant="h6">البحث والتصفية</Typography>
          </Stack>
          
          <Grid container spacing={3}>
            {/* Search */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="البحث عن مرشح"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                placeholder="اسم المرشح أو الوصف..."
              />
            </Grid>

            {/* Governorate Filter */}
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>المحافظة</InputLabel>
                <Select
                  value={selectedGovernorate}
                  label="المحافظة"
                  onChange={(e) => setSelectedGovernorate(e.target.value)}
                >
                  <MenuItem value="">جميع المحافظات</MenuItem>
                  {governorates.map((gov) => (
                    <MenuItem key={gov.id} value={gov.id}>
                      {gov.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Category Filter */}
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>التخصص</InputLabel>
                <Select
                  value={selectedCategory}
                  label="التخصص"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <MenuItem value="">جميع التخصصات</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Clear Filters */}
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={clearFilters}
                sx={{ height: 56 }}
              >
                مسح الفلاتر
              </Button>
            </Grid>
          </Grid>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Loading */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <>
            {/* Results Count */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" color="text.secondary">
                تم العثور على {candidates.length} مرشح
              </Typography>
            </Box>

            {/* Candidates Grid */}
            {candidates.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Person sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  لا توجد نتائج للبحث الحالي
                </Typography>
                <Button variant="outlined" onClick={clearFilters} sx={{ mt: 2 }}>
                  مسح الفلاتر
                </Button>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {candidates.map((candidate) => (
                  <Grid item xs={12} sm={6} md={4} key={candidate.id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4,
                        },
                      }}
                    >
                      {/* Candidate Image */}
                      <CardMedia
                        sx={{
                          height: 200,
                          position: 'relative',
                          bgcolor: 'grey.200',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {candidate.profile_image ? (
                          <img
                            src={candidate.profile_image}
                            alt={candidate.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <Avatar
                            sx={{
                              width: 80,
                              height: 80,
                              fontSize: '2rem',
                              bgcolor: 'primary.main',
                            }}
                          >
                            {candidate.name.charAt(0)}
                          </Avatar>
                        )}
                        
                        {/* Status Chip */}
                        <Chip
                          label={candidate.is_current_mp ? 'نائب حالي' : 'مرشح'}
                          color={candidate.is_current_mp ? 'success' : 'primary'}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                          }}
                        />
                      </CardMedia>

                      <CardContent sx={{ flexGrow: 1 }}>
                        {/* Name and Title */}
                        <Typography variant="h6" component="h3" gutterBottom>
                          {candidate.name}
                        </Typography>
                        
                        {candidate.title && (
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {candidate.title}
                          </Typography>
                        )}

                        {/* Location */}
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                          <LocationOn fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {candidate.governorate_name || 'غير محدد'}
                          </Typography>
                        </Stack>

                        {/* Rating */}
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                          <Rating
                            value={candidate.average_rating || 0}
                            readOnly
                            size="small"
                          />
                          <Typography variant="body2" color="text.secondary">
                            ({candidate.total_ratings || 0})
                          </Typography>
                        </Stack>

                        {/* Bio Preview */}
                        {candidate.bio && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {candidate.bio}
                          </Typography>
                        )}
                      </CardContent>

                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<Visibility />}
                          onClick={() => handleCandidateClick(candidate.id)}
                        >
                          عرض التفاصيل
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, page) => setCurrentPage(page)}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
