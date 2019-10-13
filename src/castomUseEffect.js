import { useEffect, useRef } from 'react';

export const useEffectMountedOnce = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
};
