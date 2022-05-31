import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import '../styles/components/Albums.css';

export default class Albums extends Component {
  componentDidMount() {
    Aos.init({
      duration: 700,
    });
  }

  render() {
    const { albumsList } = this.props;
    return (
      <div className="albums-container">
        {albumsList.map((album) => (
          <Link
            className="album-container"
            data-aos="fade-down"
            key={ album.collectionId }
            to={ `/album/${album.collectionId}` }
            tabIndex="-1"
          >
            <div>
              <img
                className="album-image"
                src={ album.artworkUrl100 }
                alt={ album.collectionName }
              />
              <div className="album-link">
                <Link
                  className="album-name"
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  <h2>{album.collectionName}</h2>
                </Link>
              </div>
              <div className="album-description">
                <h3 className="track-count">
                  {`${album.trackCount} Tracks`}
                </h3>
                <h6 className="release-date">
                  {`Release ${album.releaseDate}`}
                </h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

Albums.propTypes = {
  albumsList: PropTypes.arrayOf(Object).isRequired,
};
