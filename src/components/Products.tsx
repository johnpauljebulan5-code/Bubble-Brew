import React, { useState } from 'react';
import { ADD_TO_CART_DELAY, ADDED_STATE_DURATION } from '../config';

type Product = {
  id: number;
  image: string;
  name: string;
  category: string;
  description: string;
  specification: string;
  rating: number;
  price: number;
  quantity: number;
};

function Products({ addToCart }: { addToCart: (p: Product) => void }) {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      image: 'https://cdn.pixabay.com/photo/2018/07/18/07/56/drink-3545791_640.jpg',
      name: 'Classic Bubble Tea',
      category: 'Bubble Tea',
      description: 'A refreshing mix of tea and tapioca pearls.',
      specification: '500ml, Contains caffeine',
      rating: 4.5,
      price: 5.99,
      quantity: 10,
    },
      {
     id: 2,
      image: 'https://shutterandmint.com/wp-content/uploads/2023/07/cookies-and-cream-boba-hero-image.png',
      name: 'Cookies and Cream Bubble Tea',
      category: 'Bubble Tea',
      description: 'A delightful beverage that combines the rich flavors of cookies and cream with the creamy essence of milk tea..',
      specification: '16oz, Contains classic tapioca pearl',
      rating: 4.8,
      price: 2.70,
      quantity: 15,
    },
    {
      id: 3,
      image: 'https://cdn.pixabay.com/photo/2018/05/07/11/22/mango-3380631_1280.jpg',
      name: 'Tropical Fruit Blend',
      category: 'Fruit Blend',
      description: 'Blended fruits with a splash of juice.',
      specification: '400ml, No added sugar',
      rating: 4.0,
      price: 4.99,
      quantity: 3,
    },
    {
       id: 4,
      image: 'https://tse4.mm.bing.net/th/id/OIP.vzLhZFNTF2WJGPnhPt4VmAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',
      name: 'Perfect Kiwi Smoothie',
      category: 'Fruit Blend',
      description: 'A vibrant and refreshing drink made with ripe kiwis.',
      specification: '200ml sugar free',
      rating: 3.8,
      price: 5,
      quantity: 7,

    },
    {
      id: 5,
      image: 'https://cdn.pixabay.com/photo/2016/07/21/11/17/drink-1532300_640.jpg',
      name: 'Sparkling Lemonade',
      category: 'Sparkling',
      description: 'Effervescent lemonade with a twist.',
      specification: '350ml, Carbonated',
      rating: 4.2,
      price: 3.99,
      quantity: 15,
    },
    {
      id: 6,
      image: 'https://deliciouslysprinkled.com/wp-content/uploads/2023/03/Fresh-Strawberry-Lemonade-4.jpg',
      name: 'Strawberry Lemonade',
      category: 'Sparkling',
      description: 'a refreshing beverage that blends the tanginess of fresh lemons with the natural sweetness of ripe strawberries.',
      specification: 'Typical 8-ounce serving containing  105 calories, 27.5 grams of carbohydrates.',
      rating: 4.0,
      price: 6,
      quantity: 25,

    },
    {
      id: 7,
      image: 'https://cdn.pixabay.com/photo/2017/01/29/16/40/bread-dough-2018672_640.jpg',
      name: 'Pan de Sal',
      category: 'Bread',
      description: 'Traditional Filipino bread roll, slightly sweet and soft.',
      specification: 'Pack of 6, best served warm',
      rating: 4.7,
      price: 1.99,
      quantity: 25,
    },
    {
      id: 8,
      image: 'https://cdn.pixabay.com/photo/2021/10/15/17/06/bread-6713107_640.jpg',
      name: 'Tinapay Special',
      category: 'Bread',
      description: 'House-made tinapay with buttery crust and soft crumb.',
      specification: '400g loaf, freshly baked',
      rating: 4.6,
      price: 3.49,
      quantity: 12,
      },
      {
        id: 9,
      image: 'https://www.foxyfolksy.com/wp-content/uploads/2017/02/spanish-bread-1-1.jpg',
      name: 'Spanish Bread',
      category: 'Bread',
      description: 'A delicious and sweet soft bread roll with a buttery and sugary filling,',
      specification: 'Freshly home baked',
      rating: 4.3,
      price: 5.89,
      quantity: 15,
    },
  ]);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('customProducts');
      if (raw) {
        const extra = JSON.parse(raw) as Product[];
        if (Array.isArray(extra) && extra.length) {
          setProducts(prev => {
            const ids = new Set(prev.map(p => p.id));
            const toAdd = extra.filter(p => !ids.has(p.id));
            return toAdd.length ? [...prev, ...toAdd] : prev;
          });
        }
      }
    } catch (e) {
      
    }
  }, []);

  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [addedIds, setAddedIds] = useState<number[]>([]);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  const calculateSubtotal = (price: number, quantity: number) => price * quantity;

  const overallTotal = products.reduce((total, product) => total + calculateSubtotal(product.price, product.quantity), 0);

  const filteredProducts = filterCategory === 'All' ? products : products.filter(p => p.category === filterCategory);

  const handleQuantityChange = (id: number, delta: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p));
  };

  

  const handleAddToCart = (product: Product) => {
    if (loadingIds.includes(product.id) || addedIds.includes(product.id)) return;
    setLoadingIds(prev => [...prev, product.id]);
    window.setTimeout(() => {
      
      addToCart(product);
      setLoadingIds(prev => prev.filter(id => id !== product.id));
      setAddedIds(prev => [...prev, product.id]);
      
      window.setTimeout(() => {
        setAddedIds(prev => prev.filter(id => id !== product.id));
      }, ADDED_STATE_DURATION);
    }, ADD_TO_CART_DELAY);
  };

  const handleRemoveProduct = (id: number) => {
    if (!window.confirm('Remove this product? This cannot be undone.')) return;
    setProducts(prev => prev.filter(p => p.id !== id));
    // remove from localStorage customProducts as well (if present)
    try {
      const raw = localStorage.getItem('customProducts');
      if (raw) {
        const arr = JSON.parse(raw) as Product[];
        const filtered = arr.filter(p => p.id !== id);
        localStorage.setItem('customProducts', JSON.stringify(filtered));
      }
    } catch (e) {
      // ignore
    }
    // also clean up any loading/added state and selectedProduct
    setLoadingIds(prev => prev.filter(x => x !== id));
    setAddedIds(prev => prev.filter(x => x !== id));
    setSelectedProduct(prev => (prev && prev.id === id ? null : prev));
  };

  return (
    <div className="products">
      <h2>Product Management</h2>
      <div className="filter">
        <label>Filter by Category:</label>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Bubble Tea">Bubble Tea</option>
          <option value="Fruit Blend">Fruit Blend</option>
          <option value="Sparkling">Sparkling</option>
          <option value="Bread">Bread</option>
        </select>
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <div className="meta">
              <span className="price">${product.price.toFixed(2)}</span>
              <div style={{height:6}} />
              <p className="muted">Qty: {product.quantity} {product.quantity < 5 && <span className="low-stock">Low Stock</span>}</p>
            </div>
            <p className="subtotal">Subtotal: ${calculateSubtotal(product.price, product.quantity).toFixed(2)}</p>
            <div className="actions">
              <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
              <button onClick={() => handleQuantityChange(product.id, -1)} disabled={product.quantity <= 1}>-</button>
              <button
                className={`${loadingIds.includes(product.id) ? 'loading' : ''} ${addedIds.includes(product.id) ? 'added' : ''}`.trim()}
                onClick={() => handleAddToCart(product)}
                disabled={loadingIds.includes(product.id)}
              >
                {loadingIds.includes(product.id) ? 'Adding...' : (addedIds.includes(product.id) ? 'Added' : 'Add to Cart')}
              </button>
              <button onClick={() => setSelectedProduct(product)}>View Details</button>
              <button onClick={() => handleRemoveProduct(product.id)} className="remove">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        <h3>Overall Total: ${overallTotal.toFixed(2)}</h3>
      </div>
      {selectedProduct && (
        <div className="product-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" aria-label="Close" onClick={() => setSelectedProduct(null)}>×</button>
            <div className="product-modal-inner">
              <h2>{selectedProduct.name}</h2>
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              <p><strong>Specification:</strong> {selectedProduct.specification}</p>
              <p><strong>Rating:</strong> {selectedProduct.rating}/5</p>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
              <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
              <div style={{marginTop:12}}>
                <button onClick={() => setSelectedProduct(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Products;
