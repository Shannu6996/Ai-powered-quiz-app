// src/contexts/SettingsContext.tsx
import {
  createContext,
  // Remove useState from this line
  useContext,
  useEffect,
  ReactNode
} from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage'; // Adjust path if needed

interface SettingsContextProps {
  theme: string; // 'light', 'dark', or potentially 'system' if you implement that logic
  setTheme: (theme: string) => void;
  isVoiceInputEnabled: boolean;
  toggleVoiceInput: () => void;
  isVoiceOutputEnabled: boolean;
  toggleVoiceOutput: () => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // State is managed by useLocalStorage, not direct useState calls here
  const [theme, setThemeState] = useLocalStorage<string>('theme', 'light'); // Default to 'light' or 'system'
  const [isVoiceInputEnabled, setIsVoiceInputEnabled] = useLocalStorage<boolean>('voiceInputEnabled', false);
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useLocalStorage<boolean>('voiceOutputEnabled', false);

  // Effect to apply the theme class to the root element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    // If you want system preference detection, add it here:
    // if (theme === 'system') {
    //   const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    //   root.classList.add(systemTheme);
    // } else {
       root.classList.add(theme);
    // }

    // Optional: Set color scheme for browser UI consistency
    document.documentElement.style.setProperty('color-scheme', theme);

  }, [theme]);

  // Wrapper function for setting theme (matches context prop name)
  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
  };

  // Toggle functions
  const toggleVoiceInput = () => {
    setIsVoiceInputEnabled(prev => !prev);
  };

   const toggleVoiceOutput = () => {
    setIsVoiceOutputEnabled(prev => !prev);
  };

  // Provide the state and functions through the context
  return (
    <SettingsContext.Provider value={{
        theme,
        setTheme,
        isVoiceInputEnabled,
        toggleVoiceInput,
        isVoiceOutputEnabled,
        toggleVoiceOutput
     }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to consume the settings context
export const useSettings = (): SettingsContextProps => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};