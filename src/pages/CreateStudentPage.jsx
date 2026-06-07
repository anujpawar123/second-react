import { useState } from 'react';

function CreateStudentPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
    gender: 'Male' // default value
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status messages on new input
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('https://second-react-backend.vercel.app/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          age: '',
          address: '',
          gender: 'Male'
        });
      } else {
        // This handles cases like 409 Conflict (email exists) or 400 Bad Request
        setError(result.message);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Create Student</h1>
        <p>Register a new student into the system.</p>
      </header>

      <main className="main-content form-wrapper">
        <div className="card form-card">
          {success && (
            <div className="success-message">
              <span className="icon">✅</span>
              <p>Student created successfully!</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <span className="icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="input-field"
                placeholder="John Doe"
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
                placeholder="johndoe@example.com"
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
                  placeholder="20"
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
                placeholder="123 Main St, City, Country"
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
                'Create Student'
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateStudentPage;
