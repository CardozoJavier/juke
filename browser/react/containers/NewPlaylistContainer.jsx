import React from 'react';
import axios from 'axios';
import NewPlaylist from '../components/NewPlaylist';
import store from '../store';
import { createPlaylist } from '../action-creators/playlists';

export default class NewPlaylistContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      invalidLength: true,
      hasChanged: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

	// Seteo el nombre de la playlist y verifico que no exceda los 16 caracteres
  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      value: value,
      invalidLength: value.length < 1 || value.length > 16,
      hasChanged: true,
    });
  }

	// Envio la info de la nueva playlist y reseteo el state local.
  handleSubmit(evt) {
    evt.preventDefault();
    this.addPlaylist(this.state.value)
    this.setState({
      value: '',
    });
  }

	// Creo una nueva playlist.
  addPlaylist(name) {
    store.dispatch(createPlaylist(name))
      .then((id) => this.props.history.push(`/playlists/${id}`))
  }


  render() {
    return (
      <NewPlaylist
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        value={this.state.value}
        invalidLength={this.state.invalidLength}
        hasChanged={this.state.hasChanged}
      />
    );
  }
}