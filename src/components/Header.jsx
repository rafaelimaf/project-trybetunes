import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { getUser } from '../services/userAPI';
import '../styles/components/Header.css';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      userName: '',
    };
  }

  componentDidMount() {
    Aos.init({
      duration: 1500,
    });
    this.recoverUser();
  }

  recoverUser = async () => {
    await getUser();
    const recoverUserName = JSON.parse(localStorage.getItem('user'));
    this.setState({
      isLoading: false,
      userName: recoverUserName.name,
    });
  }

  render() {
    const { isLoading, userName } = this.state;
    return (
      <header className="header-container" data-testid="header-component">
        <div className="links-container" data-aos="fade-down">
          <Link
            className="nav-link"
            data-testid="link-to-search"
            to="/search"
          >
            Pesquisar

          </Link>
          <Link
            className="nav-link"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritos

          </Link>
          <Link
            className="nav-link"
            data-testid="link-to-profile"
            to="/profile"
          >
            Perfil

          </Link>
        </div>
        <h1 className="header-title" data-aos="fade">Trybetunes</h1>
        {isLoading ? (
          <div className="header-loading-container">
            <div className="header-loading-img" data-aos="fade" />
            <p className="header-loading-text" data-aos="fade">
              Carregando...
            </p>
          </div>
        ) : (
          <div className="username-container">
            <h2 data-testid="header-user-name" data-aos="fade">
              Bem vindo(a)
              {' '}
              {userName}
            </h2>
          </div>
        )}
      </header>
    );
  }
}
