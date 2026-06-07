import { useState } from 'react';

function UpdateEmailPage() {
  const [identifier, setIdentifier] = useState('');
  const [isFetched, setIsFetched] = useState(false);
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
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

    try {
      const response = await fetch(`https://second-react-backend.vercel.app/students/${identifier}`);
      const result = await response.json();

      if (response.ok && result.success) {
        setFormData({
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
    setSuccess(false);
  };

  // Handle Update via Enter key on any input or form submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`https://second-react-backend.vercel.app/students/${formData.id}/email`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        setSuccessMessage(result.message);
        setFormData({
          ...formData,
          email: result.data.email,
        });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message || 'Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Update Email</h1>
        <p>Quickly update a student's email address by searching their ID or Email.</p>
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

        {/* Update Form Section */}
        {isFetched && (
          <div className="card form-card" style={{ animation: 'fadeInUp 0.5s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--card-border)' }}>
              <div className="avatar" style={{ width: '3rem', height: '3rem', fontSize: '1.25rem' }}>
                {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div className="title-group" style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>{formData.name}</h2>
                <span className="student-id" style={{ marginTop: '0.25rem' }}>ID: {formData.id}</span>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="student-form">
              <div className="form-group">
                <label htmlFor="email">New Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <span className="btn-spinner"></span>
                ) : (
                  'Update Email Only'
                )}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default UpdateEmailPage;
