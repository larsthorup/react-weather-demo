import React, { Component } from 'react';
import './App.css';
import Lock from './Lock';
import Weather from './Weather';

class App extends Component {
  constructor () {
    super();
    this.state = {
      apikey: null
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Lock onLock={this.onLock} onUnlock={this.onUnlock}/>
        </div>
        {this.state.apikey ? <Weather apikey={this.state.apikey}/> : null}
      </div>
    );
  }

  onLock = () => {
    this.setState({
      ...this.state,
      apikey: null
    });
  }

  onUnlock = (apikey) => {
    this.setState({
      ...this.state,
      apikey
    });
  }
}

export default App;
