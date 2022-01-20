import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      userName: '',
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
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
