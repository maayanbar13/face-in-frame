import React from 'react';
import frame from '../../../assets/top.png'

export const TileLayout = ({image, ...rest}) => {
    return (
        <div className="tile-layout">

            <div className="content-above-frame">
                {image}
                <div className="centralized">
                    {rest.children}
                </div>
            </div>
            <div className="frame-holder">
                    <img alt="" src={frame}/>
            </div>


        </div>
    );
};
