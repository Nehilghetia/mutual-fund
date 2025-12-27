'use client';
import { useState, useEffect } from 'react';

export default function useWatchlist() {
  const [watchlist, setWatchlist] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

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
