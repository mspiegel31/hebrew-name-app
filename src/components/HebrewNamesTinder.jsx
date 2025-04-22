import React, { useState, useEffect } from 'react';
import { Heart, X, List, Download } from 'lucide-react';
import { biblicalNames } from '../data/namesData';

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

const HebrewNamesTinder = () => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">Hebrew Names Finder</h1>
      
      {/* Filter Controls */}
      <div className="flex mb-6 bg-white rounded-full shadow-md p-1">
        <button 
          onClick={() => changeFilter('all')} 
          className={`px-4 py-2 rounded-full ${currentFilter === 'all' ? 'bg-indigo-500 text-white' : 'text-gray-600'}`}
        >
          All
        </button>
        <button 
          onClick={() => changeFilter('male')} 
          className={`px-4 py-2 rounded-full ${currentFilter === 'male' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
        >
          Male ♂️
        </button>
        <button 
          onClick={() => changeFilter('female')} 
          className={`px-4 py-2 rounded-full ${currentFilter === 'female' ? 'bg-pink-500 text-white' : 'text-gray-600'}`}
        >
          Female ♀️
        </button>
        <button 
          onClick={() => changeFilter('both')} 
          className={`px-4 py-2 rounded-full ${currentFilter === 'both' ? 'bg-purple-500 text-white' : 'text-gray-600'}`}
        >
          Both ⚥
        </button>
      </div>

      {!showResults ? (
        shuffledNames.length > 0 && currentNameIndex < shuffledNames.length ? (
          <div className="w-full max-w-md">
            {/* Name Card */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-blue-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-lg text-white font-bold px-4 py-1 rounded-full bg-indigo-700 bg-opacity-70">
                    {shuffledNames[currentNameIndex].gender === 'male' ? 'Biblical Male Name' : 
                     shuffledNames[currentNameIndex].gender === 'female' ? 'Biblical Female Name' : 
                     'Biblical Gender-Neutral Name'}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {shuffledNames[currentNameIndex].english_name}
                  </h2>
                  <span className="ml-2 text-2xl">
                    {renderGenderSymbol(shuffledNames[currentNameIndex].gender)}
                  </span>
                </div>
                
                <div className="flex justify-center mb-6">
                  <h3 className="text-2xl text-gray-700 font-semibold">
                    {shuffledNames[currentNameIndex].hebrew_name}
                  </h3>
                </div>
                
                <div className="flex justify-between mt-8">
                  <button 
                    onClick={handleDislike} 
                    className="flex items-center justify-center w-16 h-16 bg-red-100 text-red-500 rounded-full hover:bg-red-200 transition-colors"
                    aria-label="Dislike"
                  >
                    <X size={32} />
                  </button>
                  
                  <button 
                    onClick={handleLike}
                    className="flex items-center justify-center w-16 h-16 bg-green-100 text-green-500 rounded-full hover:bg-green-200 transition-colors"
                    aria-label="Like"
                  >
                    <Heart size={32} />
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 text-center text-gray-500">
                {currentNameIndex + 1} of {shuffledNames.length}
              </div>
            </div>
            
            {/* End Session Button */}
            <div className="mt-6 text-center">
              <button 
                onClick={() => setShowResults(true)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors flex items-center mx-auto"
              >
                <List size={18} className="mr-2" />
                End Session & View Results
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600 mb-4">No names available for the selected filter.</p>
            <button 
              onClick={() => changeFilter('all')}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
            >
              Show All Names
            </button>
          </div>
        )
      ) : (
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Your Hebrew Name Preferences</h2>
            
            {/* Liked Names */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center">
                <Heart size={20} className="mr-2" /> Liked Names ({likedNames.length})
              </h3>
              
              {likedNames.length > 0 ? (
                <div>
                  {/* Male Names */}
                  {groupNamesByGender(likedNames).male.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-blue-600 mb-2 flex items-center">
                        <span className="mr-1">♂️</span> Male Names
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {groupNamesByGender(likedNames).male.map((name, index) => (
                          <div key={index} className="bg-blue-50 p-3 rounded-md">
                            <div className="font-medium">{name.english_name}</div>
                            <div className="text-sm text-gray-600">{name.hebrew_name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Female Names */}
                  {groupNamesByGender(likedNames).female.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-pink-600 mb-2 flex items-center">
                        <span className="mr-1">♀️</span> Female Names
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {groupNamesByGender(likedNames).female.map((name, index) => (
                          <div key={index} className="bg-pink-50 p-3 rounded-md">
                            <div className="font-medium">{name.english_name}</div>
                            <div className="text-sm text-gray-600">{name.hebrew_name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Both Genders */}
                  {groupNamesByGender(likedNames).both.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium text-purple-600 mb-2 flex items-center">
                        <span className="mr-1">⚥</span> Gender-Neutral Names
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {groupNamesByGender(likedNames).both.map((name, index) => (
                          <div key={index} className="bg-purple-50 p-3 rounded-md">
                            <div className="font-medium">{name.english_name}</div>
                            <div className="text-sm text-gray-600">{name.hebrew_name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 italic">You didn't like any names in this session.</p>
              )}
            </div>
            
            {/* Disliked Names */}
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center">
                <X size={20} className="mr-2" /> Disliked Names ({dislikedNames.length})
              </h3>
              
              {dislikedNames.length > 0 ? (
                <div>
                  {/* Male Names */}
                  {groupNamesByGender(dislikedNames).male.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-blue-600 mb-2 flex items-center">
                        <span className="mr-1">♂️</span> Male Names
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {groupNamesByGender(dislikedNames).male.map((name, index) => (
                          <div key={index} className="bg-gray-100 p-3 rounded-md">
                            <div className="font-medium">{name.english_name}</div>
                            <div className="text-sm text-gray-600">{name.hebrew_name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Female Names */}
                  {groupNamesByGender(dislikedNames).female.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-pink-600 mb-2 flex items-center">
                        <span className="mr-1">♀️</span> Female Names
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {groupNamesByGender(dislikedNames).female.map((name, index) => (
                          <div key={index} className="bg-gray-100 p-3 rounded-md">
                            <div className="font-medium">{name.english_name}</div>
                            <div className="text-sm text-gray-600">{name.hebrew_name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Both Genders */}
                  {groupNamesByGender(dislikedNames).both.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium text-purple-600 mb-2 flex items-center">
                        <span className="mr-1">⚥</span> Gender-Neutral Names
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {groupNamesByGender(dislikedNames).both.map((name, index) => (
                          <div key={index} className="bg-gray-100 p-3 rounded-md">
                            <div className="font-medium">{name.english_name}</div>
                            <div className="text-sm text-gray-600">{name.hebrew_name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 italic">You didn't dislike any names in this session.</p>
              )}
            </div>
            
            {/* Reset Button */}
            <div className="mt-8 text-center">
              <button 
                onClick={resetSession}
                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
              >
                Start New Session
              </button>
            </div>
            <div className="mb-6 text-center">
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center mx-auto"
              >
                <Download size={20} className="mr-2" />
                Export Results as CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HebrewNamesTinder;