import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import {AnimatedSwitch} from 'react-router-transition'
import Palette from './Palette'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from './NewPaletteForm'
import generatePalette from './Shades'
import colors from './seedColors'
import './App.css'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      palettes : JSON.parse(localStorage.getItem("palettes") || "[]")
    }
  }
  getPalette = (props) => {
    const rightPalette = this.state.palettes.find(palette => {
      return palette.id === props.match.params.id;
    })
    return <Palette {...generatePalette(rightPalette, 9)}/>
  }

  getColor = (props) => {
    const {paletteid, colorid} = props.match.params;
    const rightPalette = this.state.palettes.find(palette => {
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

  addPalette = (palette) => {
    this.setState({palettes : [...this.state.palettes, palette]},() => {
      localStorage.setItem("palettes", JSON.stringify(this.state.palettes))
    })
  }

  removePalette = (id) => {
    let palettes = JSON.parse(localStorage.getItem("palettes"));
    palettes = palettes.filter(palette => palette.id !== id);
    this.setState({palettes}, () => {
      localStorage.setItem("palettes", JSON.stringify(this.state.palettes))
    })
  }
  render() {
    if(this.state.palettes.length < 1){
      localStorage.setItem("palettes", JSON.stringify(colors));
      this.setState({palettes : colors})
    }
    return (
      <div>
        <AnimatedSwitch
          atEnter={{opacity : 0}}
          atLeave={{opacity : 0}}
          atActive={{opacity : 1}}
          className="switch-wrapper"
        >
          <Route exact path="/palette/new" render={(routerProps) => <NewPaletteForm 
                                                            addPalette={this.addPalette}
                                                            palettes={this.state.palettes}
                                                            {...routerProps}
          />}/>
          <Route exact path="/" render={() => {return <PaletteList 
                                                        palettes={this.state.palettes}
                                                        remove={this.removePalette}/>}}/>
          <Route exact path="/palette/:id" render={this.getPalette}/>
          <Route exact path="/palette/:paletteid/:colorid" render={this.getColor}/>
        </AnimatedSwitch>
      </div>
    );
  }
}

export default App;
