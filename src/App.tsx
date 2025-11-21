import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import AddProduct from './components/AddProduct';
import './App.css';

function App() {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id: any) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <Router>
      <div className="app">
        <header>
          <h1>Bubble Brew Co.</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/add-product">Add Product</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/cart" data-count={cart.length} className={`cart-link ${cart.length > 0 ? 'has-items' : ''}`}>
              Cart ({cart.length})
            </Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
        </Routes>
        <footer>
          <div className="container footer-inner">
            <p className="footer-text">© 2025 Bubble Brew Co. Brighten your day, one sip at a time.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
