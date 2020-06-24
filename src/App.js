import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import Palette from './Palette'
import PaletteList from './PaletteList'
import generatePalette from './Shades'
import colors from './seedColors'

class App extends Component {
  getPalette(props){
    const rightPalette = colors.find(palette => {
      return palette.id === props.match.params.id;
    })
    return <Palette {...generatePalette(rightPalette, 9)}/>
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => {return <PaletteList palettes={colors}/>}}></Route>
          <Route exact path="/palette/:id" render={this.getPalette}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
