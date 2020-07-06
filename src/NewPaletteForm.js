import React, {useState} from 'react';
import DraggableColorList from './DraggableColorList'
import NavForm from './NavForm'
import NewPicker from './NewPicker'
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import useStyles from './NewPaletteFormStyles'
import arrayMove  from 'array-move';




export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(props.palettes[1].colors.slice(0,10));
  const isFull = colors.length >= 20;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const randomColor = () => {
    let randColor;
    if(colors.length < 20){
      do{
        const randPalette = props.palettes[Math.floor(Math.random() * props.palettes.length)]
        randColor = randPalette.colors[Math.floor(Math.random() * randPalette.colors.length)]
        // eslint-disable-next-line
      } while(colors.some(color => color.name === randColor.name))
      setColors([...colors, randColor])  
    }
  }
  const addPalette = (paletteName, emoji) => {
    const newPalette = {
      paletteName,
      id : paletteName.toLowerCase().replace(/ /g, '-'),
      emoji,
      colors
    }
    props.addPalette(newPalette)
    props.history.push("/")
  }

  const addColor = (color) => {
    setColors([...colors, color])
    
  }

  const removeColor = (name) => {
    setColors(colors.filter(color => color.name !== name))
  }
  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavForm
        classes={classes}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        addPalette={addPalette}
        palettes={props.palettes}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.drawerBody}>
          <Typography variant='h4'>
            Design your palette
          </Typography>
          <div>
            <Button 
              variant="contained" 
              color="primary"
              disabled={isFull}
              onClick={randomColor}>
              Random color
            </Button>
            <Button 
              variant="contained" 
              color="secondary"
              onClick={() => setColors([])}>
              Clear the palette
            </Button>
        </div>
        <NewPicker
          isFull={isFull}
          colors={colors}
          addColor={addColor}
        />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
          <DraggableColorList colors={colors}
                              removeColor={removeColor}
                              axis="xy"
                              onSortEnd={onSortEnd}
          />
      </main>
    </div>
  );
}
