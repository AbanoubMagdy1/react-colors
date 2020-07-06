import React, {useState} from 'react'
import FormDialog from "./FormDialog"
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'


function NavForm(props) {
    const [openD, setOpenD] = useState(false);
    const {classes, open, handleDrawerOpen, addPalette, palettes} = props;

    const handleOpen = () => {
        setOpenD(true);
    };

    return (
        <div>
            <AppBar
                style={{backgroundColor : '#eeeeee'}}
                position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                <IconButton
                    color="primary"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap color="textPrimary" className={classes.text}>
                    ColorBoxes
                </Typography>
                <div className={classes.btns}>
                    <Link to="/" style={{textDecoration : "none"}}>
                        <Button
                            variant="contained"
                            color="secondary"
                        >
                            Go back
                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpen}
                    >
                        Save Palette
                    </Button>
                </div>
                <FormDialog
                    open={openD}
                    setOpen={setOpenD}
                    addPalette={addPalette}
                    classes={classes}
                    palettes={palettes}
                />
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavForm