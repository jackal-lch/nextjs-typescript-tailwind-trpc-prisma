import { useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      // get from local storage by key
      const item = window.localStorage.getItem(key);
      // parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // if error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // return a wrapped version of useState's setter function that...
  // ... persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // save state
      setStoredValue(valueToStore);
      // save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // a more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

/* 
// Usage
function App() {
  // Similar to useState but first arg is key to the value in local storage.
  const [name, setName] = useLocalStorage<string>("name", "Bob");
  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
*/
