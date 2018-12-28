import React from 'react';
import Stations from '../components/Stations';
import { connect } from 'react-redux';

function mapStateToProps (state){
	return {
		stations : convertSongsToStations (state.songs)
	}
}
function mapDispatchToProps (distpach){
	return {}
}

// Me llega un arreglo de canciones y tengo que filtrarlo para devolver un objeto
// donde las keys van a ser los generos y los values, arreglos con las diferentes songs.
function convertSongsToStations (songsArray){
	const stations={};
	songsArray.map (song => {
		stations [song.genre] ? stations [song.genre].push (song) : stations [song.genre]= [song];		
	})
	return stations;
}

const StationsContainer= connect (mapStateToProps, mapDispatchToProps)(Stations);

export default StationsContainer;
