'use client';
import React, { useState, useEffect } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const toggleVisibility = () => {
            const scrolled = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / height) * 100;

            setScrollProgress(progress);
            if (scrolled > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) return null;

    return (
        <Tooltip title="Back to Top" placement="left">
            <Box
                onClick={scrollToTop}
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    zIndex: 1000,
                    cursor: 'pointer',
                    width: 50,
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'scale(1.1) translateY(-5px)' }
                }}
            >
                {/* Progress Ring */}
                <Box sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: `conic-gradient(#ff7a00 ${scrollProgress}%, transparent ${scrollProgress}%)`,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 3,
                        background: '#1a1a1a',
                        borderRadius: '50%',
                        zIndex: 0
                    }
                }} />

                <ArrowUpwardIcon sx={{
                    color: '#ff7a00',
                    zIndex: 1,
                    fontSize: '1.2rem',
                    animation: 'bounce 2s infinite'
                }} />

                <style jsx global>{`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-5px);}
            60% {transform: translateY(-3px);}
          }
        `}</style>
            </Box>
        </Tooltip>
    );
}
