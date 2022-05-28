import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

const LOGIN_NAME_MIN_SIZE = 3;

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
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
    const { userName } = this.state;
    if (userName.length >= LOGIN_NAME_MIN_SIZE) {
      this.setState({
        isLoginDisabled: false,
      });
    }
  }

  saveUser = async () => {
    const { userName } = this.state;
    await createUser({ name: userName }, this.setState({
      isLoading: true,
    }));
    this.setState({
      isRedirecting: true,
    });
  }

  render() {
    const { userName, isLoginDisabled, isLoading, isRedirecting } = this.state;
    return (
      <div>
        {isLoading ? (<p>Carregando...</p>) : (
          <div>
            <div data-testid="page-login">
              <h1>Login</h1>
              <label htmlFor="userName">
                <input
                  data-testid="login-name-input"
                  type="text"
                  name="userName"
                  value={ userName }
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
                onClick={ this.saveUser }
              >
                Entrar
              </button>
            </div>
          </div>
        )}
        {isRedirecting ? <Redirect to="/search" /> : null}
      </div>
    );
  }
}
