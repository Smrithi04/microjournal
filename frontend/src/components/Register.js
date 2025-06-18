import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Eye icons
import '../styles/AppStyles.css'; // Your main styles

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register', { username, password });
      toast.success('Registered successfully!');
      navigate('/');
    } catch (err) {
      toast.error('Registration failed!');
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className={`password-toggle-icon ${showPassword ? 'active' : ''}`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
}

export default Register;
