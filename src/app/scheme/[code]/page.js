'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Typography, Box, Tabs, Tab, Button, ButtonGroup, Container, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from '@mui/material';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import usePortfolio from '@/hooks/usePortfolio';
import SIPCalculator from '@/app/components/SIPCalculator';
import SWPCalculator from '@/app/components/SWPCalculator';
import StepUpSIPCalculator from '@/app/components/StepUpSIPCalculator';
import StepUpSWPCalculator from '@/app/components/StepUpSWPCalculator';
import LumpSumCalculator from '@/app/components/LumpSumCalculator';
import RollingReturnChart from '@/app/components/RollingReturnChart';

import { getEnhancedFundDetails } from '@/app/utils/fundDetails';
import { Grid } from '@mui/material';

export default function SchemeDetailPage() {
  const { code } = useParams();
  const [scheme, setScheme] = useState(null);
  const [calculatorTab, setCalculatorTab] = useState(0);
  const { addTransaction } = usePortfolio();
  const [buyModal, setBuyModal] = useState(false);
  const [investAmount, setInvestAmount] = useState('5000');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const periods = ['1D', '1M', '3M', '1Y', '5Y'];

  useEffect(() => {
    if (!code) return;
    async function fetchScheme() {
      try {
        setLoading(true);
        setError(null);
        // Using our internal proxy route instead of calling mfapi directly
        const res = await fetch(`/api/mf/scheme/${code}`);
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || 'Details for this scheme are currently unavailable.');
        }
        const data = await res.json();
        if (!data || !data.meta) throw new Error('Invalid fund data received.');
        setScheme(data);
      } catch (err) {
        console.error('Error fetching scheme:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchScheme();
  }, [code]);

  useEffect(() => {
    if (!scheme) return;
    const navs = scheme.data.map(item => ({ date: item.date, nav: parseFloat(item.nav) })).reverse();
    let dataForPeriod = [];
    switch (selectedPeriod) {
      case '1D': dataForPeriod = navs.slice(-2); break;
      case '1M': dataForPeriod = navs.slice(-22); break;
      case '3M': dataForPeriod = navs.slice(-66); break;
      case '1Y': dataForPeriod = navs.slice(-252); break;
      case '5Y': dataForPeriod = navs.slice(-252 * 5); break;
      default: dataForPeriod = navs.slice(-252);
    }
    setChartData(dataForPeriod);
    if (scheme && scheme.meta) {
      document.title = scheme.meta.scheme_name;
    }
  }, [scheme, selectedPeriod]);

  if (loading) return (
    <Box sx={{ background: '#0b0b0b', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h6" sx={{ color: '#ffb347' }}>Loading Scheme Details...</Typography>
    </Box>
  );

  if (error) return (
    <Box sx={{ background: '#0b0b0b', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3 }}>
      <Typography variant="h5" color="error" sx={{ mb: 2 }}>⚠️ Data Unavailable</Typography>
      <Typography variant="body1" sx={{ color: '#ccc', mb: 4, textAlign: 'center' }}>{error}</Typography>
      <Button variant="contained" onClick={() => window.location.reload()} sx={{ background: '#ff7a00', color: '#000', fontWeight: 'bold' }}>
        Try Again
      </Button>
    </Box>
  );

  if (!scheme) return null;

  const details = getEnhancedFundDetails(code);

  return (
    <Box sx={{ background: '#0b0b0b', color: '#fff', minHeight: '100vh' }}>
      <Header />

      <Container maxWidth="xl" sx={{ pt: { xs: 15, md: 18 }, pb: 6 }}>
        {/* Scheme Info */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" sx={{
            mb: 1,
            color: '#ff7a00',
            fontWeight: 900,
            fontSize: { xs: '2rem', md: '3.5rem' },
            letterSpacing: '-0.02em',
          }}>
            {scheme.meta.scheme_name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 4 }}>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
              {scheme.meta.fund_house} • {scheme.meta.scheme_type}
            </Typography>
            <Button
              variant="contained"
              onClick={() => setBuyModal(true)}
              sx={{
                background: 'linear-gradient(90deg, #4caf50, #81c784)',
                color: '#000',
                fontWeight: 900,
                borderRadius: '12px',
                px: 3,
                '&:hover': { transform: 'scale(1.05)', background: '#66bb6a' }
              }}
            >
              Invest Now
            </Button>
          </Box>

          <Box sx={{ maxWidth: 880, mx: 'auto', p: 4, background: 'rgba(255,255,255,0.03)', borderRadius: 5, border: '1px solid rgba(255,255,255,0.08)' }}>
            <Grid container spacing={4}>
              {[
                { label: 'Current NAV', value: `₹${scheme.data?.[0]?.nav || details.nav}`, color: '#fff' },
                { label: '1Y Return', value: `${parseFloat(details.oneYearReturn) >= 0 ? '+' : ''}${details.oneYearReturn}%`, color: '#4caf50' },
                { label: 'Expense Ratio', value: `${details.expenseRatio}%`, color: '#fff' },
                { label: 'Risk Level', value: details.riskRating, color: '#ffb347' },
              ].map((item, idx) => (
                <Grid item xs={6} md={3} key={idx} sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 800, fontSize: '0.7rem', display: 'block', mb: 1 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: item.color }}>
                    {item.value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* Fund Analysis & Riskometer Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={7}>
            <Box sx={{ p: 4, height: '100%', background: 'rgba(255,255,255,0.02)', borderRadius: 5, border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 900, color: '#ff7a00' }}>Investment Profile</Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, mb: 4 }}>
                This scheme is designed for long-term investors seeking capital appreciation. It follows a multi-cap strategy, maintaining a balanced exposure across Large-Cap stability and Mid-Cap growth opportunities.
              </Typography>

              <Grid container spacing={3}>
                {[
                  { label: 'Fund Manager', value: details.manager },
                  { label: 'Exit Load', value: details.exitLoad },
                  { label: 'AUM (Approx)', value: `₹${details.aum} Cr` },
                  { label: 'Inception', value: details.inception }
                ].map((info, i) => (
                  <Grid item xs={6} key={i}>
                    <Typography variant="caption" sx={{ color: '#ff7a00', fontWeight: 900, display: 'block', mb: 0.5 }}>{info.label}</Typography>
                    <Typography variant="body1" sx={{ color: '#fff', fontWeight: 700 }}>{info.value}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{ p: 4, height: '100%', background: 'rgba(255,255,255,0.02)', borderRadius: 5, border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
              <Typography variant="h5" sx={{ mb: 4, fontWeight: 900, color: '#ff7a00' }}>Risk Meter</Typography>

              <Box sx={{ position: 'relative', width: 240, height: 120, mx: 'auto', mb: 4 }}>
                <Box sx={{
                  width: '100%',
                  height: '100%',
                  borderTopLeftRadius: 120,
                  borderTopRightRadius: 120,
                  background: 'linear-gradient(90deg, #4caf50 0%, #ffeb3b 50%, #f44336 100%)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: 160,
                    height: 80,
                    bgcolor: '#0b0b0b',
                    borderTopLeftRadius: 80,
                    borderTopRightRadius: 80,
                    marginLeft: '-80px'
                  }} />
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: 4,
                    height: 100,
                    bgcolor: '#fff',
                    transformOrigin: 'bottom center',
                    transform: `rotate(${details.riskScore * 30 - 90}deg)`,
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                    transition: '2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    zIndex: 2
                  }} />
                </Box>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 900, color: '#fff', mb: 1 }}>{details.riskRating} Risk</Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', px: 4 }}>
                Principal will be at {details.riskRating.toLowerCase()} risk.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* 1️⃣ Chart NAV Values (Latest and Historical) */}
        <Box sx={{ mb: 6, p: 3, background: '#1a1a1a', borderRadius: 3, border: '1px solid #2a2a2a' }}>
          <Typography variant="h5" sx={{ mb: 3, color: '#ffb347', textAlign: 'center', fontWeight: 600 }}>
            Chart NAV Values (Latest and Historical)
          </Typography>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <ButtonGroup variant="outlined" sx={{ '& .MuiButton-root': { borderColor: '#ffb347', color: '#ffb347', '&:hover': { borderColor: '#ffaa47', background: 'rgba(255, 179, 71, 0.1)' } } }}>
              {periods.map(p => (
                <Button
                  key={p}
                  onClick={() => setSelectedPeriod(p)}
                  variant={selectedPeriod === p ? 'contained' : 'outlined'}
                  sx={selectedPeriod === p ? {
                    backgroundColor: '#ffb347 !important',
                    color: '#000 !important',
                    fontWeight: 'bold'
                  } : {}}
                >
                  {p}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          <RollingReturnChart
            data={chartData}
            title={`${selectedPeriod} NAV History`}
          />
          {scheme.isPartial && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(255, 179, 71, 0.1)', borderRadius: 2, border: '1px dashed #ffb347' }}>
              <Typography variant="body2" sx={{ color: '#ffb347', textAlign: 'center' }}>
                📊 Historical chart data is temporarily unavailable due to external API downtime.
                Showing latest official NAV from AMFI.
              </Typography>
            </Box>
          )}
        </Box>

        {/* 2️⃣ Mutual Fund Calculators */}
        <Box sx={{ mb: 6, p: 3, background: '#1a1a1a', borderRadius: 3, border: '1px solid #2a2a2a' }}>
          <Typography variant="h5" sx={{ mb: 3, color: '#ffb347', textAlign: 'center', fontWeight: 600 }}>
            Mutual Fund Calculators
          </Typography>

          <Tabs
            value={calculatorTab}
            onChange={(e, newValue) => setCalculatorTab(newValue)}
            centered
            sx={{
              '& .MuiTab-root': { color: '#888', textTransform: 'none', fontSize: '1rem' },
              '& .Mui-selected': { color: '#ffb347 !important' },
              '& .MuiTabs-indicator': { backgroundColor: '#ffb347' },
              mb: 3
            }}
          >
            <Tab label="SIP Calculator" />
            <Tab label="SWP Calculator" />
            <Tab label="Step-Up SIP" />
            <Tab label="Step-Up SWP" />
            <Tab label="Lump Sum" />
          </Tabs>

          <Box sx={{ mt: 3, color: '#fff' }}>
            {calculatorTab === 0 && <SIPCalculator navs={scheme.data} />}
            {calculatorTab === 1 && <SWPCalculator navs={scheme.data} />}
            {calculatorTab === 2 && <StepUpSIPCalculator navs={scheme.data} />}
            {calculatorTab === 3 && <StepUpSWPCalculator navs={scheme.data} />}
            {calculatorTab === 4 && <LumpSumCalculator navs={scheme.data} />}
          </Box>
        </Box>

        {/* 3️⃣ Similar Funds Recommendation */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" sx={{ mb: 6, fontWeight: 900, textAlign: 'center' }}>
            Similar Funds <span style={{ color: '#ff7a00' }}>You May Like</span>
          </Typography>

          <Grid container spacing={3}>
            {[
              { code: '100035', name: 'Aditya Birla Sun Life Digital India Fund', return: '+62.1%', risk: 'Very High' },
              { code: '100036', name: 'Aditya Birla Sun Life ELSS Tax Saver', return: '+48.5%', risk: 'High' },
              { code: '100037', name: 'Aditya Birla Sun Life Focused Equity', return: '+55.2%', risk: 'Very High' }
            ].map((f, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card sx={{
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: '0.3s',
                  '&:hover': { transform: 'scale(1.02)', borderColor: '#ff7a00' }
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#fff', mb: 2, height: '3em', overflow: 'hidden' }}>{f.name}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block' }}>1Y RETURN</Typography>
                        <Typography variant="body1" sx={{ color: '#4caf50', fontWeight: 900 }}>{f.return}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block' }}>RISK</Typography>
                        <Typography variant="body1" sx={{ color: '#ffb347', fontWeight: 900 }}>{f.risk}</Typography>
                      </Box>
                    </Box>
                    <Link href={`/scheme/${f.code}`} style={{ textDecoration: 'none' }}>
                      <Button fullWidth variant="outlined" sx={{ color: '#ff7a00', borderColor: 'rgba(255,122,0,0.3)', fontWeight: 800 }}>Analyze Now</Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Buy Mutual Fund Modal */}
      <Dialog
        open={buyModal}
        onClose={() => setBuyModal(false)}
        PaperProps={{
          sx: {
            background: 'rgba(30, 30, 30, 0.95)',
            backdropFilter: 'blur(15px)',
            color: '#fff',
            borderRadius: 5,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            minWidth: { xs: '90%', sm: 400 }
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 900, fontSize: '1.5rem', color: '#4caf50', pb: 1 }}>Invest in Fund</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 3, opacity: 0.7, fontSize: '0.9rem' }}>
            Confirm your investment in <strong>{scheme?.meta?.scheme_name}</strong> at the latest NAV of <strong>₹{scheme?.data[0]?.nav}</strong>.
          </Typography>
          <TextField
            fullWidth
            label="Investment Amount (₹)"
            type="number"
            value={investAmount}
            onChange={(e) => setInvestAmount(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.2rem',
                borderRadius: 3,
                bgcolor: 'rgba(0,0,0,0.2)',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                '&:hover fieldset': { borderColor: '#4caf50' },
              },
              '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setBuyModal(false)} sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              addTransaction(
                { schemeCode: code, schemeName: scheme.meta.scheme_name },
                parseFloat(investAmount),
                parseFloat(scheme.data[0].nav)
              );
              setSnackbar({ open: true, message: 'Investment Successful! Check your Portfolio.', severity: 'success' });
              setBuyModal(false);
            }}
            sx={{
              bgcolor: '#4caf50',
              color: '#000',
              fontWeight: 900,
              borderRadius: 3,
              px: 4,
              '&:hover': { bgcolor: '#81c784' }
            }}
          >
            Confirm Investment
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%', fontWeight: 700, borderRadius: 3 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </Box >
  );
}
