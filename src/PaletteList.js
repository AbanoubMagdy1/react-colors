import React, { Component } from 'react';
import MiniPalette from './MiniPalette'
import './PaletteList.css'
import {Link} from 'react-router-dom';

class PaletteList extends Component {
    render() {
        const { palettes } = this.props
        return (
            <div className="PaletteList">
                {palettes.map(palette => (
                    <Link to={`/palette/${palette.id}`}><MiniPalette {...palette}/></Link>
                ))}
            </div>
        );
    }
}

export default PaletteList;