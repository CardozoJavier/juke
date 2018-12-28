import axios from 'axios';
import { RECEIVE_ALBUMS, RECEIVE_ALBUM } from '../constants';

const receiveAlbums = (albums) => ({
  type: RECEIVE_ALBUMS,
  albums,
});

const receiveAlbum = (album) => ({
  type: RECEIVE_ALBUM,
  album,
});

// Hago un pedido por todos los albums.
export const fetchAlbums = () => dispatch =>
  axios.get('/api/albums')
    .then(res => res.data)
    .then(albums => dispatch(receiveAlbums(albums)));

// Hago un pedido por un album particular.
export const fetchAlbum = id => dispatch =>
  axios.get(`/api/albums/${id}`)
    .then(res => res.data)
    .then(album => dispatch(receiveAlbum(album)));