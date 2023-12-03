import { useState } from 'react';

export const useLocalStorage = (
  key: string,
  initialValue: string
): [value: string, setFunction: (value: string) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? item : initialValue;
  });

  const setValue = (value: string): void => {
    setStoredValue(value);
    window.localStorage.setItem(key, value);
  };

  return [storedValue, setValue];
};
