import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MainStage from './MainStage';
import SidePanel from './SidePanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mainstage" element={<MainStage />} />
        <Route path="/side-panel" element={<SidePanel />} />
      </Routes>
    </Router>
  );
}

export default App;