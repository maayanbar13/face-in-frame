import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from "@material-ui/core/Fab";


export const ResetButton = ({isActive, onReset, ...rest}) => {
    return (
        <Fab disabled={isActive} aria-label="delete" onClick={onReset} size="small" style={{margin:'auto'}}>
            <DeleteIcon />
        </Fab>
    );
};
