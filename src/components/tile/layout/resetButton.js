import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from "@material-ui/core/Fab";


export const ResetButton = ({isActive, onReset}) => {
    return (
        <Fab disabled={isActive} aria-label="delete" onClick={onReset} size="small" style={{margin: 'auto'}}>
            <DeleteIcon/>
        </Fab>
    );
};
