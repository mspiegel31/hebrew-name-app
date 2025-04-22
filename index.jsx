import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Heart, X, List, Filter } from 'lucide-react';

// Sample data from the provided JSON
const namesData = [
  {
    "english_name": "Aaron",
    "hebrew_name": "אַהֲרֹן",
    "gender": "male"
  },
  {
    "english_name": "Abaddon",
    "hebrew_name": "אֲבַדּוֹן",
    "gender": "male"
  },
  {
    "english_name": "Abdiel",
    "hebrew_name": "עֲבְדִיאֵל",
    "gender": "male"
  },
  {
    "english_name": "Abednego",
    "hebrew_name": "עֲבֵד־נְגוֹ",
    "gender": "male"
  },
  {
    "english_name": "Abel",
    "hebrew_name": "הֶבֶל",
    "gender": "male"
  },
  {
    "english_name": "Abiah",
    "hebrew_name": "אֲבִיָה",
    "gender": "both"
  },
  {
    "english_name": "Abiathar",
    "hebrew_name": "אֶבְיָתָר",
    "gender": "male"
  },
  {
    "english_name": "Abidan",
    "hebrew_name": "אֲבִידָן",
    "gender": "male"
  },
  {
    "english_name": "Abiel",
    "hebrew_name": "אֲבִיאֵל",
    "gender": "male"
  },
  {
    "english_name": "Abigail",
    "hebrew_name": "אֲבִיגַיִל",
    "gender": "female"
  },
  {
    "english_name": "Abihu",
    "hebrew_name": "אֲבִיהוּא",
    "gender": "male"
  },
  {
    "english_name": "Abijah",
    "hebrew_name": "אֲבִיָה",
    "gender": "both"
  },
  {
    "english_name": "Abraham",
    "hebrew_name": "אַבְרָהָם",
    "gender": "male"
  },
  {
    "english_name": "Adam",
    "hebrew_name": "אָדָם",
    "gender": "male"
  },
  {
    "english_name": "Adir",
    "hebrew_name": "אדיר",
    "gender": "male"
  },
  {
    "english_name": "Amos",
    "hebrew_name": "עָמוֹס",
    "gender": "male"
  },
  {
    "english_name": "Ariel",
    "hebrew_name": "אֲרִיאֵל",
    "gender": "both"
  },
  {
    "english_name": "Asher",
    "hebrew_name": "אָשֵׁר",
    "gender": "male"
  },
  {
    "english_name": "Athaliah",
    "hebrew_name": "עֲתַלְיָה",
    "gender": "both"
  },
  {
    "english_name": "Avital",
    "hebrew_name": "אֲבִיטַל",
    "gender": "both"
  },
  {
    "english_name": "Azariah",
    "hebrew_name": "עֲזַרְיָה",
    "gender": "male"
  },
  {
    "english_name": "Batya",
    "hebrew_name": "בַּתְיָה",
    "gender": "female"
  },
  {
    "english_name": "Benjamin",
    "hebrew_name": "בִּנְיָמִין",
    "gender": "male"
  },
  {
    "english_name": "Boaz",
    "hebrew_name": "בֹּעַז",
    "gender": "male"
  },
  {
    "english_name": "Caleb",
    "hebrew_name": "כָּלֵב",
    "gender": "male"
  },
  {
    "english_name": "Daniel",
    "hebrew_name": "דָּנִיֵּאל",
    "gender": "male"
  },
  {
    "english_name": "David",
    "hebrew_name": "דָּוִד",
    "gender": "male"
  },
  {
    "english_name": "Deborah",
    "hebrew_name": "דְּבוֹרָה",
    "gender": "female"
  },
  {
    "english_name": "Eli",
    "hebrew_name": "עֵלִי",
    "gender": "male"
  },
  {
    "english_name": "Elias",
    "hebrew_name": "אֵלִיָּה",
    "gender": "male"
  },
  {
    "english_name": "Elijah",
    "hebrew_name": "אֵלִיָּהוּ",
    "gender": "male"
  },
  {
    "english_name": "Elisheva",
    "hebrew_name": "אֱלִישֶׁבַע",
    "gender": "female"
  },
  {
    "english_name": "Enoch",
    "hebrew_name": "חֲנוֹךְ",
    "gender": "male"
  },
  {
    "english_name": "Ephraim",
    "hebrew_name": "אֶפְרַיִם",
    "gender": "male"
  },
  {
    "english_name": "Esther",
    "hebrew_name": "אֶסְתֵּר",
    "gender": "female"
  },
  {
    "english_name": "Eve",
    "hebrew_name": "חַוָּה",
    "gender": "female"
  },
  {
    "english_name": "Ezra",
    "hebrew_name": "עֶזְרָא",
    "gender": "male"
  },
  {
    "english_name": "Gomer",
    "hebrew_name": "גֹּמֶר",
    "gender": "both"
  },
  {
    "english_name": "Hadassah",
    "hebrew_name": "הֲדַסָּה",
    "gender": "female"
  },
  {
    "english_name": "Hagar",
    "hebrew_name": "הָגָר",
    "gender": "female"
  },
  {
    "english_name": "Haman",
    "hebrew_name": "הָמָן",
    "gender": "male"
  },
  {
    "english_name": "Hannah",
    "hebrew_name": "חַנָּה",
    "gender": "female"
  },
  {
    "english_name": "Hoshea",
    "hebrew_name": "הוֹשֵׁעַ",
    "gender": "male"
  },
  {
    "english_name": "Huri",
    "hebrew_name": "חוּרִי",
    "gender": "male"
  },
  {
    "english_name": "Ichabod",
    "hebrew_name": "אִי־כָבוֹד",
    "gender": "male"
  },
  {
    "english_name": "Ilai",
    "hebrew_name": "עִילַי",
    "gender": "male"
  },
  {
    "english_name": "Ira",
    "hebrew_name": "עִירָא",
    "gender": "male"
  },
  {
    "english_name": "Isaac",
    "hebrew_name": "יִצְחָק",
    "gender": "male"
  },
  {
    "english_name": "Isaiah",
    "hebrew_name": "יְשַׁעְיָהוּ",
    "gender": "male"
  }
];

const namesData2 = [
    {
      "english_name": "Jacob",
      "hebrew_name": "יַעֲקֹב",
      "gender": "male"
    },
    {
      "english_name": "Jeremiah",
      "hebrew_name": "יִרְמְיָהוּ",
      "gender": "male"
    },
    {
      "english_name": "Jonah",
      "hebrew_name": "יוֹנָה",
      "gender": "male"
    },
    {
      "english_name": "Jonathan",
      "hebrew_name": "יְהוֹנָתָן",
      "gender": "male"
    },
    {
      "english_name": "Joshua",
      "hebrew_name": "יְהוֹשֻׁעַ",
      "gender": "male"
    },
    {
      "english_name": "Junia",
      "hebrew_name": "יוּנִיָה",
      "gender": "female"
    },
    {
      "english_name": "Lazarus",
      "hebrew_name": "אֶלְעָזָר",
      "gender": "male"
    },
    {
      "english_name": "Leah",
      "hebrew_name": "לֵאָה",
      "gender": "female"
    },
    {
      "english_name": "Levi",
      "hebrew_name": "לֵוִי",
      "gender": "male"
    },
    {
      "english_name": "Lior",
      "hebrew_name": "לִיאוֹר",
      "gender": "both"
    },
    {
      "english_name": "Micah",
      "hebrew_name": "מִיכָה",
      "gender": "male"
    },
    {
      "english_name": "Miriam",
      "hebrew_name": "מִרְיָם",
      "gender": "female"
    },
    {
      "english_name": "Moses",
      "hebrew_name": "מֹשֶׁה",
      "gender": "male"
    },
    {
      "english_name": "Nabal",
      "hebrew_name": "נָבָל",
      "gender": "male"
    },
    {
      "english_name": "Nadab",
      "hebrew_name": "נָדָב",
      "gender": "male"
    },
    {
      "english_name": "Naomi",
      "hebrew_name": "נָעֳמִי",
      "gender": "female"
    },
    {
      "english_name": "Nathan",
      "hebrew_name": "נָתָן",
      "gender": "male"
    },
    {
      "english_name": "Nathanael",
      "hebrew_name": "נְתַנְאֵל",
      "gender": "male"
    },
    {
      "english_name": "Nebuchadnezzar",
      "hebrew_name": "נְבוּכַדְנֶאצַּר",
      "gender": "male"
    },
    {
      "english_name": "Nekoda",
      "hebrew_name": "נְקוֹדָא",
      "gender": "male"
    },
    {
      "english_name": "Neriah",
      "hebrew_name": "נֵרִיָה",
      "gender": "male"
    },
    {
      "english_name": "Nethaniah",
      "hebrew_name": "נְתַנְיָהוּ",
      "gender": "male"
    },
    {
      "english_name": "Nimrod",
      "hebrew_name": "נִמְרֹד",
      "gender": "male"
    },
    {
      "english_name": "Noah (f)",
      "hebrew_name": "נֹעָה",
      "gender": "female"
    },
    {
      "english_name": "Noah (m)",
      "hebrew_name": "נֹחַ",
      "gender": "male"
    },
    {
      "english_name": "Noy",
      "hebrew_name": "נוֹי",
      "gender": "both"
    },
    {
      "english_name": "Ori",
      "hebrew_name": "אוֹרִי",
      "gender": "both"
    },
    {
      "english_name": "Oz",
      "hebrew_name": "עֹז",
      "gender": "male"
    },
    {
      "english_name": "Ozias",
      "hebrew_name": "עֻזִּיָּה",
      "gender": "male"
    },
    {
      "english_name": "Rachel",
      "hebrew_name": "רָחֵל",
      "gender": "female"
    },
    {
      "english_name": "Raisa",
      "hebrew_name": "רַיסָה",
      "gender": "female"
    },
    {
      "english_name": "Ruth",
      "hebrew_name": "רוּת",
      "gender": "female"
    },
    {
      "english_name": "Samuel",
      "hebrew_name": "שְׁמוּאֵל",
      "gender": "male"
    },
    {
      "english_name": "Sarah",
      "hebrew_name": "שָׂרָה",
      "gender": "female"
    },
    {
      "english_name": "Saul",
      "hebrew_name": "שָׁאוּל",
      "gender": "male"
    },
    {
      "english_name": "Shamgar",
      "hebrew_name": "שַׁמְגַּר",
      "gender": "male"
    },
    {
      "english_name": "Sharar",
      "hebrew_name": "שָׁרָר",
      "gender": "male"
    },
    {
      "english_name": "Shealtiel",
      "hebrew_name": "שְׁאַלְתִּיאֵל",
      "gender": "male"
    },
    {
      "english_name": "Sheerah",
      "hebrew_name": "שֶׁאֱרָה",
      "gender": "female"
    },
    {
      "english_name": "Shira",
      "hebrew_name": "שִׁירָה",
      "gender": "female"
    },
    {
      "english_name": "Simon",
      "hebrew_name": "שִׁמְעוֹן",
      "gender": "male"
    },
    {
      "english_name": "Solomon",
      "hebrew_name": "שְׁלֹמֹה",
      "gender": "male"
    },
    {
      "english_name": "Suri",
      "hebrew_name": "שׂוּרִי",
      "gender": "female"
    },
    {
      "english_name": "Talia",
      "hebrew_name": "טַלְיָה",
      "gender": "female"
    },
    {
      "english_name": "Tamar",
      "hebrew_name": "תָּמָר",
      "gender": "female"
    },
    {
      "english_name": "Yemima",
      "hebrew_name": "יְמִימָה",
      "gender": "female"
    },
    {
      "english_name": "Yonah",
      "hebrew_name": "יוֹנָה",
      "gender": "both"
    },
    {
      "english_name": "Zebedee",
      "hebrew_name": "זְבַדְיָה",
      "gender": "male"
    },
    {
      "english_name": "Zev",
      "hebrew_name": "זְאֵב",
      "gender": "male"
    },
    {
      "english_name": "Zion",
      "hebrew_name": "צִיּוֹן",
      "gender": "both"
    },
    {
      "english_name": "Zipporah",
      "hebrew_name": "צִפֹּרָה",
      "gender": "female"
    }
  ];
  
  // Combine both parts of the data array
  const allNamesData = [...namesData, ...namesData2];

  // Hebrew Names Tinder App
const HebrewNamesTinder = () => {
    const [currentFilter, setCurrentFilter] = useState('all'); // 'all', 'male', 'female', 'both'
    const [currentNameIndex, setCurrentNameIndex] = useState(0);
    const [likedNames, setLikedNames] = useState([]);
    const [dislikedNames, setDislikedNames] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [filteredNames, setFilteredNames] = useState([]);
  
    // Initialize filtered names based on selected filter
    useEffect(() => {
      let filtered;
      
      if (currentFilter === 'all') {
        filtered = [...allNamesData];
      } else {
        filtered = allNamesData.filter(name => name.gender === currentFilter);
      }
      
      // Reset the index when filter changes
      setCurrentNameIndex(0);
      setFilteredNames(filtered);
    }, [currentFilter]);
  
    // Handle like button click
    const handleLike = () => {
      if (currentNameIndex < filteredNames.length) {
        setLikedNames([...likedNames, filteredNames[currentNameIndex]]);
        moveToNextName();
      }
    };
  
    // Handle dislike button click
    const handleDislike = () => {
      if (currentNameIndex < filteredNames.length) {
        setDislikedNames([...dislikedNames, filteredNames[currentNameIndex]]);
        moveToNextName();
      }
    };
  
    // Move to next name
    const moveToNextName = () => {
      if (currentNameIndex < filteredNames.length - 1) {
        setCurrentNameIndex(currentNameIndex + 1);
      } else {
        // End of names reached
        setShowResults(true);
      }
    };
  
    // Reset the session
    const resetSession = () => {
      setCurrentNameIndex(0);
      setLikedNames([]);
      setDislikedNames([]);
      setShowResults(false);
    };
  
    // Change filter
    const changeFilter = (filter) => {
      setCurrentFilter(filter);
      setShowResults(false);
      setLikedNames([]);
      setDislikedNames([]);
    };
  
    // Group names by gender
    const groupNamesByGender = (names) => {
      const grouped = {
        male: names.filter(name => name.gender === 'male'),
        female: names.filter(name => name.gender === 'female'),
        both: names.filter(name => name.gender === 'both')
      };
      return grouped;
    };
  
    // Render gender symbol
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
            filteredNames.length > 0 && currentNameIndex < filteredNames.length ? (
              <div className="w-full max-w-md">
                {/* Name Card */}
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                  <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-blue-600">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-lg text-white font-bold px-4 py-1 rounded-full bg-indigo-700 bg-opacity-70">
                        {filteredNames[currentNameIndex].gender === 'male' ? 'Biblical Male Name' : 
                         filteredNames[currentNameIndex].gender === 'female' ? 'Biblical Female Name' : 
                         'Biblical Gender-Neutral Name'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <h2 className="text-3xl font-bold text-gray-800">
                        {filteredNames[currentNameIndex].english_name}
                      </h2>
                      <span className="ml-2 text-2xl">
                        {renderGenderSymbol(filteredNames[currentNameIndex].gender)}
                      </span>
                    </div>
                    
                    <div className="flex justify-center mb-6">
                      <h3 className="text-2xl text-gray-700 font-semibold">
                        {filteredNames[currentNameIndex].hebrew_name}
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
                    {currentNameIndex + 1} of {filteredNames.length}
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
            // Results Screen will be continued in next part
            null
          )}
        </div>
      );
    };
    
    export default HebrewNamesTinder;


    // This is the continued Results Screen section from the previous part
// Replace the "null" in the previous part with this code:
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
  </div>
</div>