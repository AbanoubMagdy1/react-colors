import React from 'react';
import chroma from 'chroma-js'
import {SortableElement} from "react-sortable-hoc"
import {withStyles} from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


const styles = {
    root : {
        width : "20%",
        display : "inline-block",
        height : "25%",
        padding : "3px 3px",
        marginBottom : "-2px",
        position : "relative",
        "& div" : {
            height : "100%",
            padding : 0,
            display : "flex",
            justifyContent : "space-between",
            alignItems : "flex-end",
            textTransform : "uppercase",
            "& p" : {
                padding : 0,
                margin : "8px 8px",
                fontSize : "12px"
            },
            "& button" : {
                color : "rgba(0, 0, 0, 0.5)",
                
                transition : "0.3s all",
                "&:hover" : {
                    color : "white",
                    transform : "scale(1.5)"
                }
            }
        }
    },
    "@media (max-width : 1260px)" : {
        root : {
            width : "50%",
            height : "15%"
        }
    },
    "@media (max-width : 960px)" : {
        root : {
            width : "100vw",
            height : "8%"
        }
    }
}
const DraggableColorBox = SortableElement((props) => {
    const {classes} = props;
    const color = chroma(props.color).luminance() > 0.3 ? "black" : "white";
    const remove = () => {
        props.remove(props.name)
    }
    return (
        <div className={classes.root} style={{backgroundColor : props.color}}>
            <div>
                <p style={{color}}>{props.name}</p>
                <IconButton onClick={remove}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    )
})

export default withStyles(styles)(DraggableColorBox)