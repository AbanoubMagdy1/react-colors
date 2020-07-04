import React, {useState} from 'react';
import DraggableColorList from './DraggableColorList'
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import {ChromePicker} from 'react-color'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import useStyles from './NewPaletteFormStyles'
import { arrayMove } from 'react-sortable-hoc';




export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [color, setColor] = useState("#dd88dd");
  const [colorName, setColorName] = useState("");
  const [paletteName, setPaletteName] = useState("");
  const [colors, setColors] = useState(props.palettes[1].colors.slice(0,10));
  const isFull = colors.length >= 20;
  ValidatorForm.addValidationRule('uniqueName', (value) => {
    return colors.every(({name}) => name !== value)
  });
  ValidatorForm.addValidationRule('uniqueColor', () => {
    return colors.every(colory => colory.color !== color)
  });
  ValidatorForm.addValidationRule('uniquePalette', (value) => {
    return props.palettes.every(palette => 
      palette.paletteName.toLowerCase().replace(/ /g, "-")
       !==
      value.toLowerCase().replace(/ /g, "-")
  )});
  ValidatorForm.addValidationRule('full', () => {
    return colors.length < 20;
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changeColor = (newColor) => {
    setColor(newColor.hex)
  }

  const changeColorName = (e) => {
    setColorName(e.target.value)
  }

  const changePaletteName = (e) => {
    setPaletteName(e.target.value)
  }

  const randomColor = () => {
    let randColor;
    if(colors.length < 20){
      do{
        const randPalette = props.palettes[Math.floor(Math.random() * props.palettes.length)]
        randColor = randPalette.colors[Math.floor(Math.random() * randPalette.colors.length)]
      } while(colors.some(color => color.name === randColor.name))
      setColors([...colors, randColor])  
    }
  }
  const addPalette = () => {
    const newPalette = {
      paletteName,
      id : paletteName.toLowerCase().replace(/ /g, '-'),
      colors
    }
    props.addPalette(newPalette)
    props.history.push("/")
  }

  const addColor = () => {
    const newColor = {color, name : colorName};
    setColors([...colors, newColor])
    setColorName("")
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
          <Typography variant="h6" noWrap color="textPrimary">
            ColorBoxes
          </Typography>
          <ValidatorForm
            onSubmit={addPalette}
          >
            <TextValidator
                onChange={changePaletteName}
                label="Palette Name"
                name="paletteName"
                value={paletteName}
                validators={['required', 'uniquePalette']}
                errorMessages={[
                 'this field is required',
                 'Palette Name must be unique'
                ]}
            />
        <Button
          type='submit' 
          variant='contained'
          color='primary'>
          Save Palette
        </Button>

        </ValidatorForm>
        </Toolbar>
      </AppBar>
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
        <ChromePicker
          color={color} 
          onChangeComplete={changeColor}/>
          <ValidatorForm
            onSubmit={addColor}
          >
            <TextValidator
                onChange={changeColorName}
                label="Color name"
                name="colorName"
                value={colorName}
                validators={['required', 'uniqueName', 'uniqueColor', 'full']}
                errorMessages={[
                 'this field is required',
                 'Color Name must be unique',
                 "Color can't be repeated",
                 "The Palette is full"
                ]}
            />
        <Button
          type='submit' 
          variant='contained'
          disabled={isFull}
          color='primary'
          style={{backgroundColor : isFull ? "gray" : color}}>
          {isFull ? "Palette full" : "Save the color"}
        </Button>

        </ValidatorForm>
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
