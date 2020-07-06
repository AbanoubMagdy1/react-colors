import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './NavBar.css'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {open : false}
    }
    handleChange = (e) => {
        this.props.handleSlider(e.target.value)
    } 
    handleSelect = (e) => {
        this.setState({ open : true })
        this.props.handleSelect(e.target.value)
    }
    handleClose = () => {
        this.setState({open : false})
    }

    render() {
        const {original, format} = this.props
        return (
            <div className="NavBar">
                <div className='NavBar-link'>
                    <Link to="/">reactcolorpicker</Link>
                </div>
                { original &&(
                <div>
                    <span className="Level">
                        Level : {this.props.level}
                    </span>
                    <input className="slider"
                        type='range'
                        min="100"
                        max="900"
                        step="100"
                        defaultValue="500"
                        onChange={this.handleChange}/>
                </div>    
                )}
                <div className="NavBar-select">
                    <Select value={format} onChange={this.handleSelect}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - (255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - (255,255,255,1.0)</MenuItem>
                    </Select>
                    <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={<span>Format changed</span>}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                        <CloseIcon />
                        </IconButton>
                    }
                />
                </div>       
            </div>
        );
    }
}

export default NavBar;