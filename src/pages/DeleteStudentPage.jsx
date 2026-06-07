import { useState } from 'react';

function DeleteStudentPage() {
  const [identifier, setIdentifier] = useState('');
  const [isFetched, setIsFetched] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const [studentData, setStudentData] = useState({
    id: '',
    name: '',
    email: '',
    age: '',
    address: '',
    gender: ''
  });

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle Fetch via Enter key on the search input
  const handleSearchKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchStudent();
    }
  };

  const fetchStudent = async () => {
    if (!identifier.trim()) {
      setError('Please enter an ID or Email to search.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);
    setIsFetched(false);
    setShowConfirmModal(false);

    try {
      const response = await fetch(`https://second-react-backend.vercel.app/students/${identifier}`);
      const result = await response.json();

      if (response.ok && result.success) {
        setStudentData({
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
          age: result.data.age,
          address: result.data.address || 'N/A',
          gender: result.data.gender
        });
        setIsFetched(true);
      } else {
        setError(result.message || 'Student not found.');
      }
    } catch (err) {
      setError('Network error. Ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://second-react-backend.vercel.app/students/${studentData.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        setSuccessMessage(result.message);
        setIsFetched(false);
        setIdentifier('');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message || 'Unexpected error occurred.');
    } finally {
      setDeleteLoading(false);
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Delete User</h1>
        <p>Permanently remove a student from the database.</p>
      </header>

      <main className="main-content form-wrapper" style={{ flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Search Section */}
        <div className="search-container" style={{ width: '100%', maxWidth: '600px' }}>
          <div className="search-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Enter Student ID or Email and press Enter..."
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              onKeyDown={handleSearchKeyPress}
              autoComplete="off"
            />
          </div>
        </div>

        {/* Feedback Messages */}
        <div style={{ width: '100%', maxWidth: '600px' }}>
          {success && (
            <div className="success-message">
              <span className="icon">✅</span>
              <p>{successMessage}</p>
            </div>
          )}
          {error && (
            <div className="error-message">
              <span className="icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Display Info Section */}
        {isFetched && (
          <div className="card form-card" style={{ animation: 'fadeInUp 0.5s ease-out', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--card-border)' }}>
              <div className="avatar" style={{ width: '3.5rem', height: '3.5rem', fontSize: '1.5rem' }}>
                {studentData.name ? studentData.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div className="title-group" style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.5rem', color: '#fff', margin: 0 }}>{studentData.name}</h2>
                <span className="student-id" style={{ marginTop: '0.25rem' }}>ID: {studentData.id}</span>
              </div>
            </div>

            <div className="info-display">
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{studentData.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Age</span>
                <span className="info-value">{studentData.age}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Gender</span>
                <span className="info-value">{studentData.gender}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Address</span>
                <span className="info-value">{studentData.address}</span>
              </div>
            </div>

            <button onClick={handleDeleteClick} className="submit-btn btn-danger" style={{ marginTop: '2.5rem', width: '100%' }}>
              Delete Student
            </button>
            
            {/* Custom Modal Popup for Confirmation */}
            {showConfirmModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <div className="modal-icon">⚠️</div>
                  <h3 className="modal-title">Delete User?</h3>
                  <p className="modal-text">
                    Are you sure you really want to delete this user? This action cannot be undone.
                  </p>
                  <div className="modal-actions">
                    <button className="modal-btn btn-cancel" onClick={handleCancelDelete}>
                      Cancel
                    </button>
                    <button className="modal-btn btn-confirm-danger" onClick={handleConfirmDelete} disabled={deleteLoading}>
                      {deleteLoading ? <span className="btn-spinner"></span> : 'Yes, Delete'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default DeleteStudentPage;
