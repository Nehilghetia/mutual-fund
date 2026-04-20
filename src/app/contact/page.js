'use client';
import { Box, Container, Typography, Grid, TextField, Button } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

const inputStyle = {
    '& .MuiOutlinedInput-root': {
        color: '#fff',
        borderRadius: 3,
        background: 'rgba(0,0,0,0.2)',
        '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
        '&:hover fieldset': { borderColor: '#ff7a00' },
        '&.Mui-focused fieldset': { borderColor: '#ff7a00' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' }
};

const buttonStyle = {
    py: 2,
    borderRadius: 3,
    background: 'linear-gradient(135deg, #ff7a00, #ffb347)',
    color: '#000',
    fontWeight: 900,
    fontSize: '1rem',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(255, 122, 0, 0.3)',
    '&:hover': {
        background: 'linear-gradient(135deg, #ffb347, #ff7a00)',
        boxShadow: '0 12px 35px rgba(255, 122, 0, 0.5)',
        filter: 'brightness(1.1)'
    }
};

export default function ContactPage() {
    return (
        <Box sx={{ minHeight: '100vh', position: 'relative', pt: 12 }}>
            <Header />
            <Container maxWidth="lg" sx={{ py: 10 }}>
                {/* Centered Header */}
                <Box sx={{ textAlign: 'center', mb: 10, width: '100%' }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 900,
                            mb: 2,
                            letterSpacing: '-0.04em',
                            fontSize: { xs: '3rem', md: '5rem' },
                            color: '#fff'
                        }}
                    >
                        Get in <span style={{ color: '#ff7a00' }}>Touch</span>
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: 700, mx: 'auto', lineHeight: 1.8 }}>
                        Our dedicated support team is available 24/7 to assist with your mutual fund queries,
                        technical support, or institutional partnerships.
                    </Typography>
                </Box>

                {/* Info Cards Row - Centered */}
                <Grid container spacing={4} sx={{ mb: 12 }} justifyContent="center">
                    {[
                        { icon: <EmailIcon sx={{ fontSize: 32 }} />, title: 'Email Support', detail: 'support@fundexplorer.com', color: '#4facfe' },
                        { icon: <PhoneIphoneIcon sx={{ fontSize: 32 }} />, title: 'Phone Support', detail: '+91 98765 43210', color: '#f093fb' },
                        { icon: <LocationOnIcon sx={{ fontSize: 32 }} />, title: 'HQ Location', detail: 'Financial District, Mumbai', color: '#ff9a9e' },
                    ].map((item, i) => (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                            <Box className="glass-card" sx={{
                                p: 5,
                                textAlign: 'center',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                transition: '0.4s',
                                '&:hover': { transform: 'translateY(-10px)', borderColor: item.color }
                            }}>
                                <Box sx={{
                                    p: 2,
                                    borderRadius: '50%',
                                    bgcolor: `${item.color}15`,
                                    color: item.color,
                                    mb: 3,
                                    display: 'flex'
                                }}>
                                    {item.icon}
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#fff' }}>{item.title}</Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{item.detail}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* Centered Form Section */}
                <Box className="glass-card" sx={{
                    p: { xs: 4, md: 8 },
                    maxWidth: 900,
                    mx: 'auto',
                    background: 'rgba(0, 0, 0, 0.4)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {/* Row 1: First and Last Name */}
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                            <TextField fullWidth label="First Name" sx={inputStyle} placeholder="First Name" />
                            <TextField fullWidth label="Last Name" sx={inputStyle} placeholder="Last Name" />
                        </Box>

                        {/* Row 2: Phone Number */}
                        <TextField fullWidth label="Phone Number" sx={inputStyle} placeholder="+91 XXXXX XXXXX" />

                        {/* Row 3: Email Address */}
                        <TextField fullWidth label="Email Address" sx={inputStyle} placeholder="example@email.com" />

                        {/* Row 4: Subject */}
                        <TextField fullWidth label="Subject" sx={inputStyle} placeholder="General Inquiry" />

                        {/* Row 5: Message */}
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            label="Your Message"
                            sx={inputStyle}
                            placeholder="How can we help you?"
                        />

                        {/* Row 6: Centered Button */}
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Button variant="contained" sx={{ ...buttonStyle, px: 15, py: 2 }}>
                                Send Inquiry
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
}