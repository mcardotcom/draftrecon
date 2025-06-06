import { useState } from 'react';

export const usePlayerCard = (initialIsShortlisted: boolean = false) => {
  const [isShortlisted, setIsShortlisted] = useState(initialIsShortlisted);

  const toggleShortlist = () => {
    setIsShortlisted(!isShortlisted);
  };

  return { isShortlisted, toggleShortlist };
}; 