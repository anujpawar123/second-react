import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentsPage';
import CreateStudentPage from './pages/CreateStudentPage';
import UpdateStudentPage from './pages/UpdateStudentPage';
import UpdateEmailPage from './pages/UpdateEmailPage';
import DeleteStudentPage from './pages/DeleteStudentPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <main className="main-viewport">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/create" element={<CreateStudentPage />} />
            <Route path="/update" element={<UpdateStudentPage />} />
            <Route path="/update-email" element={<UpdateEmailPage />} />
            <Route path="/delete" element={<DeleteStudentPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
