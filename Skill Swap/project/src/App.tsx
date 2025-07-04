import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Skills from './pages/Skills';
import Matches from './pages/Matches';
import Chat from './pages/Chat';
import Forum from './pages/Forum';
import Profile from './pages/Profile';
import SkillModule from './pages/SkillModule';
import Onboarding from './pages/Onboarding';

function AppContent() {
  const { state } = useApp();
  
  return (
    <div className={`min-h-screen ${state.darkMode ? 'dark' : ''}`}>
      <div className={state.darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-purple-50 to-blue-50'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/skill/:skillId" element={<SkillModule />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;