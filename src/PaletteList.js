import React, { Component } from 'react';
import MiniPalette from './MiniPalette'
import './PaletteList.css'
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles'
/*.PaletteList{
    background-color: gray;
    padding : 1rem;
    width: 60%;
    margin: 2rem auto;
    min-width: 400px;
    background-color: gray;
    border-radius: 15px;
}
.PaletteList header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.PaletteList .palettes{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1em;
}
.PaletteList a{
    text-decoration: none;
}*/
const styles = {
    root : {
        width : "100vw",
        height : "100vh",
        
    }
}
class PaletteList extends Component {
    render() {
        const { palettes , remove, classes} = this.props
        return (
            <div className="root">
                <div className="PaletteList">
                    <header>
                        <h2>React colors</h2>
                        <Link to='/palette/new'>Create new palette</Link>
                    </header>
                    <div className="palettes">
                    {palettes.map(palette => (
                        <MiniPalette {...palette} remove={remove}/>
                    ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);