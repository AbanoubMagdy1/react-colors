import React from 'react';
import {SortableContainer} from 'react-sortable-hoc'
import DraggableColorBox from './DraggableColorBox'

const DraggableColorList = SortableContainer((props) => {
    const {colors, removeColor} = props
    return (
        <div style={{height : "100%"}}>
            {colors.map((color, i) => <DraggableColorBox
                                    key={color.name}
                                    color={color.color} 
                                    name={color.name}
                                    index={i}
                                    remove={removeColor}/>)}
        </div>
    )
})

export default DraggableColorList