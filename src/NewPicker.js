import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import {ChromePicker} from 'react-color'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {withStyles} from "@material-ui/styles"

const styles = {
    picker : {
        margin : "auto",
        width : "300px !important"
    },
    btn : {
        width : "300px",
        height : "80px",
        marginTop : "1rem",
        fontSize : "20px"
    },
    inp : {
        width : "300px",
        height : "60px",
        padding : 0,
        fontSize : "18px",
        marginTop : "1rem",
        "& div" : {
            backgroundColor : "rgba(0, 0, 0, 0.1)",
            
        }
    }
}

function NewPicker(props){
    const [color, setColor] = useState("#dd88dd");
    const [colorName, setColorName] = useState("");

    const {isFull, colors, addColor, classes} = props


    useEffect(() => {
        ValidatorForm.addValidationRule('uniqueName', (value) => {
            return colors.every(({name}) => name.toLowerCase() !== value.toLowerCase())
        });
        ValidatorForm.addValidationRule('uniqueColor', () => {
            return colors.every(colory => colory.color !== color) || !colorName 
        });
          
        ValidatorForm.addValidationRule('full', () => {
            return colors.length < 20;
        });
        // eslint-disable-next-line
    },[colorName])
        
   

    const changeColor = (newColor) => {
        console.log(newColor, color)
        setColor(newColor.hex)
    }

    const changeColorName = (e) => {
        setColorName(e.target.value)
    }
    
    const handleSubmit = () => {
        //make our color
        const newColor = {color, name : colorName}
        //call addColor
        addColor(newColor);
        setColorName("");
    }  
    return (
        <div>
           <ChromePicker
            className={classes.picker}
            color={color} 
            onChange={changeColor}
            />
            <ValidatorForm
                onSubmit={handleSubmit}
            >
                <TextValidator
                    className={classes.inp}
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
                /><br/>
                <Button
                className={classes.btn}
                type='submit' 
                variant='contained'
                disabled={isFull}
                color='primary'
                style={{backgroundColor : isFull ? "gray" : color}}>
                {isFull ? "Palette full" : "Save the color"}
                </Button>

            </ValidatorForm> 
        </div>
    )
}

export default withStyles(styles)(NewPicker)