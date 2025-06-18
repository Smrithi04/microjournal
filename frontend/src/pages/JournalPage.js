import React from 'react';
import EntryForm from '../components/EntryForm';
import MoodTrendChart from '../components/MoodTrendChart';

function JournalPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Journal Dashboard</h1>

      <section style={styles.section}>
        
        <EntryForm />
      </section>

      
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: `'Poppins', 'Segoe UI', sans-serif`,
    maxWidth: '850px',
    margin: '0 auto',
    background: 'linear-gradient(145deg, #f2f6ff, #e8efff)',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
    color: '#333'
  },

  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2rem',
    color: '#3C4F8F',
    fontWeight: 700,
    letterSpacing: '0.5px'
  },

  subheading: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#5C6BC0',  // soft indigo
    marginBottom: '1rem',
    borderLeft: '4px solid #AAB6FE',
    paddingLeft: '1rem'
  },

  section: {
    marginBottom: '3rem',
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
    transition: 'transform 0.2s ease',
  },
  
  divider: {
    margin: '3rem 0',
    borderTop: '2px dashed #d0d7e2'
  }
};

export default JournalPage;
