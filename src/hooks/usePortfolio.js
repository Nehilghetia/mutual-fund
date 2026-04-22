'use client';
import { useState, useEffect } from 'react';

export default function usePortfolio() {
    const [portfolio, setPortfolio] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('portfolio');
        if (saved) {
            try {
                setPortfolio(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load portfolio", e);
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('portfolio', JSON.stringify(portfolio));
        }
    }, [portfolio, isLoaded]);

    const addTransaction = (fund, amount, nav, date) => {
        const units = amount / nav;
        const newTransaction = {
            id: Date.now(),
            schemeCode: fund.schemeCode,
            schemeName: fund.schemeName,
            units,
            buyPrice: nav,
            invested: amount,
            date: date || new Date().toISOString().split('T')[0]
        };
        setPortfolio(prev => [...prev, newTransaction]);
    };

    const sellTransaction = (id) => {
        setPortfolio(prev => prev.filter(t => t.id !== id));
    };

    return { portfolio, addTransaction, sellTransaction };
}
