import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      userName: '',
    };
    this.recoverUser = this.recoverUser.bind(this);
  }

  componentDidMount() {
    this.recoverUser();
  }

  async recoverUser() {
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
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        <h1>Trybetunes</h1>
        {isLoading ? (<p>Carregando...</p>) : (
          <div>
            <h2 data-testid="header-user-name">
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
