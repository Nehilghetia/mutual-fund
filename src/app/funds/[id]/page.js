'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RollingReturnChart from '../../components/RollingReturnChart';

export default function FundDetailPage() {
  const { id } = useParams();
  const [fundData, setFundData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchFund() {
      try {
        setLoading(true);
        const res = await fetch(`/api/scheme/${id}`);
        if (!res.ok) throw new Error('Failed to fetch fund data');
        const data = await res.json();
        setFundData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFund();
  }, [id]);

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>{error}</div>;
  if (!fundData) return null;

  // Example: Extract rolling return data from API response
  const labels = ['Day', 'Month', 'Year', '3Y', '5Y'];
  const data = [
    fundData.returns?.daily || 0,
    fundData.returns?.monthly || 0,
    fundData.returns?.yearly || 0,
    fundData.returns?.threeYear || 0,
    fundData.returns?.fiveYear || 0,
  ];

  return (
    <div style={{ background: '#0b0b0b', minHeight: '100vh', color: '#fff' }}>
      <Header />

      <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: '#ffb347', textAlign: 'center', marginBottom: '30px' }}>
          {fundData.name} Rolling Returns
        </h2>

        <RollingReturnChart data={data} labels={labels} title={`Rolling Returns for ${fundData.name}`} />
      </div>

      <Footer />
    </div>
  );
}
