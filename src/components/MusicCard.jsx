import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      isLoading: false,
    };
  }

  addFavoriteSong = async ({ target }) => {
    this.setState({
      isLoading: true,
    });
    const addedSong = await addSong(target.name);
    this.setState({
      isLoading: false,
    });
    console.log(`${addedSong} adicionada aos favoritos`);
  }

  render() {
    const { music } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        <p>{music.trackName}</p>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          <input
            data-testid={ `checkbox-music-${music.trackId}` }
            name={ music.trackName }
            type="checkbox"
            onChange={ this.addFavoriteSong }
          />
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            null
          )}
        </label>
      </div>);
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
