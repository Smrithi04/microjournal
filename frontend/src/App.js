import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import EntryList from './components/EntryList';
import Navbar from './components/Navbar';
import MoodTrendChart from './components/MoodTrendChart';
import JournalPage from './pages/JournalPage';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/AppStyles.css';
import './App.css';

const AppWrapper = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/register'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <ToastContainer position="top-right" autoClose={2500} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/journal"
          element={
            <PrivateRoute>
              <JournalPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/entries"
          element={
            <PrivateRoute>
              <EntryList />
            </PrivateRoute>
          }
        />
        <Route
          path="/chart"
          element={
            <PrivateRoute>
              <MoodTrendChart />
            </PrivateRoute>
          }
        />
        <Route
  path="/profile"
  element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  }
/>

      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
