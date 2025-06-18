import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('user_id');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload(); // force rerender to hide nav
  };

  if (!isLoggedIn) return null; // Hide entire navbar when not logged in

  return (
    <nav style={styles.nav}>
      <div style={styles.logoArea}>
      <h1 style={styles.heading}>📝 Journal Dashboard</h1>
    </div>
    
      <div style={styles.links}>
        <Link to="/journal" style={styles.link}>New Entry</Link>
        <Link to="/entries" style={styles.link}>My Entries</Link>
        <Link to="/chart" style={styles.link}>Mood Trend</Link>
        <Link to="/profile" style={styles.link}>Profile</Link> {/* ✅ Profile added */}
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: '#4B6CB7',
    color: '#fff',
    alignItems: 'center'
  },
  heading: {
    color: 'white', // Add your desired color here
    fontSize: '1rem',
    marginBottom: '1rem',
    fontWeight: 'bold'
    // Add other styles if needed
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  logout: {
    backgroundColor: '#fff',
    color: '#4B6CB7',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Navbar;
