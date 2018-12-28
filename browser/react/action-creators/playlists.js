import axios from 'axios';
import { RECEIVE_PLAYLISTS, RECEIVE_PLAYLIST, ADD_PLAYLIST, ADD_SONG_TO_PLAYLIST } from '../constants';

const receivePlaylists = playlists => ({
  type: RECEIVE_PLAYLISTS,
  playlists,
});

const receivePlaylist = playlist => ({
  type: RECEIVE_PLAYLIST,
  playlist,
});

const addPlaylist = playlist => ({
  type: ADD_PLAYLIST,
  playlist
})

const addSongToPlaylist = song => ({
  type: ADD_SONG_TO_PLAYLIST,
  song,
})

// Hago un pedido por todas las playlists.
export const fetchPlaylists = () => dispatch =>
  axios.get('/api/playlists')
    .then(res => res.data)
    .then(playlists => dispatch(receivePlaylists(playlists)));

// Hago un pedido por una playlist particular.
export const fetchPlaylist = playlistId => dispatch =>
  axios.get(`/api/playlists/${playlistId}`)
    .then(res => res.data)
    .then(playlist => dispatch(receivePlaylist(playlist)));


// Creo una nueva playlist.
export const createPlaylist = name => dispatch =>
  axios.post('/api/playlists', { name })
    .then(res => res.data)
    .then(playlist => {
      dispatch(addPlaylist(playlist));
      return playlist.id;
    });

// Agrego una cancion a una playlist especifica.
export const addSong = id => (dispatch, getState) => {
  const { selected } = getState().playlists;
  return axios.post(`/api/playlists/${selected.id}/songs`, { id })
    .then(res => res.data)
    .then(song => dispatch(addSongToPlaylist(song)));
}

