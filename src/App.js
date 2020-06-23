import React, { Component } from 'react';
import Palette from './Palette'
import generatePalette from './Shades'
import colors from './seedColors'

class App extends Component {
  render() {
    return (
      <div>
        <Palette {...generatePalette(colors[4], 9)}/>
      </div>
    );
  }
}

export default App;
