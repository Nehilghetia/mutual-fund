'use client';
import { useState, useEffect } from 'react';

export default function useWatchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse watchlist", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever updated (ONLY after first load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
  }, [watchlist, isLoaded]);

  // Add or remove fund
  const toggleWatchlist = (fund) => {
    setWatchlist((prev) => {
      const exists = prev.find((f) => f.schemeCode === fund.schemeCode);
      if (exists) {
        return prev.filter((f) => f.schemeCode !== fund.schemeCode);
      } else {
        return [...prev, fund];
      }
    });
  };

  const isInWatchlist = (schemeCode) =>
    watchlist.some((f) => f.schemeCode === schemeCode);

  return { watchlist, toggleWatchlist, isInWatchlist };
}
