import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route } from 'react-router-dom';
import LoginScreen from "./containers/LoginScreen";
import CreateUserScreen from "./containers/CreateUserScreen";
import GetAllUserScreen from "./containers/GetAllUserScreen";

class App extends Component {
  state = {};

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={LoginScreen} />
          <Route path="/register" component={CreateUserScreen}/>
          <Route path="/users" component={GetAllUserScreen}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
