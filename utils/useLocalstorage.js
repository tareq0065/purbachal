import { useCallback, useEffect, useState } from 'react';

function useSsrLocalStorage(key, initialValue = '') {
    const [value, setValue] = useState(
        () => JSON.parse(window.localStorage.getItem(key)) || initialValue
    );

    const setItem = (newValue) => {
        setValue(newValue);
        window.localStorage.setItem(key, newValue);
    };

    useEffect(() => {
        const newValue = JSON.parse(window.localStorage.getItem(key));
        if (value !== newValue) {
            setValue(newValue || initialValue);
        }
    }, []);

    const handleStorage = useCallback(
        (event) => {
            if (event.key === key && event.newValue !== value) {
                setValue(event.newValue || initialValue);
            }
        },
        [value]
    );

    useEffect(() => {
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [handleStorage]);

    return [value, setItem];
}

const useLocalStorage = (key, initial) => {
    return typeof window === 'undefined'
        ? [initial, (value) => undefined]
        : useSsrLocalStorage(key, initial)
}

export {useLocalStorage}
