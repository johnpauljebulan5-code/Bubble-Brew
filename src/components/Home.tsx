import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content container fade-in">
          <h2>Welcome to Bubble Brew Co.</h2>
          <p>Fun and refreshing beverages made with quality ingredients and unique flavors.</p>
          <div style={{ marginTop: 16 }}>
            <Link to="/products" className="cta">View Our Products</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
