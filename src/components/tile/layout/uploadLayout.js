import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import React, {useRef} from 'react';


export const UploadLayout = ({onUpload, ...rest}) => {
    const uploadEl = useRef(null);
    const chooseFile = () => {
        uploadEl.current.click();
    };
    return ([
            <Fab key="ui-button" color="primary" aria-label="add" onClick={chooseFile}>
                <AddIcon/>
            </Fab>,
            <input key="actual-button" type='file' ref={uploadEl} style={{display: 'none'}} onChange={onUpload}/>]
    );
};
