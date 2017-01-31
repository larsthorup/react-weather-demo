import React, { Component } from 'react';

class Lock extends Component {
  render() {
    return (
      <form>
        <input placeholder="APPID"/>
        <button>Unlock</button>
      </form>
    );
  }
}

export default Lock;
