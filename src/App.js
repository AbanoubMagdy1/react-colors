import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import Palette from './Palette'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import generatePalette from './Shades'
import colors from './seedColors'

class App extends Component {
  getPalette(props){
    const rightPalette = colors.find(palette => {
      return palette.id === props.match.params.id;
    })
    return <Palette {...generatePalette(rightPalette, 9)}/>
  }

  getColor(props){
    const {paletteid, colorid} = props.match.params;
    const rightPalette = colors.find(palette => {
      return palette.id === paletteid;
    })
    const fullPalette = generatePalette(rightPalette, 9)
    const colorLevels = Object.keys(fullPalette.colors);
    const colorShades = colorLevels.map(level => {
      return fullPalette.colors[level][colorid]
    })
    const palette = {...rightPalette, colors : colorShades}
    return <SingleColorPalette {...palette}/>
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => {return <PaletteList palettes={colors}/>}}></Route>
          <Route exact path="/palette/:id" render={this.getPalette}></Route>
          <Route exact path="/palette/:paletteid/:colorid" render={this.getColor}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
