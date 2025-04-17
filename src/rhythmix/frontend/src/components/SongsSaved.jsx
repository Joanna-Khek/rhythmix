import { React, useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import AxiosInstance from './Axios';
import Navbar from './navbar/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SongsSaved({ drawerCloseWidth, drawerOpenWidth }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mySongs, setMySongs] = useState([]);

  useEffect(() => {
    AxiosInstance.get(`songs-saved/`).then((res) => {
      setMySongs(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    AxiosInstance.delete(`songs-saved/${id}/`)
      .then(() => {
        // Remove the deleted song from state
        setMySongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
      })
      .catch((err) => {
        console.error("Failed to delete song:", err);
      });
  };

  return (
    <div
    style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
        width: `calc(100% - ${drawerOpen ? drawerOpenWidth : drawerCloseWidth}px)`,
        marginLeft: drawerOpen ? drawerOpenWidth : drawerCloseWidth,
        transition: 'margin-left 0.3s ease',
        boxSizing: 'border-box',
    }}
    >
      <Navbar open={drawerOpen} setOpen={setDrawerOpen} />
      <Typography variant="h5" gutterBottom sx={{ mb: 5}}>
        Your Saved Songs
      </Typography>
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <TableContainer component={Paper}>
          <Table stickyHeader>

            <TableHead>
              <TableRow>
                <TableCell align="center">Actions</TableCell>
                <TableCell>Song Name</TableCell>
                <TableCell>Artist</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Spotify Link</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {mySongs.map((song, index) => (
                <TableRow key={song.id}>
                  <TableCell align="center">
                    <IconButton color="error" onClick={() => handleDelete(song.id)}>
                        <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{song.song_name}</TableCell>
                  <TableCell>{song.song_artists}</TableCell>
                  <TableCell>{song.song_genre}</TableCell>
                  <TableCell>
                    <a
                      href={song.song_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1976d2' }}
                    >
                      Open Spotify
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
