import React, { Component } from 'react';
import axios from '../axios';
import NavBar from '../components/NavBar'
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { BrowserHistory } from 'react-router';
class LoginScreen extends Component {
  state = {
    username: '',
    password: '',
    loggedIn: false,
    redirect: '/',
  };
  _onLogin = () => {
    axios
      .post("/api/auth", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        this.setState({
          username: response.data.username,
          id: response.data.id,
          loggedIn: true
        })
      }

      )
      .catch(err => console.error(err));
  };


  render() {
    if (this.state.loggedIn)  return <Redirect to='/users'/>;
    else
    return (
      <div>
        <NavBar username={this.state.username}/>
        <div className='container'>
        <input type='text' class="form-control" placeholder='username' required='true'
          onChange={event => {
            this.setState({ username: event.target.value });
          }} />
        <input type='password'class="form-control" placeholder='password' required='true'
          onChange={event => {
            this.setState({ password: event.target.value });
          }} />
        <button className="btn btn-lg btn-primary btn-block btn-signin"
          onClick={this._onLogin}
        >
          Sign in</button>
      </div>
      </div>
    );
  }
}

export default LoginScreen;