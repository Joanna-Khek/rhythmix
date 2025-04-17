import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AxiosInstance from './Axios'; // assuming this is pre-configured Axios
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Recommender() {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [hasClicked, setHasClicked] = useState(false);

  const markdownStyle = {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '1em',
    },
    th: {
      border: '1px solid #ccc',
      padding: '8px',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
    },
    td: {
      border: '1px solid #ccc',
      padding: '8px',
    },
  };

   const getRecommendation = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.post('/prediction/', {});
      console.log("Prediction response:", response.data);
      setRecommendation(response.data.recommendation);
      setHasClicked(true);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
    } finally {
      setLoading(false);
    }
  };


  // Component to render a single song recommendation with a Like button
  const SongRecommendation = ({ markdown, index }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [songError, setSongError] = useState(null);
    const [saveMessage, setSaveMessage] = useState(null);

    // Extract song title
    const titleMatch = markdown.match(/\*\*Song Title: (.*?)\*\*/);
    const songTitle = titleMatch ? titleMatch[1] : `Song ${index + 1}`;

    // Extract table data (Artist, Genre, Search Score, Spotify Link)
    const extractSongDetails = () => {
        const details = {
          song_name: songTitle,
          song_artists: '',
          song_genre: '',
          song_link: '',
          score: '',
        };

        // Match table rows
        const rowMatches = markdown.match(/\|\s*\*\*(.*?)\*\*\s*\|\s*(.*?)\s*\|/g);
        if (rowMatches) {
          rowMatches.forEach(row => {
            const [, attribute, value] = row.match(/\|\s*\*\*(.*?)\*\*\s*\|\s*(.*?)\s*\|/);
            if (attribute === 'Artist') {
              details.song_artists = value.trim();
            } else if (attribute === 'Genre') {
              details.song_genre = value.trim();
            } else if (attribute === 'Search Score') {
              details.score = value.trim();
            } else if (attribute === 'Spotify Link') {
              // Extract the URL from [text](url)
              const linkMatch = value.match(/\[.*?\]\((.*?)\)/);
              details.song_link = linkMatch ? linkMatch[1].trim() : '';
            }
          });
        }

        return details;
      };

    const songDetails = extractSongDetails();

    // Check if song exists in database on component mount
    useEffect(() => {
      const checkSongExists = async () => {
        try {
          const response = await AxiosInstance.get('songs-saved/', {
            params: {
              song_name: songDetails.song_name,
              song_artists: songDetails.song_artists,
            },
          });

          const songs = response.data;
          const songExists = songs.some(
            song =>
              song.song_name === songDetails.song_name &&
              song.song_artists === songDetails.song_artists
          );

          if (songExists) {
            setIsSaved(true);
            setSaveMessage('Song already saved in songs');
          }
        } catch (error) {
          console.error('Error checking song existence:', error);
          setSongError('Error checking song existence');
        }
      };

      checkSongExists();
    }, [songDetails.song_name, songDetails.song_artists]);

    const handleSaved = () => {
        if (isSaved) return; // Prevent multiple likes

        setSongError(null);
        try {
          const response = AxiosInstance.post('songs-saved/', songDetails);
          setSaveMessage('Saved!');
          setIsSaved(true);
        } catch (error) {
          console.error("Error saving song:", error);
          setSongError('Error saving song');
        }

      };

    return (
      <Box sx={{ mb: 4 }}>
        <ReactMarkdown
          children={markdown}
          remarkPlugins={[remarkGfm]}
          components={{
            table: ({ node, ...props }) => <table style={markdownStyle.table} {...props} />,
            th: ({ node, ...props }) => <th style={markdownStyle.th} {...props} />,
            td: ({ node, ...props }) => <td style={markdownStyle.td} {...props} />,
          }}
        />
        <Button
          onClick={handleSaved}
          variant={isSaved ? 'contained' : 'outlined'}
          color={songError ? 'error' : isSaved ? 'success' : 'primary'}
          sx={{ mt: 2 }}
        >
          {saveMessage || 'Save to Songs?'}
        </Button>
        {songError && (
          <Typography color="error" sx={{ mt: 1 }}>
            {songError}
          </Typography>
        )}
      </Box>
    );
  };

  // Split recommendation into song sections
  const songSections = recommendation
    ? recommendation
        .split(/(?=\n\*\*Song Title:.*?\*\*\n)/)
        .filter(section => section.includes('Song Title'))
        .map(section => section.trim())
    : [];

  return (
    <Box sx={{ width: '100%', mt: 5, px: 2 }}>
      <Button
        onClick={getRecommendation}
        variant="contained"
        disabled={loading || hasClicked}
        sx={{ mb: 2 }}
      >
        {loading ? 'Generating...' : 'Get Song Recommendation'}
      </Button>

      {recommendation && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Song Recommendations
          </Typography>
          {songSections.length > 0 ? (
            songSections.map((section, index) => (
              <SongRecommendation key={index} markdown={section} index={index} />
            ))
          ) : (
            <Typography>No valid song recommendations found.</Typography>
          )}
        </Box>
      )}

    </Box>
  );
}
