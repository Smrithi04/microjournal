import React, { useEffect, useState } from 'react';
import api from '../api/api';
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const moodToScore = {
  "Sad": 1,
  "Neutral": 2,
  "Happy": 3
};

const scoreToMood = {
  1: "😢 Sad",
  2: "😐 Neutral",
  3: "😄 Happy"
};

function MoodTrendChart() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchMoodTrend = async () => {
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      navigate('/');
      return;
    }

    try {
      const response = await api.get(`/mood-trend/${user_id}`);
      const transformed = response.data.map(entry => ({
        date: entry.date,
        mood: moodToScore[entry.mood] || 0
      }));
      setData(transformed);
    } catch (err) {
      toast.error('Failed to load mood trend.');
    }
  };

  const averageMood = () => {
    if (data.length === 0) return "Not enough data";
    const avg = data.reduce((sum, d) => sum + d.mood, 0) / data.length;
    return scoreToMood[Math.round(avg)] || "Unknown";
  };

  useEffect(() => {
    fetchMoodTrend();
  }, []);

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>📊 Weekly Mood Overview</h2>

      <ResponsiveContainer height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            ticks={[1, 2, 3]}
            domain={[1, 3]}
            tickFormatter={(val) => scoreToMood[val]}
            width={80}
            height={80}
            tick={{ fontSize: 12, fill: '#555' }}
          />
          <Tooltip formatter={(value) => scoreToMood[value]} />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#4B6CB7"
            strokeWidth={3}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>

      <div style={styles.info}>
        <button onClick={fetchMoodTrend} style={styles.refresh}>
          🔄 Refresh
        </button>
        <p style={styles.avg}>Weekly Mood Avg: <strong>{averageMood()}</strong></p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: '100%',
    maxWidth: '700px',
    background: '#fdfdfd',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    fontFamily: "'Segoe UI', sans-serif"
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.2rem',
    fontSize: '1.7rem',
    color: '#4B6CB7'
  },
  info: {
    textAlign: 'center',
    marginTop: '1.5rem'
  },
  avg: {
    marginTop: '0.75rem',
    fontSize: '1.1rem',
    color: '#333'
  },
  refresh: {
    padding: '0.6rem 1.2rem',
    background: '#4B6CB7',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease'
  }
};
  
export default MoodTrendChart;
