import React, { Component } from 'react';

class NavBar extends Component {
  state = {
    username: ''
  }
  componentDidMount() {
    console.log(this.state.username)
  }
  _handleTextChange = event =>
    this.props.onSearchChanged &&
    this.props.onSearchChanged(event.target.value);

  render() {
;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="nav-link" href="/">Login</a>
  <a className="nav-link" href="/register">Register</a>
  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this._handleTextChange}/>
</nav>
      </div>
    );
  }
}

export default NavBar;