import { useState, useEffect } from 'react';

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://second-react-backend.vercel.app/students');
        if (!response.ok) {
          throw new Error('Failed to fetch students. Ensure the backend is running.');
        }
        const result = await response.json();
        
        if (result.success) {
          setStudents(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError(err.message || 'Network error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase();
    return (
      student.name?.toLowerCase().includes(query) ||
      student.email?.toLowerCase().includes(query) ||
      student.address?.toLowerCase().includes(query) ||
      student.id?.toString().includes(query) ||
      student.age?.toString().includes(query)
    );
  });

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Student Directory</h1>
        <p>Manage and view all enrolled students efficiently.</p>
      </header>

      <main className="main-content">
        {!loading && !error && students.length > 0 && (
          <div className="search-container">
            <div className="search-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search by name, ID, email, age, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {loading && (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Connecting to database...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <span className="icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && students.length === 0 && (
          <div className="empty-state">
            <p>No students found in the database. Add some data to get started!</p>
          </div>
        )}

        {!loading && !error && students.length > 0 && filteredStudents.length === 0 && (
          <div className="empty-state">
            <p>No students match your search query "{searchQuery}".</p>
          </div>
        )}

        {!loading && !error && filteredStudents.length > 0 && (
          <div className="grid">
            {filteredStudents.map((student) => (
              <div key={student.id} className="card">
                <div className="card-header">
                  <div className="avatar">
                    {student.name ? student.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div className="title-group">
                    <h2>{student.name}</h2>
                    <span className="student-id">ID: {student.id}</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="info-group">
                    <strong>Email</strong>
                    <span>{student.email}</span>
                  </div>
                  <div className="info-group">
                    <strong>Age</strong>
                    <span>{student.age}</span>
                  </div>
                  <div className="info-group">
                    <strong>Address</strong>
                    <span>{student.address || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default StudentsPage;
