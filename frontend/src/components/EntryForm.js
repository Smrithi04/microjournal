import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function EntryForm() {
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleAddEntry = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      alert('Please log in first!');
      navigate('/');
      return;
    }

    try {
      console.log({ user_id, content }); // debug
      await api.post('/journal', { user_id, content });
      toast.success('Entry added!');
      navigate('/entries');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      toast.error('Failed to add entry.');
    }
  };

  return (
    <form onSubmit={handleAddEntry}>
      <h2>New Journal Entry</h2>
      <textarea 
        placeholder="Write your thoughts here..." 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required 
        rows="6"
      />
      <button type="submit">Add Entry</button>
    </form>
  );
}

export default EntryForm;
