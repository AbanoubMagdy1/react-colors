import React, { Component } from 'react';
import ColorBox from './ColorBox'
import NavBar from './NavBar'
import './Palette.css'
import { Link } from 'react-router-dom';


class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this.state = { format : "hex"}
    }
    handleFormat = (value) => {
        this.setState({format : value})
    }
    render() {
        const {format} = this.state
        const colorBoxes = this.props.colors.map((color, i) => (
            <ColorBox background={color[format]}
                      name={color.name}
                      key={i}
                      index={i}
                      paletteId={this.props.id}
                      original={false}/>
        ))
        return (
            <div className="Palette">
                <NavBar handleSelect={this.handleFormat}
                        format={this.state.format}
                        original={false}/>
                
                <div className='Palette-colors'>
                    {colorBoxes}
                    <div className='BackBox'>
                        <Link to={`/palette/${this.props.id}`}>Go Back</Link>
                    </div>
                </div>
                <footer className="Palette-footer">
                    {this.props.paletteName}
                    <span className="emoji">{this.props.emoji}</span>
                </footer>
                
            </div>
        );
    }
}

export default SingleColorPalette;