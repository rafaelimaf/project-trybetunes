import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoginDisabled: true,
      isLoading: false,
      isRedirecting: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.ableLoginBtn);
  }

  ableLoginBtn = () => {
    const { name } = this.state;
    const LOGIN_NAME_MIN_SIZE = 3;
    if (name.length > LOGIN_NAME_MIN_SIZE) {
      this.setState({
        isLoginDisabled: false,
      });
    }
  }

  render() {
    const { name, isLoginDisabled, isLoading, isRedirecting } = this.state;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <label htmlFor="name">
          <input
            data-testid="login-name-input"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ isLoginDisabled }
          /**
           * Foi usado como referência o repositório do Aluno Pedro Goulart para entender
           * que deveria ser usado uma função asincrona na requisição da API.
           */
          onClick={ async () => {
            this.setState({
              isLoading: true,
              isRedirecting: true,
            });
            await createUser({ name: { name } });
          } }
        >
          Entrar
        </button>
        {isLoading ? <p>Carregando...</p> : null}
        {isRedirecting ? <Redirect to="/search" /> : null}
      </div>
    );
  }
}
