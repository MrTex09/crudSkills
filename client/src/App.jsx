import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/homepage';
import Profile from './components/profilePage';
import AddSkill from './components/addSkill';
import SkillList from './components/SkillList.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-skill" element={<AddSkill />} />
        <Route path="/skills" element={<SkillList />} />
      </Routes>
    </Router>
  );
}

export default App;
