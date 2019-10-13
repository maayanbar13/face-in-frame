import React from 'react';
import frame from '../../../assets/top.png'

export const TileLayout = (props) => {
    return (
        <div className="tile-layout">

            <div className="content-above-frame">
                {props.children}
            </div>
            <div className="frame-holder">
                    <img alt="" src={frame}/>
            </div>


        </div>
    );
};
