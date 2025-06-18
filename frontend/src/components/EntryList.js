import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function EntryList() {
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const navigate = useNavigate();

  const user_id = localStorage.getItem('user_id');

  const fetchEntries = async () => {
    try {
      const response = await api.get(`/journal/${user_id}`);
      setEntries(response.data);
    } catch (err) {
      toast.error('Failed to fetch entries.');
    }
  };

  useEffect(() => {
    if (!user_id) navigate('/');
    fetchEntries();
  }, [navigate, user_id]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/journal/${id}`);
      toast.success('Entry deleted!');
      fetchEntries();
    } catch (err) {
      toast.error('Failed to delete entry.');
    }
  };

  const startEditing = (id, content) => {
    setEditingId(id);
    setEditContent(content);
  };

  const handleEdit = async (id) => {
    try {
      await api.put(`/journal/${id}`, { content: editContent });
      toast.success('Entry updated!');
      setEditingId(null);
      fetchEntries();
    } catch (err) {
      toast.error('Failed to update entry.');
    }
  };

  const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: "'Poppins', 'Segoe UI', sans-serif"
  },
  heading: {
    textAlign: 'center',
    color: '#4B6CB7',
    marginBottom: '2rem',
    fontSize: '1.8rem'
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    fontSize: '1rem'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.2s ease',
    borderLeft: '5px solid #a5b4fc'
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.8rem',
    fontSize: '0.9rem',
    color: '#555'
  },
  mood: {
    fontWeight: 600,
    color: '#5C6BC0'
  },
  date: {
    fontStyle: 'italic'
  },
  content: {
    fontSize: '1rem',
    color: '#333',
    margin: '0.5rem 0 1rem'
  },
  textarea: {
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #ccc',
    padding: '0.8rem',
    fontSize: '1rem',
    marginBottom: '1rem',
    resize: 'vertical'
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'flex-end'
  },
  editButton: {
    backgroundColor: '#4B6CB7',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  saveButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  cancelButton: {
    backgroundColor: '#9e9e9e',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

  return (
  <div style={styles.container}>
    <h2 style={styles.heading}>📖 Your Journal Entries</h2>

    {entries.length === 0 ? (
      <p style={styles.empty}>No entries yet.</p>
    ) : (
      <div style={styles.list}>
        {entries.map((entry) => (
          <div key={entry.id} style={styles.card}>
            <div style={styles.meta}>
              <span style={styles.mood}><strong>Mood:</strong> {entry.mood}</span>
              <small style={styles.date}>{entry.date_created}</small>
            </div>

            {editingId === entry.id ? (
              <>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows="4"
                  style={styles.textarea}
                />
                <div style={styles.buttonGroup}>
                  <button onClick={() => handleEdit(entry.id)} style={styles.saveButton}>💾 Save</button>
                  <button onClick={() => setEditingId(null)} style={styles.cancelButton}>❌ Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p style={styles.content}>{entry.content}</p>
                <div style={styles.buttonGroup}>
                  <button onClick={() => startEditing(entry.id, entry.content)} style={styles.editButton}>✏️ Edit</button>
                  <button onClick={() => handleDelete(entry.id)} style={styles.deleteButton}>🗑️ Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default EntryList;
