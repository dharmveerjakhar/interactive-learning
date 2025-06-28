import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ModulePage from './pages/ModulePage';
import ConceptPage from './pages/ConceptPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/module/:slug" element={<ModulePage />} />
          <Route path="/module/:moduleSlug/concept/:conceptSlug" element={<ConceptPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
