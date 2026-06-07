function HomePage() {
  return (
    <div className="page-container" style={{ textAlign: 'center' }}>
      <header className="page-header">
        <h1>Welcome to Z3 API Hub</h1>
        <p>Your central dashboard for all integrated APIs.</p>
      </header>
      <div className="empty-state" style={{ marginTop: '2rem' }}>
        <p>Select an API integration from the navigation bar above to get started.</p>
      </div>
    </div>
  );
}

export default HomePage;
