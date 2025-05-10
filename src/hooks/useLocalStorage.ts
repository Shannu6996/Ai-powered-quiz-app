import { useState, useEffect, Dispatch, SetStateAction } from 'react';

// Helper function to safely parse JSON
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    console.error('Parsing error on', { value });
    return undefined;
  }
}

// Type for the return value of the hook
type SetValue<T> = Dispatch<SetStateAction<T>>;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Prevent build error "window is undefined" but keep working
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue: SetValue<T> = (value) => {
     // Prevent build error "window is undefined" but keeps working
     if (typeof window === 'undefined') {
       console.warn(
         `Tried setting localStorage key “${key}” even though environment is not a client`,
       );
     }

    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error setting localStorage key “${key}”:`, error);
    }
  };

   // Optional: Listen for changes in other tabs/windows (can be commented out if not needed)
   useEffect(() => {
     const handleStorageChange = (event: StorageEvent) => {
       if (event.key === key && event.storageArea === window.localStorage) {
         try {
           setStoredValue(event.newValue ? (parseJSON(event.newValue) as T) : initialValue);
         } catch (error) {
             console.error(`Error parsing storage change for key “${key}”:`, error);
         }
       }
     };

     window.addEventListener('storage', handleStorageChange);

     return () => {
       window.removeEventListener('storage', handleStorageChange);
     };
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [key, initialValue]); // Dependencies


  return [storedValue, setValue];
}

export default useLocalStorage;

// Re-export the type for convenience if needed elsewhere
export { useLocalStorage };