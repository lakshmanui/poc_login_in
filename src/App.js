import React, { Component } from 'react';
import './App.css';
import Login from './login';
import Register from './register';
import { Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard/dashboard';

class App extends Component {
  render() {
    return (
      <div className="main">
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
