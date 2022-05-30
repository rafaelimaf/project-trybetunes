import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Albums extends Component {
  render() {
    const { albumsList } = this.props;
    return (
      <div>
        {albumsList.map((album) => (
          <div
            className="album-container"
            key={ album.collectionId }
          >
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
    );
  }
}

Albums.propTypes = {
  albumsList: PropTypes.arrayOf(Object).isRequired,
};
