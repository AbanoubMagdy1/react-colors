import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import UndoIcon from '@material-ui/icons/Undo';


import './MiniPalette.css'

class MiniPalette extends Component {
    constructor(props){
        super(props);
        this.state = {
            open : false
        }
    }
    handleClose = () => {
        this.setState({open : false})
    }
    handleOpen = () => {
        this.setState({open : true})
    }
    remove = () => {
        this.props.remove(this.props.id)
    }

    render() {
        const {paletteName, colors, emoji, id} = this.props;
        const {open} = this.state;
        return (
            <div className="MiniPalette">
                <Link to={`/palette/${id}`}>
                    <div className="MiniPalette-colors">
                        {colors.map(color => (
                            <div className="MiniPalette-box" style={{backgroundColor : color.color}} key={color.name}></div>
                        ))}
                    </div>
                    <div className="MiniPalette-footer">
                        <span>{paletteName}</span>
                        <span>{emoji}</span>
                    </div>
                </Link>
                <IconButton onClick={this.handleOpen}>
                    <DeleteIcon/>
                </IconButton>
                <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
                    <DialogTitle id="simple-dialog-title">Are you sure to delete?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.remove}>
                            <ListItemAvatar className="icon removeIcon">
                                <RemoveCircleIcon/>
                            </ListItemAvatar>
                            <ListItemText primary="Yes" />
                        </ListItem>
                        <ListItem button onClick={this.handleClose}>
                            <ListItemAvatar className="icon undoIcon">
                                <UndoIcon/>
                            </ListItemAvatar>
                            <ListItemText primary="No" />
                        </ListItem>
                    </List>
                </Dialog>           
            </div>
        );
    }
}

export default MiniPalette;