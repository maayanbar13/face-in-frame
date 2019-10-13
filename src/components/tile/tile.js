import React, {useState, useRef, useEffect} from 'react';
import {TileLayout} from "./layout/tileLayout";
import {UploadPhoto} from "./upload/upload";
import './tile.css';
import {getStyles} from "./locator/locator";
import {LoadingSpinner} from "./layout/loadingSpinner";
import {ResetButton} from "./layout/resetButton";


export const Tile = (props) => {
    const imgEl = useRef(null);
    const [img, setImg] = useState({
        src: '',
        style: {display: 'none'},
        isLoading: false
    });
    useEffect(() => {
            if (img.src) {
                getStyles(imgEl.current, 138).then((style) => {
                    setImg((prev) => {
                        return {...prev, ...{style: style, isLoading: false}}
                    });
                });
            } else {
                setImg((prev) => {
                    return {...prev, ...{style: {display: 'none'}}}
                });
            }
        }
        , [img.src]);
    const setPhoto = (photo) => {
        setImg((prev) => {
            return {...prev, ...{src: photo, isLoading: true}}
        });
    };
    return (
        <div className="tile-holder">
            <TileLayout image={<img alt="upload" ref={imgEl} className="image" style={img.style} src={img.src}/>}>
                {(!img.src) ? (<UploadPhoto setPhoto={setPhoto}/>) : (<div>{img.isLoading && <LoadingSpinner/>}</div>)}
            </TileLayout>
            <ResetButton isActive={!Boolean(img.src)} onReset={() => setPhoto('')}/>
        </div>
    )
};
