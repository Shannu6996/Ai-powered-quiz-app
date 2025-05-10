import { useContext, useEffect } from 'react';
import {
  UNSAFE_NavigationContext as NavigationContext,
  Navigator
} from 'react-router-dom';

export function usePrompt(message: string, when: boolean) {
  const navigator = useContext(NavigationContext).navigator as Navigator;

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;

    navigator.push = (...args: Parameters<Navigator['push']>) => {
      const confirm = window.confirm(message);
      if (confirm) {
        push.apply(navigator, args);
      }
    };

    return () => {
      navigator.push = push;
    };
  }, [message, navigator, when]);
}
