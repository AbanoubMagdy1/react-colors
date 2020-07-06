import React, { Component } from 'react';
import MiniPalette from './MiniPalette'
import './PaletteList.css'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {Link} from 'react-router-dom';


class PaletteList extends Component {
    render() {
        const { palettes , remove} = this.props
        return (
            <div className="PaletteList-root">
                <div className="PaletteList">
                    <header>
                        <h2>React colors</h2>
                        <Link to='/palette/new'>Create new palette</Link>
                    </header>
                    <TransitionGroup className="palettes">
                    {palettes.map(palette => (
                        <CSSTransition
                            key={palette.id}
                            timeout={500}
                            classNames="item"
                        >
                            <MiniPalette {...palette} remove={remove} key={palette.id}/>
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                </div>
            </div>
        );
    }
}

export default PaletteList;