import React, { Component } from 'react';
import colors from './seedColors'
import Palette from './Palette'


class App extends Component {
  render() {
    return (
      <div>
        <Palette {...colors[7]}/>
      </div>
    );
  }
}

export default App;
