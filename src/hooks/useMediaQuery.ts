import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook that tracks the state of a CSS media query.
 *
 * @param {string} query - The media query string to watch (e.g., '(max-width: 768px)').
 * @returns {boolean} - True if the media query matches, false otherwise.
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  const handleChange = useCallback(() => {
     if (typeof window !== 'undefined') {
       setMatches(window.matchMedia(query).matches);
     }
  }, [query]);


  useEffect(() => {
    if (typeof window === 'undefined') {
        return;
    }

    const mediaQueryList = window.matchMedia(query);

    handleChange();

    // Modern browsers support addEventListener/removeEventListener
    try {
      mediaQueryList.addEventListener('change', handleChange);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e1) { // <-- Added disable comment before this line
      // Fallback for older browsers
      try {
          mediaQueryList.addListener(handleChange);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_e2) { // <-- Added disable comment before this line
          // console.error("useMediaQuery: Could not add listener for query changes.", _e2);
      }
    }


    // Cleanup function
    return () => {
       try {
         mediaQueryList.removeEventListener('change', handleChange);
       // eslint-disable-next-line @typescript-eslint/no-unused-vars
       } catch (_e1) { // <-- Added disable comment before this line
          try {
             mediaQueryList.removeListener(handleChange);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (_e2) { // <-- Added disable comment before this line
             // console.error("useMediaQuery: Could not remove listener.", _e2);
          }
       }
    };
  }, [query, handleChange]);

  return matches;
}

export { useMediaQuery };
export default useMediaQuery;