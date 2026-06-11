function Home({
  onStart,
  onLogin,
  onSignup
}) {
      return (
    <div>
      <nav className="navbar">
        <div className="logo">
          🎯 CollegePredictor
        </div>

        <div>
          <button
            className="nav-btn"
            onClick={onLogin}
            >
            Login
            </button>

            <button
            className="nav-btn signup-btn"
            onClick={onSignup}
            >
            Sign Up
            </button>
        </div>
      </nav>

      <section className="hero">
        <h1>
          Find Your Perfect College
          <br />
          Based on Your Rank
        </h1>

        <p>
          Get accurate college predictions for
          JEE Main and JEE Advanced.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={onStart}
          >
            Get Started Free
          </button>

          <button
            className="secondary-btn"
            onClick={onLogin}
            >
            Login
            </button>
        </div>
      </section>
        <section className="features">
  <h2>Why Choose CollegePredictor?</h2>

  <div className="features-grid">

    <div className="feature-card">
      <div className="icon-box">🎯</div>
      <h3>Accurate Predictions</h3>
      <p>
        Get precise college predictions based on rank and category.
      </p>
    </div>

    <div className="feature-card">
      <div className="icon-box">📊</div>
      <h3>Compare Colleges</h3>
      <p>
        Compare multiple colleges side-by-side.
      </p>
    </div>

    <div className="feature-card">
      <div className="icon-box">💾</div>
      <h3>Save & Track</h3>
      <p>
        Save your predictions and access them later.
      </p>
    </div>

    <div className="feature-card">
      <div className="icon-box">🏆</div>
      <h3>JEE Main & Advanced</h3>
      <p>
        Supports IITs, NITs, IIITs and JoSAA counselling data.
      </p>
    </div>

  </div>
</section>

        <section className="cta-section">
        <h2>Ready To Find Your Dream College?</h2>

        <p>
            Join thousands of students using
            CollegePredictor.
        </p>

        <button
            className="primary-btn"
            onClick={onStart}
        >
            Start Predicting Now
        </button>
        </section>
    </div>
  );
}

export default Home;