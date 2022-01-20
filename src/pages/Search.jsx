import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      isSearchBtnDisabled: true,
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

  render() {
    const { searchInput, isSearchBtnDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
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
        >
          Pesquisar

        </button>
      </div>
    );
  }
}
