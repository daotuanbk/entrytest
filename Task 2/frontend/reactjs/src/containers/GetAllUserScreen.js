import React, { Component } from 'react';
import axios from '../axios';
import NavBar from '../components/NavBar';
import Users from '../components/Users'
class GetAllUserScreen extends Component {
  state = {
    users: [],
    pageNumber: [],
    page: [],
    currentPage: 1,
    searchString: ''
  };


  componentDidMount() {
    axios
      .get(`api/users/all`)
      .then(data => {
        let totalPage = Math.floor(data.data.length / 5)
        if (totalPage < data.data.length) {
          totalPage++;
          this.setState({ totalPage: totalPage })
        }
        else {
          this.setState({ totalPage: totalPage })
        }
        let page = [];
        for (let i = 1; i <= this.state.totalPage; i++) {

          page.push(i);
        }
        this.setState({ page: page })
        console.log(this.state.page)
      })
      .catch(err => console.error(err))

    axios
      .get(`api/users?page=1`)
      .then(data => {
        this.setState({
          users: data.data,
        })
      })
      .catch(err => console.error(err))
  }



  _sortUserName = () => {
    axios
      .get(`api/users/sort/username?page=1`)
      .then(data => {
        this.setState({
          users: data.data
        })
      })
      .catch(err => console.error(err));
  }

  _sortFullName = () => {
    axios
      .get(`api/users/sort/fullname?page=1`)
      .then(data => {
        this.setState({
          users: data.data
        })
      })
      .catch(err => console.error(err));
  }

  _sortEmail = () => {
    axios
      .get(`api/users/sort/email?page=1`)
      .then(data => {
        this.setState({
          users: data.data
        })
      })
      .catch(err => console.error(err));
  }

  _changePage = (event) => {
    this.setState({currentPage: event.target.id})
    axios
      .get(`api/users?page=${event.target.id}`)
      .then(data => {
        this.setState({
          users: data.data
        })
      })
      .catch(err => console.error(err))
  }

  _onSearchChanged = text => this.setState({ searchString: text });

  render() {
    const displayedUsers = this.state.users.filter(
      users =>
        users.username.includes(this.state.searchString)
    );

    const allUsername = displayedUsers.map(users =>
      <div className='row'>
        <p className='col-md-4'>{users.username}</p>
        <p className='col-md-4'>{users.fullname}</p>
        <p className='col-md-4'>{users.email}</p>
      </div>
    )

    const pageLink = this.state.page.map(page =>
      <button key={page} id={page} onClick={this._changePage}>{page}</button>

    )
    return (

      <div>
        <NavBar onSearchChanged={this._onSearchChanged} />
        <div className='container'>
          <div className='row soft_buttons'>
            <button className="btn btn-lg btn-primary btn-signin col-md-4 sort" onClick={this._sortUserName}>
              Username</button>
            <button className="btn btn-lg btn-primary btn-signin col-md-4 sort" onClick={this._sortFullName}>
              Fullname</button>
            <button className="btn btn-lg btn-primary btn-signin col-md-4 sort" onClick={this._sortEmail}>
              Email</button>
          </div>
          {allUsername}
          <div className='row'>
            {pageLink}
          </div>
        </div>
      </div>
    );
  }
}

export default GetAllUserScreen;

// isSortUserName={this.state.isSortUserName} isSortFullName={this.state.isSortUserName} isSortEmail={this.state.isSortEmail}