import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import StudioDetail from './pages/StudioDetail';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomCursor />
        <ScrollProgress />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/studio/:id" element={<StudioDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;