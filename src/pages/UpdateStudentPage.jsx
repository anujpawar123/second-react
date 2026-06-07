import { useState } from 'react';

function UpdateStudentPage() {
  const [identifier, setIdentifier] = useState('');
  const [isFetched, setIsFetched] = useState(false);
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    age: '',
    address: '',
    gender: 'Male'
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
          age: result.data.age,
          address: result.data.address || '',
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
      const response = await fetch(`https://second-react-backend.vercel.app/students/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        setSuccessMessage(result.message);
        // Form data is already updated, just ensure state matches exact DB record if needed
        setFormData({
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
          age: result.data.age,
          address: result.data.address || '',
          gender: result.data.gender
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
        <h1>Update Student</h1>
        <p>Enter an ID or Email to find and update user information.</p>
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: '#fff' }}>Current Information</h2>
              <span className="student-id">ID: {formData.id}</span>
            </div>

            <form onSubmit={handleUpdate} className="student-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input-field"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group half-width">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    className="input-field"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group half-width">
                  <label>Gender</label>
                  <div className="radio-group">
                    <label className={`radio-label ${formData.gender === 'Male' ? 'active' : ''}`}>
                      <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
                      Male
                    </label>
                    <label className={`radio-label ${formData.gender === 'Female' ? 'active' : ''}`}>
                      <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
                      Female
                    </label>
                    <label className={`radio-label ${formData.gender === 'Other' ? 'active' : ''}`}>
                      <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} />
                      Other
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  className="input-field textarea-field"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <span className="btn-spinner"></span>
                ) : (
                  'Update Student'
                )}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default UpdateStudentPage;
