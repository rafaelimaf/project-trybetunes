import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { createUser } from '../services/userAPI';
import '../styles/LoginPage.css';

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

  componentDidMount() {
    Aos.init({
      duration: 700,
    });
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
    } else if (userName.length <= LOGIN_NAME_MIN_SIZE) {
      this.setState({
        isLoginDisabled: true,
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
      <div className="login-page">
        {isLoading ? (
          <div className="loading-container">
            <p className="loading-text" data-aos="fade">
              Carregando...
            </p>
            <div className="loading-img" data-aos="fade" />
          </div>
        ) : (
          <div
            className="login-container"
            data-testid="page-login"
            data-aos="fade-up"
          >
            <h1 className="login-title">Login</h1>
            <label htmlFor="userName">
              Usuário
              <input
                className="login-input"
                data-testid="login-name-input"
                type="text"
                name="userName"
                value={ userName }
                onChange={ this.handleChange }
              />
            </label>
            <button
              className="login-btn"
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
        )}
        {isRedirecting ? <Redirect to="/search" /> : null}
      </div>
    );
  }
}
