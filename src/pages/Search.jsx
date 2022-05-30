import React, { Component } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/pages/SearchPage.css';
import Albums from '../components/Albums';

const SEARCH_MIN_SIZE = 2;

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      isSearchBtnDisabled: true,
      albumsList: [],
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
    } else if (searchInput.length <= SEARCH_MIN_SIZE) {
      this.setState({
        isSearchBtnDisabled: true,
      });
    }
  }

  searchArtist = async () => {
    this.setState({ isLoading: true });
    const { searchInput } = this.state;
    const requestArtist = await searchAlbumsAPI(searchInput);
    this.setState((prevState) => ({
      isLoading: false,
      albumsList: [...requestArtist],
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
      albumsList,
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
        {albumsList.length > 0 ? (
          <Albums albumsList={ albumsList } />
        ) : (
          <div className="centralize-container" data-aos="fade-down">
            <div className="not-found-container">
              <p className="not-found-text">Nenhum álbum foi encontrado</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
