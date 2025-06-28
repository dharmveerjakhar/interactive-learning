import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ModulePage from './pages/ModulePage';
import ConceptPage from './pages/ConceptPage';
import TypewriterDemo from './pages/TypewriterDemo';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/demo/typewriter" element={<TypewriterDemo />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/module/:slug" element={<ModulePage />} />
          <Route path="/module/:moduleSlug/concept/:conceptSlug" element={<ConceptPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
