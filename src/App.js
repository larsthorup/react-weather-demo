import React, { Component } from 'react';
import './App.css';
import Lock from './Lock';
import Weather from './Weather';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Lock />
        </div>
        <Weather />
      </div>
    );
  }
}

export default App;
