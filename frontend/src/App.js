import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SavePage from './pages/SavePage.js';
import HomePage from './pages/HomePage.js';
import Navbar from "./component/Navbar.js";
function App() {
  return (
    <Router>
      <Navbar />
      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/save" element={<SavePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;