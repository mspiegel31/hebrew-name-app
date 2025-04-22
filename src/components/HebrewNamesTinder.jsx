import React, { useState, useEffect } from 'react';
import { Heart, X, List, Download } from 'lucide-react';
import { biblicalNames } from '../data/namesData';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  IconButton,
  Paper,
  Container,
  Stack,
  Divider,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Use the biblicalNames array directly
const allNamesData = biblicalNames;

// Helper function to shuffle array
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  width: '100%',
  margin: '0 auto',
  overflow: 'hidden',
  border: '1px solid #E2E8F0',
}));

const GradientHeader = styled(Box)(({ theme }) => ({
  height: 80,
  background: theme.palette.primary.main,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const FilterButton = styled(Button)(({ theme, active }) => ({
  borderRadius: 0,
  padding: '8px 16px',
  margin: '0 1px',
  backgroundColor: active ? theme.palette.primary.main : 'white',
  color: active ? 'white' : theme.palette.text.secondary,
  border: '1px solid #E2E8F0',
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.dark : theme.palette.grey[50],
  },
}));

const NameCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderBottom: '1px solid #E2E8F0',
}));

const HebrewNamesTinder = () => {
  const theme = useTheme();
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [likedNames, setLikedNames] = useState([]);
  const [dislikedNames, setDislikedNames] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [filteredNames, setFilteredNames] = useState([]);
  const [shuffledNames, setShuffledNames] = useState([]);

  const exportToCSV = () => {
    const headers = ['English Name', 'Hebrew Name', 'Gender'];
    const csvContent = [
      headers.join(','),
      ...likedNames.map(name => [
        `"${name.english_name}"`,
        `"${name.hebrew_name}"`,
        `"${name.gender}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'hebrew_names_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Initialize filtered and shuffled names based on selected filter
  useEffect(() => {
    let filtered;
    
    if (currentFilter === 'all') {
      filtered = [...allNamesData];
    } else {
      filtered = allNamesData.filter(name => name.gender === currentFilter);
    }
    
    // Shuffle the filtered names
    const shuffled = shuffleArray(filtered);
    
    setCurrentNameIndex(0);
    setFilteredNames(filtered);
    setShuffledNames(shuffled);
    setLikedNames([]);
    setDislikedNames([]);
    setShowResults(false);
  }, [currentFilter]);

  const handleLike = () => {
    if (currentNameIndex < shuffledNames.length) {
      const currentName = shuffledNames[currentNameIndex];
      setLikedNames([...likedNames, currentName]);
      // Remove the current name from shuffledNames
      setShuffledNames(shuffledNames.filter((_, index) => index !== currentNameIndex));
      // No need to increment currentNameIndex since we removed the current name
      if (shuffledNames.length <= 1) {
        setShowResults(true);
      }
    }
  };

  const handleDislike = () => {
    if (currentNameIndex < shuffledNames.length) {
      const currentName = shuffledNames[currentNameIndex];
      setDislikedNames([...dislikedNames, currentName]);
      // Remove the current name from shuffledNames
      setShuffledNames(shuffledNames.filter((_, index) => index !== currentNameIndex));
      // No need to increment currentNameIndex since we removed the current name
      if (shuffledNames.length <= 1) {
        setShowResults(true);
      }
    }
  };

  const resetSession = () => {
    // Reshuffle the names when starting a new session
    const shuffled = shuffleArray(filteredNames);
    setShuffledNames(shuffled);
    setCurrentNameIndex(0);
    setLikedNames([]);
    setDislikedNames([]);
    setShowResults(false);
  };

  const changeFilter = (filter) => {
    setCurrentFilter(filter);
  };

  const groupNamesByGender = (names) => {
    const grouped = {
      male: names.filter(name => name.gender === 'male'),
      female: names.filter(name => name.gender === 'female'),
      both: names.filter(name => name.gender === 'both')
    };
    return grouped;
  };

  const renderGenderSymbol = (gender) => {
    switch(gender) {
      case 'male': return '♂️';
      case 'female': return '♀️';
      case 'both': return '⚥';
      default: return '';
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ 
        minHeight: '100vh',
        py: 4,
        background: theme.palette.background.default,
      }}>
        <Typography 
          variant="h3" 
          component="h1" 
          align="center" 
          sx={{ 
            mb: 4,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'primary.main',
          }}
        >
          Hebrew-Friendly Name Picker
        </Typography>
        
        {/* Filter Controls */}
        <Paper elevation={0} sx={{ mb: 4, border: '1px solid #E2E8F0' }}>
          <Stack direction="row" spacing={0} justifyContent="center">
            <FilterButton 
              onClick={() => changeFilter('all')} 
              active={currentFilter === 'all'}
            >
              All
            </FilterButton>
            <FilterButton 
              onClick={() => changeFilter('male')} 
              active={currentFilter === 'male'}
            >
              Male ♂️
            </FilterButton>
            <FilterButton 
              onClick={() => changeFilter('female')} 
              active={currentFilter === 'female'}
            >
              Female ♀️
            </FilterButton>
            <FilterButton 
              onClick={() => changeFilter('both')} 
              active={currentFilter === 'both'}
            >
              Both ⚥
            </FilterButton>
          </Stack>
        </Paper>

        {!showResults ? (
          shuffledNames.length > 0 && currentNameIndex < shuffledNames.length ? (
            <StyledCard>
              <GradientHeader>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'white',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                  }}
                >
                  {shuffledNames[currentNameIndex].gender === 'male' ? 'Biblical Male Name' : 
                   shuffledNames[currentNameIndex].gender === 'female' ? 'Biblical Female Name' : 
                   'Biblical Gender-Neutral Name'}
                </Typography>
              </GradientHeader>
              
              <NameCard>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                  <Typography 
                    variant="h3" 
                    component="h2" 
                    sx={{ 
                      color: 'text.primary',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {shuffledNames[currentNameIndex].english_name}
                  </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      ml: 1,
                      fontWeight: 500,
                      color: 'secondary.main',
                    }}
                  >
                    {renderGenderSymbol(shuffledNames[currentNameIndex].gender)}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="h4" 
                  align="center" 
                  sx={{ 
                    color: 'secondary.main',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {shuffledNames[currentNameIndex].hebrew_name}
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mt: 4,
                  gap: 2,
                }}>
                  <IconButton 
                    onClick={handleDislike}
                    sx={{ 
                      width: 64,
                      height: 64,
                      bgcolor: 'transparent',
                      color: 'error.main',
                      border: '1px solid #E2E8F0',
                      '&:hover': { 
                        bgcolor: 'error.light',
                        color: 'error.main',
                      }
                    }}
                  >
                    <X size={32} />
                  </IconButton>
                  
                  <IconButton 
                    onClick={handleLike}
                    sx={{ 
                      width: 64,
                      height: 64,
                      bgcolor: 'transparent',
                      color: 'success.main',
                      border: '1px solid #E2E8F0',
                      '&:hover': { 
                        bgcolor: 'success.light',
                        color: 'success.main',
                      }
                    }}
                  >
                    <Heart size={32} />
                  </IconButton>
                </Box>
              </NameCard>
              
              <Box sx={{ 
                p: 2, 
                bgcolor: 'grey.50', 
                textAlign: 'center',
                borderTop: '1px solid #E2E8F0',
              }}>
                <Typography variant="body2" color="text.secondary">
                  {currentNameIndex + 1} of {shuffledNames.length}
                </Typography>
              </Box>
              
              {/* End Session Button */}
              <Box sx={{ p: 3, textAlign: 'center', borderTop: '1px solid #E2E8F0' }}>
                <Button
                  variant="contained"
                  onClick={() => setShowResults(true)}
                  startIcon={<List />}
                  sx={{
                    minWidth: 200,
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  End Session & View Results
                </Button>
              </Box>
            </StyledCard>
          ) : (
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: '1px solid #E2E8F0' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No names available for the selected filter.
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => changeFilter('all')}
                startIcon={<List />}
                sx={{ mt: 2 }}
              >
                Show All Names
              </Button>
            </Paper>
          )
        ) : (
          <Paper elevation={0} sx={{ p: 4, border: '1px solid #E2E8F0' }}>
            <Typography 
              variant="h4" 
              align="center" 
              sx={{ 
                mb: 4,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: 'primary.main',
              }}
            >
              Your Hebrew Name Preferences
            </Typography>
            
            {/* Results section */}
            <Box sx={{ mt: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2,
                  fontWeight: 500,
                  color: 'success.main',
                }}
              >
                <Heart size={20} style={{ marginRight: 8 }} /> Liked Names ({likedNames.length})
              </Typography>
              
              {likedNames.length > 0 ? (
                <Box>
                  {/* Results content */}
                </Box>
              ) : (
                <Typography color="text.secondary">No liked names yet.</Typography>
              )}
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default HebrewNamesTinder;