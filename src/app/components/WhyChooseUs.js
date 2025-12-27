import React from 'react';
import styles from '../styles/Home.module.css';

export default function WhyChooseUs() {
  return (
    <section className={styles.whyChoose}>
      <h2>Everything You Need to Get Started</h2>
      <p>Powerful tools and data to make informed investment decisions</p>
      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>Comprehensive Fund Database</h3>
          <p>Access detailed data on thousands of mutual funds in India.</p>
        </div>
        <div className={styles.card}>
          <h3>Advanced SIP Calculator</h3>
          <p>Simulate your investments using real historical data.</p>
        </div>
        <div className={styles.card}>
          <h3>Interactive Visualizations</h3>
          <p>Understand performance with analytics and charts.</p>
        </div>
      </div>
    </section>
  );
}
