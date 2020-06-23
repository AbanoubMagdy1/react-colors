import React, { Component } from 'react';
import './NavBar.css'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

class NavBar extends Component {
    handleChange = (e) => {
        this.props.handleSlider(e.target.value)
    } 
    handleSelect = (e) => {
        this.props.handleSelect(e.target.value)
    }
    render() {
        return (
            <div className="NavBar">
                    <div className="NavBar-link">
                        <a href="/">reactcolorpicker</a>
                    </div>
                    <span>Level : {this.props.level}</span>
                    <input className="slider"
                        type='range'
                        min="100"
                        max="900"
                        step="100"
                        defaultValue="500"
                        onChange={this.handleChange}/>
                <div className="NavBar-select">
                    <Select value={this.props.format} onChange={this.handleSelect}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - (255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - (255,255,255,1.0)</MenuItem>
                    </Select>
                </div>       
            </div>
        );
    }
}

export default NavBar;