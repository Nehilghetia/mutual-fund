'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Container, CircularProgress, Card, CardContent } from '@mui/material';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import MarketTicker from './components/MarketTicker';
import { getEnhancedFundDetails } from './utils/fundDetails';
import usePortfolio from '@/hooks/usePortfolio';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function PopularFundsGrid() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPopular() {
      try {
        const res = await fetch('/api/mf/active');
        const data = await res.json();
        // Just take the first 3 as "popular"
        setFunds((data.data || []).slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPopular();
  }, []);

  const [navigating, setNavigating] = useState(null);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
      <CircularProgress color="warning" />
    </Box>
  );

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)'
      },
      gap: 4,
      width: '100%'
    }}>
      {funds.map((fund) => {
        const details = getEnhancedFundDetails(fund.schemeCode);
        const isAnalyzing = navigating === fund.schemeCode;

        return (
          <Card key={fund.schemeCode} sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(30, 30, 30, 0.6)',
            backdropFilter: 'blur(12px)',
            borderRadius: 6,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            transition: 'all 0.4s ease',
            '&:hover': {
              transform: 'translateY(-10px)',
              borderColor: '#ff7a00',
              boxShadow: '0 15px 40px rgba(255, 122, 0, 0.2)'
            }
          }}>
            <CardContent sx={{ p: 4, flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="caption" sx={{
                  background: 'rgba(255, 122, 0, 0.1)',
                  color: '#ff7a00',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  fontSize: '0.7rem',
                  letterSpacing: 1
                }}>
                  Trending
                </Typography>
              </Box>

              <Typography variant="h6" sx={{
                color: '#fff',
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.4,
                minHeight: '2.8em',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {fund.schemeName}
              </Typography>

              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', mb: 0.5, textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 700 }}>
                    1Y Return
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: '#4caf50', fontSize: '1.1rem' }}>
                    +{details.oneYearReturn}%
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', mb: 0.5, textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 700 }}>
                    Risk Level
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 800, color: '#ffb347', fontSize: '1rem' }}>
                    {details.riskRating}
                  </Typography>
                </Grid>
              </Grid>

              <Link href={`/scheme/${fund.schemeCode}`} style={{ textDecoration: 'none' }} onClick={() => setNavigating(fund.schemeCode)}>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={!!navigating}
                  sx={{
                    background: isAnalyzing ? '#444' : 'linear-gradient(90deg, #ff7a00, #ffb347)',
                    color: isAnalyzing ? '#fff' : '#000',
                    fontWeight: 900,
                    borderRadius: 3,
                    py: 1.5,
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #ffb347, #ff7a00)',
                      filter: 'brightness(1.1)'
                    }
                  }}>
                  {isAnalyzing ? <CircularProgress size={20} sx={{ color: '#ff7a00', mr: 1 }} /> : null}
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Fund'}
                </Button>
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}

export default function HomePage() {
  const { portfolio } = usePortfolio();

  const portfolioWealth = portfolio.reduce((acc, item) => {
    const details = getEnhancedFundDetails(item.schemeCode);
    const annualReturn = parseFloat(details.oneYearReturn);

    const buyDate = new Date(item.date);
    const today = new Date();
    const daysPassed = Math.max(1, Math.ceil(Math.abs(today - buyDate) / (1000 * 60 * 60 * 24)));

    const dailyGrowth = (annualReturn / 100) / 365;
    const currentGrowthFactor = 1 + (dailyGrowth * daysPassed);
    const itemValue = Number(item.invested) * currentGrowthFactor;

    acc.invested += Number(item.invested);
    acc.current += itemValue;
    return acc;
  }, { invested: 0, current: 0 });

  const totalInvested = portfolioWealth.invested;
  const currentValue = portfolioWealth.current;

  const features = [
    {
      icon: '📊',
      title: 'Comprehensive Fund Data',
      desc: 'Access performance, returns, and fund insights updated in real-time.',
    },
    {
      icon: '💡',
      title: 'Advanced SIP Calculator',
      desc: 'Simulate your investments using real NAV history and analytics.',
    },
    {
      icon: '📈',
      title: 'Smart Insights',
      desc: 'Compare top-performing funds and make data-driven decisions.',
    },
    {
      icon: '🔒',
      title: 'Secure & Reliable',
      desc: 'Your data and transactions are encrypted to ensure complete safety and privacy.',
    },
  ];

  const stats = [
    { label: 'Active Investors', value: '10K+' },
    { label: 'Mutual Funds', value: '5,000+' },
    { label: 'Data Updates', value: 'Real-time' },
    { label: 'User Satisfaction', value: '99%' },
  ];

  return (
    <Box sx={{ bgcolor: 'transparent', color: '#fff', minHeight: '100vh' }}>
      <Header />
      <MarketTicker />

      <Box sx={{ textAlign: 'center', py: { xs: 8, md: 10 }, px: 3, position: 'relative', zIndex: 1 }}>
        <Box sx={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'rgba(76, 175, 80, 0.1)',
          border: '1px solid rgba(76, 175, 80, 0.3)',
          px: 2,
          py: 0.5,
          borderRadius: 2,
          mb: 4,
          animation: 'pulse 2s infinite'
        }}>
          <Box sx={{ width: 8, height: 8, bgcolor: '#4caf50', borderRadius: '50%', mr: 1.5 }} />
          <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}>
            Market Sentiment: Bullish (+1.4%)
          </Typography>
        </Box>

        <Typography
          variant="h2"
          className="animate-float"
          sx={{
            fontWeight: 900,
            mb: 3,
            fontSize: { xs: '2.8rem', md: '4.5rem' },
            background: 'linear-gradient(90deg, #fff 0%, #ff7a00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
          }}
        >
          Empower Your Wealth with <br />
          <span style={{ color: '#ff7a00' }}>Smart Mutual Fund</span> Investments
        </Typography>

        <Typography variant="h6" sx={{ mb: 5, color: 'rgba(255, 255, 255, 0.7)', maxWidth: 850, mx: 'auto', fontSize: { xs: '1.1rem', md: '1.3rem' }, lineHeight: 1.6 }}>
          Master your financial future. Analyze, compare, and simulate thousands of funds with enterprise-grade analytics tailored for the modern investor.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Link href="/funds">
            <Button variant="contained" sx={{ px: 6, py: 2, background: 'linear-gradient(90deg, #ff7a00, #ffb347)', fontWeight: 800, borderRadius: '14px', fontSize: '1.1rem', boxShadow: '0 8px 25px rgba(255, 122, 0, 0.4)', textTransform: 'none', '&:hover': { background: 'linear-gradient(90deg, #ffb347, #ff7a00)', transform: 'translateY(-3px)', transition: '0.3s' } }}>
              Explore Funds
            </Button>
          </Link>

          <Link href="/calculator">
            <Button variant="outlined" sx={{ px: 6, py: 2, borderColor: 'rgba(255, 122, 0, 0.6)', borderWidth: '2px', color: '#fff', borderRadius: '14px', fontWeight: 800, fontSize: '1.1rem', textTransform: 'none', backdropFilter: 'blur(10px)', '&:hover': { borderColor: '#ff7a00', borderWidth: '2px', background: 'rgba(255, 122, 0, 0.1)', transform: 'translateY(-3px)', transition: '0.3s' } }}>
              Simulation Tool
            </Button>
          </Link>
        </Box>

        {totalInvested > 0 && (
          <Box className="animate-float" sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
            <Link href="/portfolio" style={{ textDecoration: 'none' }}>
              <Box sx={{
                p: { xs: 2.5, md: 4 },
                background: 'rgba(76, 175, 80, 0.08)',
                borderRadius: 7,
                border: '1px solid rgba(76, 175, 80, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': { background: 'rgba(76, 175, 80, 0.12)', borderColor: '#4caf50' }
              }}>
                <Box sx={{ p: 1.5, bgcolor: 'rgba(76, 175, 80, 0.2)', borderRadius: '50%', color: '#4caf50' }}>
                  <TrendingUpIcon fontSize="large" />
                </Box>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                    My Total Wealth
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: '#fff' }}>
                    ₹{Math.round(currentValue).toLocaleString('en-IN')}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                    INVESTED: ₹{totalInvested.toLocaleString('en-IN')} • <span style={{ color: '#4caf50' }}>+{Math.round(currentValue - totalInvested).toLocaleString('en-IN')} Profit</span>
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Box>
        )}
      </Box>

      {/* How it Works Section */}
      <Container maxWidth="lg" sx={{ mb: 15 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {[
            { step: '01', title: 'Discover', desc: 'Browse through 5,000+ mutual funds with real-time NAV data.', icon: '🔍' },
            { step: '02', title: 'Analyze', desc: 'Use our advanced riskometers and 5-year performance charts.', icon: '📊' },
            { step: '03', title: 'Plan', desc: 'Simulate your wealth growth with our sophisticated SIP tools.', icon: '🎯' }
          ].map((item, i) => (
            <Box key={i} sx={{ position: 'relative', p: 4, textAlign: 'center' }}>
              <Typography variant="h1" sx={{
                position: 'absolute',
                top: -20,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '6rem',
                fontWeight: 900,
                color: 'rgba(255,122,0,0.05)',
                zIndex: 0
              }}>
                {item.step}
              </Typography>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ fontSize: '3rem', mb: 2 }}>{item.icon}</Box>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#ff7a00' }}>{item.title}</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{item.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Stats Section */}
      <Box sx={{ py: 6, borderY: '1px solid rgba(255,255,255,0.05)', bgcolor: 'rgba(255,255,255,0.02)' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, flexWrap: { xs: 'wrap', md: 'nowrap' }, justifyContent: 'center', alignItems: 'center', gap: { xs: 4, sm: 6, md: 8, lg: 12 } }}>
            {stats.map((stat, idx) => (
              <Box key={idx} sx={{ textAlign: 'center', minWidth: 'fit-content' }}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: '#ff7a00', mb: 1, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  {stat.value}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Why Choose Section */}
      <Container sx={{ py: 15 }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 900, textAlign: 'center', letterSpacing: '-0.02em' }}>
          Why Choose <span style={{ color: '#ff7a00' }}>FundExplorer</span>
        </Typography>
        <Typography variant="h6" sx={{ mb: 10, color: 'rgba(255,255,255,0.5)', textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
          We provide the tools you need to stay ahead in the market.
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2.5, mt: 6 }}>
          {features.map((feature, idx) => (
            <Box key={idx} className="glass-card" sx={{ p: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '320px', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s ease', '&:hover': { borderColor: '#ff7a00', transform: 'translateY(-10px)', boxShadow: '0 10px 30px rgba(255, 122, 0, 0.15)' } }}>
              <Box sx={{ fontSize: 64, mb: 4, filter: 'drop-shadow(0 0 15px rgba(255, 122, 0, 0.2))' }}>{feature.icon}</Box>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 800, color: '#fff', fontSize: '1.4rem' }}>{feature.title}</Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.7 }}>{feature.desc}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Popular Funds Section */}
      <Box sx={{ py: 15, background: 'rgba(255, 122, 0, 0.03)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>Popular <span style={{ color: '#ff7a00' }}>Mutual Funds</span></Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)', maxWidth: 600, mx: 'auto' }}>The most searched and trending funds by our community this week.</Typography>
          </Box>
          <PopularFundsGrid />
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Link href="/funds" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" sx={{ px: 6, py: 1.5, borderRadius: '12px', borderColor: '#ff7a00', color: '#ff7a00', fontWeight: 800, '&:hover': { borderColor: '#ffb347', background: 'rgba(255, 122, 0, 0.05)' } }}>
                View All Active Funds →
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      {/* Goal-Based Collections */}
      <Box sx={{ py: 15, position: 'relative' }}>
        <Container>
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 900, mb: 10 }}>
            Invest for Your <span style={{ color: '#ff7a00' }}>Life Goals</span>
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
            {[
              { name: 'Retirement Ready', color: '#ff7a00', desc: 'Secure your future with long-term compounding growth.', icon: '🏖️' },
              { name: 'Dream Home', color: '#4facfe', desc: 'Targeting specific milestones with balanced risk.', icon: '🏠' },
              { name: 'Tax Saver (ELSS)', color: '#4caf50', desc: 'Save up to ₹46,800 in taxes every single year.', icon: '📝' },
              { name: 'Kids Education', color: '#f093fb', desc: 'Build a corpus for their global education dreams.', icon: '🎓' }
            ].map((cat, i) => (
              <Box key={i} sx={{ p: 4, borderRadius: '24px', background: `linear-gradient(135deg, ${cat.color}15, transparent)`, border: `1px solid ${cat.color}33`, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', '&:hover': { background: `linear-gradient(135deg, ${cat.color}25, transparent)`, transform: 'translateY(-10px)', borderColor: cat.color }, transition: 'all 0.4s ease' }}>
                <Box>
                  <Box sx={{ fontSize: '2rem', mb: 2 }}>{cat.icon}</Box>
                  <Typography variant="h5" sx={{ fontWeight: 900, mb: 2, color: cat.color }}>{cat.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>{cat.desc}</Typography>
                </Box>
                <Link href="/funds" style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: cat.color, fontWeight: 800, textTransform: 'none' }}>Explore Plan →</Button>
                </Link>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Market Analysis & Insights Section */}
      <Box sx={{ py: 15, background: 'linear-gradient(180deg, transparent, rgba(255, 122, 0, 0.05))' }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            mb: 8,
            gap: 2
          }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
                Market <span style={{ color: '#ff7a00' }}>Analysis</span>
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500 }}>
                Stay informed with our daily insights into the mutual fund ecosystem.
              </Typography>
            </Box>
            <Link href="/news" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: '#ff7a00', fontWeight: 800, p: 0 }}>View All News →</Button>
            </Link>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr'
            },
            gap: 4
          }}>
            {[
              { title: 'Why Mid-Cap Funds are Surging', date: '22 APR 2026', tag: 'Market Trends', icon: '📈' },
              { title: 'Impact of Interest Rates on Debt Funds', date: '21 APR 2026', tag: 'Economy', icon: '🏛️' },
              { title: 'Top 5 Tax Saving Funds for 2026', date: '20 APR 2026', tag: 'Investment Tips', icon: '💰' }
            ].map((news, i) => (
              <Link key={i} href="/news" style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    p: 4,
                    height: '100%',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: 5,
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.04)',
                      transform: 'translateY(-5px)',
                      borderColor: 'rgba(255,122,0,0.3)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }
                  }}
                >
                  <Box>
                    <Typography variant="caption" sx={{ color: '#ff7a00', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, mb: 2, display: 'block' }}>
                      {news.tag}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, lineHeight: 1.4, color: '#fff' }}>
                      {news.title}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                      {news.date}
                    </Typography>
                    <Box sx={{ fontSize: '1.5rem' }}>{news.icon}</Box>
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box
          sx={{
            p: { xs: 5, md: 8 },
            background: 'linear-gradient(135deg, rgba(255,122,0,0.1), rgba(0,0,0,0.5))',
            borderRadius: 8,
            border: '1px solid rgba(255,122,0,0.2)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>
              Join the <span style={{ color: '#ff7a00' }}>Inner Circle</span>
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', mb: 5, maxWidth: 500, mx: 'auto' }}>
              Get weekly market deep-dives and top fund recommendations directly in your inbox.
            </Typography>

            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              maxWidth: 600,
              mx: 'auto',
              background: 'rgba(255,255,255,0.05)',
              p: 1,
              borderRadius: 4,
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <input
                type="email"
                placeholder="Enter your email address"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  padding: '12px 20px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
              <Button
                variant="contained"
                sx={{
                  background: '#ff7a00',
                  color: '#000',
                  fontWeight: 900,
                  px: 4,
                  borderRadius: 3,
                  '&:hover': { background: '#ffb347' }
                }}
              >
                Join Now
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', py: 15, background: 'radial-gradient(circle at center, rgba(255, 122, 0, 0.1) 0%, transparent 70%)' }}>
        <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>Ready to Grow Your Wealth?</Typography>
        <Typography variant="h6" sx={{ mb: 8, color: 'rgba(255, 255, 255, 0.7)', maxWidth: 650, mx: 'auto' }}>Join 10,000+ investors who trust FundExplorer for their daily insights and simulations.</Typography>
        <Link href="/signup">
          <Button variant="contained" sx={{ background: '#fff', color: '#000', px: 10, py: 3, borderRadius: '20px', fontWeight: 900, fontSize: '1.3rem', textTransform: 'none', '&:hover': { background: '#ff7a00', color: '#fff', transform: 'translateY(-5px)' } }}>
            Start Investing Free
          </Button>
        </Link>
      </Box>

      <Footer />
    </Box>
  );
}
