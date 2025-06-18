import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Profile.css';

const avatarOptions = [
  "bear.png", "deer.png", "fox.png", "panda.png", "penguin.png"
];

function Profile() {
  const [user, setUser] = useState(null);
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!userId) {
      navigate('/');
      return;
    }
    fetchUser();
  }, [userId, navigate]);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/user/${userId}`);
      setUser(response.data);
      setNewUsername(response.data.username);
    } catch (err) {
      toast.error('Failed to load profile.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    toast.info('Logged out');
  };

  const handleSaveUsername = async () => {
    try {
      await api.put(`/user/${userId}`, { username: newUsername });
      toast.success('Username updated!');
      setEditingUsername(false);
      fetchUser();
    } catch (err) {
      toast.error('Failed to update username.');
    }
  };

  const selectAvatar = async (filename) => {
    try {
      await api.put(`/user/${userId}`, { profile_pic: filename });
      toast.success('Avatar updated!');
      fetchUser();
      setShowAvatarPicker(false);
    } catch (err) {
      toast.error('Failed to update avatar.');
    }
  };

  if (!user) return <p style={{ textAlign: 'center' }}>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-avatar-wrapper">
        <img
          src={user.profile_pic ? `/avatars/${user.profile_pic}` : '/avatars/default.png'}
          alt="Profile"
          className="profile-avatar"
        />
        <button
          className="edit-icon-overlay"
          title="Change Avatar"
          onClick={() => setShowAvatarPicker(prev => !prev)}
        >
          ✏️
        </button>
      </div>

      {showAvatarPicker && (
        <div className="avatar-picker">
          <h4>Choose an Avatar</h4>
          <div className="avatar-grid">
            {avatarOptions.map((filename) => (
              <img
                key={filename}
                src={`/avatars/${filename}`}
                alt={filename}
                onClick={() => selectAvatar(filename)}
                className={`avatar-option ${user.profile_pic === filename ? 'selected' : ''}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="profile-details">
        <div className="username-edit">
          <strong>Username:</strong>
          {!editingUsername ? (
            <>
              <span>{user.username}</span>
              <button
                onClick={() => setEditingUsername(true)}
                className="edit-button"
              >
                Edit
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="edit-username-input"
                placeholder="New username"
              />
              <button onClick={handleSaveUsername} className="save-button">Save</button>
              <button
                onClick={() => {
                  setEditingUsername(false);
                  setNewUsername(user.username);
                }}
                className="cancel-button"
              >
                Cancel
              </button>
            </>
          )}
        </div>

        <p style={{ marginTop: '1rem' }}><strong>User ID:</strong> {user.id}</p>
      </div>

      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default Profile;
