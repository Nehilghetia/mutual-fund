'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Button, Autocomplete, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getEnhancedFundDetails } from '../utils/fundDetails';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ComparePage() {
    const [allFunds, setAllFunds] = useState([]);
    const [selectedFunds, setSelectedFunds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFunds() {
            try {
                const res = await fetch('/api/mf/active');
                const data = await res.json();
                setAllFunds(data.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchFunds();
    }, []);

    const addToCompare = (fund) => {
        if (selectedFunds.length >= 3) {
            alert("You can compare up to 3 funds at a time.");
            return;
        }
        if (fund && !selectedFunds.find(f => f.schemeCode === fund.schemeCode)) {
            setSelectedFunds([...selectedFunds, fund]);
        }
    };

    const removeFund = (code) => {
        setSelectedFunds(selectedFunds.filter(f => f.schemeCode !== code));
    };

    const comparisonRows = [
        { label: 'Returns (1Y)', key: 'oneYearReturn', suffix: '%' },
        { label: 'Returns (3Y)', key: 'threeYearReturn', suffix: '%' },
        { label: 'Returns (5Y)', key: 'fiveYearReturn', suffix: '%' },
        { label: 'Risk Rating', key: 'riskRating' },
        { label: 'AUM', key: 'aum' },
        { label: 'Expense Ratio', key: 'expenseRatio', suffix: '%' },
        { label: 'Exit Load', key: 'exitLoad' },
        { label: 'Fund Manager', key: 'manager' },
        { label: 'Inception Date', key: 'inception' }
    ];

    return (
        <Box sx={{ minHeight: '100vh', position: 'relative', pt: 12 }}>
            <Header />

            <Container maxWidth="xl" sx={{ py: 6 }}>
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontWeight: 900, color: '#fff' }}>
                        <CompareArrowsIcon sx={{ fontSize: '3.5rem', color: '#ff7a00', verticalAlign: 'middle', mr: 2 }} />
                        Fund <span style={{ color: '#ff7a00' }}>Comparison</span>
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)', mt: 1 }}>
                        Select up to 3 funds to see a side-by-side technical comparison.
                    </Typography>
                </Box>

                {/* Search & Select */}
                <Box sx={{ maxWidth: 800, mx: 'auto', mb: 8 }}>
                    <Autocomplete
                        options={allFunds}
                        getOptionLabel={(option) => option.schemeName}
                        value={null}
                        onChange={(e, value) => {
                            if (value) {
                                addToCompare(value);
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search and Add Funds to Compare"
                                placeholder={selectedFunds.length === 0 ? "Search for 1st fund..." : `Search for fund #${selectedFunds.length + 1}...`}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        borderRadius: 4,
                                        bgcolor: 'rgba(255,255,255,0.05)',
                                        border: '2px solid rgba(255,255,255,0.1)',
                                        '& fieldset': { border: 'none' },
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)', fontWeight: 700 }
                                }}
                            />
                        )}
                    />
                </Box>

                {selectedFunds.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 10, opacity: 0.3 }}>
                        <Typography variant="h4" sx={{ color: '#555', fontWeight: 800 }}>Search for funds to begin comparison</Typography>
                    </Box>
                ) : (
                    <TableContainer component={Paper} sx={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)', borderRadius: 5, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                        <Table>
                            <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.4)' }}>
                                <TableRow>
                                    <TableCell sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 800, border: 0, width: 250 }}>PARAMETERS</TableCell>
                                    {selectedFunds.map(fund => (
                                        <TableCell key={fund.schemeCode} sx={{ border: 0, textAlign: 'center' }}>
                                            <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 900, mb: 1, minHeight: 60 }}>{fund.schemeName}</Typography>
                                            <Button size="small" color="error" onClick={() => removeFund(fund.schemeCode)} sx={{ fontWeight: 700 }}>Remove</Button>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {comparisonRows.map((row, i) => (
                                    <TableRow key={row.label} sx={{ bgcolor: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                                        <TableCell sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, border: 0, borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                                            {row.label}
                                        </TableCell>
                                        {selectedFunds.map(fund => {
                                            const details = getEnhancedFundDetails(fund.schemeCode);
                                            const value = details[row.key];
                                            return (
                                                <TableCell key={fund.schemeCode} sx={{ border: 0, textAlign: 'center', color: '#fff', fontWeight: 800, fontSize: '1.1rem' }}>
                                                    {row.key.includes('Return') && parseFloat(value) > 30 ? (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4caf50' }}>
                                                            {value}{row.suffix} <CheckCircleIcon sx={{ ml: 0.5, fontSize: 16 }} />
                                                        </Box>
                                                    ) : (
                                                        <>{value}{row.suffix}</>
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>
            <Footer />
        </Box>
    );
}
