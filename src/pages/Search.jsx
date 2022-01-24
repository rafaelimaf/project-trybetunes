import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      isSearchBtnDisabled: true,
      artistList: [],
      artistName: '',
      isLoading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.ableSearchBtn);
  }

  ableSearchBtn = () => {
    const { searchInput } = this.state;
    const SEARCH_MIN_SIZE = 2;
    if (searchInput.length >= SEARCH_MIN_SIZE) {
      this.setState({
        isSearchBtnDisabled: false,
      });
    }
  }

  searchArtist = async () => {
    this.setState({ isLoading: true });
    const { searchInput } = this.state;
    const requestArtist = await searchAlbumsAPI(searchInput);
    this.setState((prevState) => ({
      isLoading: false,
      artistList: [...requestArtist],
      artistName: prevState.searchInput,
      searchInput: '',
    }));
  }

  render() {
    const {
      searchInput,
      isSearchBtnDisabled,
      isLoading,
      artistName,
      artistList,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <div>
            <input
              data-testid="search-artist-input"
              placeholder="Pesquise por artista"
              type="text"
              name="searchInput"
              value={ searchInput }
              onChange={ this.handleChange }
            />
            <button
              data-testid="search-artist-button"
              type="submit"
              disabled={ isSearchBtnDisabled }
              onClick={ this.searchArtist }
            >
              Pesquisar

            </button>
          </div>
        )}
        {artistList.length > 0 ? (
          <div>
            <p>
              Resultado de álbuns de:
              {' '}
              {artistName}
            </p>
            {artistList.map((album) => (
              <div key={ album.collectionId }>
                <Link
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  <h2>{album.collectionName}</h2>
                </Link>
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhum álbum foi encontrado</p>
        )}
      </div>
    );
  }
}
