import React, {useState, useRef} from 'react';
import {TileLayout} from "./layout/tileLayout";
import {UploadPhoto} from "./upload/upload";
import './tile.css';
import {getStyles} from "./locator/locator";
import {LoadingSpinner} from "./layout/loadingSpinner";
import {ResetButton} from "./layout/resetButton";
import {OnTileContentLayout} from "./layout/onTileContentLayout";


export const Tile = (props) => {
    const imageSizeInTile = 138;
    const imgEl = useRef(null);
    const [imgSrc, setImgSrc] = useState('');
    const [imgStyle, setImgStyle] = useState({display: 'none'});
    const [isLoading, setIsLoading] = useState('');
    const setPhoto = (photo) => {
        setImgSrc(photo);
        setIsLoading(true);
        if (photo) {
            getStyles(imgEl.current, imageSizeInTile).then((style) => {
                setImgStyle(style);
                setIsLoading(false);
            });
        } else {
            setImgStyle({display: 'none'})
        }
    };
    return (
        <div className="tile-holder">
            <TileLayout>
                {<img alt="" ref={imgEl} className="image" style={imgStyle} src={imgSrc}/>}
                <OnTileContentLayout>
                    {(!imgSrc) ? (<UploadPhoto setPhoto={setPhoto}/>) : (isLoading && (<LoadingSpinner/>))}
                </OnTileContentLayout>
            </TileLayout>
            <ResetButton isActive={!Boolean(imgSrc)} onReset={() => setPhoto('')}/>
        </div>
    )
};
