import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      isLoading: false,
      isChecked: false,
    };
  }

  componentDidMount() {
    this.recoverFavSongs();
  }

  /**
   * Requisito 09 resolvido a partir da referência do repositério do aluno Carlos Rosa
   * Link do Repositório: https://github.com/tryber/sd-017-project-trybetunes/pull/111
   */
  recoverFavSongs = async () => {
    this.setState({ isLoading: true });
    const recoveredFavSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteSongs: recoveredFavSongs,
    }, () => {
      /**
       * Estrutura que foi usada de referência:
       * Usando o método some para percorrer o estado favoriteSongs, é possível fazer uma
       * simples verificação onde: caso a musica com o mesmo trackId estivesse no array de
       * músicas favoritas, ela já inicia com o checked = true
       */
      const { favoriteSongs } = this.state;
      const { music } = this.props;
      const wasChecked = favoriteSongs.some((favMusic) => (
        favMusic.trackId === music.trackId
      ));
      if (wasChecked) {
        this.setState({
          isChecked: true,
        });
      }
    });
  }

  /**
   * Substituição do target.name pelo event na callback da linha 84
   */
  addFavoriteSong = async (event, music) => {
    this.setState({
      isLoading: true,
      isChecked: event.target.checked,
    });
    if (event.target.checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { music } = this.props;
    const { isLoading, isChecked } = this.state;
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
            type="checkbox"
            onChange={ (event) => this.addFavoriteSong(event, music) }
            checked={ isChecked }
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
