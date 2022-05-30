import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Pages/SearchPage.css';

const SEARCH_MIN_SIZE = 2;

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      isSearchBtnDisabled: true,
      artistList: [[]],
      artistName: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    Aos.init({
      duration: 1500,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.ableSearchBtn);
  }

  ableSearchBtn = () => {
    const { searchInput } = this.state;
    if (searchInput.length >= SEARCH_MIN_SIZE) {
      this.setState({
        isSearchBtnDisabled: false,
      });
    }
  }

  searchArtist = async (artist) => {
    this.setState({ isLoading: true });
    const { searchInput } = this.state;
    const requestArtist = await searchAlbumsAPI(searchInput || artist);
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
      <div className="page-search" data-testid="page-search">
        <Header />
        {isLoading ? (
          <div className="search-loading-container">
            <div className="search-loading-img" data-aos="fade" />
            <p className="search-loading-text" data-aos="fade">
              Carregando...
            </p>
          </div>
        ) : (
          <div className="search-container">
            <h1 className="search-title" data-aos="fade">Pesquisar Artista</h1>
            <div className="search-bar-container" data-aos="fade">
              <input
                className="search-input"
                data-testid="search-artist-input"
                placeholder="Pesquise por artista"
                type="text"
                name="searchInput"
                value={ searchInput }
                onChange={ this.handleChange }
              />
              <button
                className="search-btn"
                data-testid="search-artist-button"
                type="submit"
                disabled={ isSearchBtnDisabled }
                onClick={ this.searchArtist }
              >
                Pesquisar

              </button>
              <p className="search-result-text" data-aos="fade">
                Resultado de álbuns de:
                {' '}
                {artistName}
              </p>
            </div>
          </div>
        )}
        {artistList.length > 0 ? (
          <div>
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
          <div className="centralize-container">
            <div className="not-found-container">
              <p className="not-found-text">Nenhum álbum foi encontrado</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
