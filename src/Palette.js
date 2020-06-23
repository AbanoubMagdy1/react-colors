import React, { Component } from 'react';
import ColorBox from './ColorBox'
import NavBar from './NavBar'
import './Palette.css'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class Palette extends Component {
    constructor(props){
        super(props);
        this.state = {degree : 500, format : "hex", open : false}
    }
    handleLevelChange = (value) => {
        this.setState({degree : value})
    }
    handleFormat = (value) => {
        this.setState({format : value, open : true})
    }
    handleClose = () => {
        this.setState({open : false})
    }
    render() {
        console.log(this.props)
        const {degree} = this.state
        const colorBoxes = this.props.colors[degree].map((color, i) => (
            <ColorBox background={color[this.state.format]} name={color.name} key={i}/>
        ))
        return (
            <div className="Palette">
                <NavBar handleSlider={this.handleLevelChange}
                        level={this.state.degree}
                        handleSelect={this.handleFormat}
                        format={this.state.format}/>
                
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                <footer className="Palette-footer">
                    {this.props.paletteName}
                    <span className="emoji">{this.props.emoji}</span>
                </footer>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={<span>Format changed to {this.state.format.toUpperCase()}</span>}
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
        );
    }
}

export default Palette;