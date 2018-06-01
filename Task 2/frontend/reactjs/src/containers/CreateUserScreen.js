import React, { Component } from 'react';
import axios from '../axios';
import NavBar from '../components/NavBar'
import $ from 'jquery'
import { Redirect } from "react-router-dom";
class CreateUserScreen extends Component {
  state = {}
  _onRegister = async () => {
   await this.setState({registered : true})
    axios
      .post("/api/users", {
        username: this.state.username,
        password: this.state.password,
        fullname: this.state.fullname,
        email: this.state.email
      }
      )
      .then(console.log('ok'))
      .catch(err => {console.log(err)
    this.setState({registered : false})
  })
  }

  render() {
    if(this.state.registered) return <Redirect to='/'/>;
    else
    return (
      <div>
        <NavBar/>
        <div className='container'>
        <input type='text' class="form-control" placeholder='Username' required='true'
          onChange={event => {
            this.setState({ username: event.target.value });
          }} />
        <input type='text'class="form-control" placeholder='Fullname' required='true'
          onChange={event => {
            this.setState({ fullname: event.target.value });
          }} />
        <input type='password'class="form-control" placeholder='Password' required='true'
          onChange={event => {
            this.setState({ password: event.target.value })
          }} />
        <input type='password'class="form-control" placeholder='Confirm Password' required='true'
          onChange={event => {
            event.target.value != this.state.password ? $('.confirm_password').html('Not Match').css('color', 'red') : $('.confirm_password').html('Match').css('color', 'green')
          }} />
          <span className='confirm_password'></span>
        <input type='text'class="form-control" placeholder='Email' required='true'
          onChange={event => {
            this.setState({ email: event.target.value });
          }} />
        <button class="btn btn-lg btn-primary btn-block btn-signin"
          onClick={this._onRegister}
        >
          Register</button>
      </div>
      </div>
    );
  }
}

export default CreateUserScreen;