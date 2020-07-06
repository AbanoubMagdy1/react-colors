import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


function FormDialog(props){
    const [paletteName, setPaletteName] = useState("");
    const [openE, setOpenE] = useState(false)
    const {open, setOpen, addPalette, classes, palettes} = props;
    useEffect(() => {
        ValidatorForm.addValidationRule('uniquePalette', (value) => {
            console.log(palettes, value)
            return palettes.every(palette => 
              palette.paletteName.toLowerCase().replace(/ /g, "-")
               !==
              value.toLowerCase().replace(/ /g, "-")
          )});
          // eslint-disable-next-line
    },[])
    const handleClose = () => {
        setOpen(false);
    };

    const changePaletteName = (e) => {
        setPaletteName(e.target.value)
    }
    const openEmoji = () => {
        setOpenE(true);
        setOpen(false);
    }
    const closeEmoji = () => {
        setOpenE(false);
    }
    const createPalette = (emoji) => {
        addPalette(paletteName, emoji.native);
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create palette</DialogTitle>
                <ValidatorForm
                        className={classes.form}
                        onSubmit={openEmoji}
                >
                <DialogContent>
                    <DialogContentText>
                        Please choose a unique name to your beautiful palette you have just chosen its colors
                    </DialogContentText>
                 
                
                    <TextValidator
                        onChange={changePaletteName}
                        label="Palette Name"
                        name="paletteName"
                        fullWidth
                        margin="normal"
                        value={paletteName}
                        validators={['required', 'uniquePalette']}
                        errorMessages={[
                        'this field is required',
                        'Palette Name must be unique'
                        ]}
                    />
                
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                            type="submit"
                            variant='contained'
                            color='primary'
                    >
                            Save Palette
                    </Button>
                </DialogActions>
                </DialogContent>   
            </ValidatorForm>
               
            </Dialog> 
            <Dialog open={openE} onClose={closeEmoji}>
                <Picker onSelect={createPalette}/>
            </Dialog>
        </div>  
    )
}

export default FormDialog