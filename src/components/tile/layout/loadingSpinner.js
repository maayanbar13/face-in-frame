import React from 'react';
import './loadingSpinner.css';

export const LoadingSpinner = (props) => {
    return (
        <div className="spinner lds-css ng-scope">
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    );
};
