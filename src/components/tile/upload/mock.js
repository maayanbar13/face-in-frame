import React from 'react';
import mock from '../../../assets/photos/X2.jpg'
import {UploadLayout} from "../layout/uploadLayout";

export const UploadPhoto = ({setPhoto}) => {
    const onUpload = () => {
        setPhoto(mock);
    };
    return (
        <UploadLayout onUpload={onUpload}/>
    );
};
