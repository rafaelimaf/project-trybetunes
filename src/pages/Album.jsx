import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumMusics: [],
      albumInfos: '',
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match } = this.props;
    const recoveredMusics = await getMusics(match.params.id);
    /**
     * Trecho do código usado de referência do aluno Carlos Rosa, usado para separar as músicas das
     * informações do album que ficam no index 0 do array recuṕerado.
     * Link do repositório: https://github.com/tryber/sd-017-project-trybetunes/pull/111
     */
    const [infos, ...musics] = recoveredMusics;
    this.setState({ albumInfos: infos, albumMusics: musics });
    console.log(recoveredMusics);
  }

  render() {
    const {
      albumMusics,
      albumInfos,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{albumInfos.artistName}</h1>
        <div data-testid="album-name">
          <h2>{albumInfos.artistName}</h2>
          <h3>{albumInfos.collectionName}</h3>
        </div>
        {albumMusics.map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
          />
        ))}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.isRequired;
