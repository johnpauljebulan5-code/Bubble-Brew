import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification, { type NotificationType } from './Notification';

type NewProductForm = {
  image: string;
  name: string;
  category: string;
  description: string;
  specification: string;
  rating: string;
  price: string;
  quantity: string;
};

type NotificationState = {
  message: string;
  type: NotificationType;
} | null;

function AddProduct() {
  const [form, setForm] = useState<NewProductForm>({
    image: '', name: '', category: 'Bread', description: '', specification: '', rating: '4.0', price: '0.00', quantity: '1'
  });
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [notification, setNotification] = useState<NotificationState>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      setError('Name and price are required');
      setNotification({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }

    const newItem = {
      id: Date.now(),
      image: form.image || 'https://via.placeholder.com/320x200?text=Product',
      name: form.name,
      category: form.category || 'Bread',
      description: form.description,
      specification: form.specification,
      rating: parseFloat(form.rating || '0'),
      price: parseFloat(form.price || '0'),
      quantity: parseInt(form.quantity || '1', 10),
    };

    try {
      const raw = localStorage.getItem('customProducts');
      const arr = raw ? JSON.parse(raw) : [];
      arr.push(newItem);
      localStorage.setItem('customProducts', JSON.stringify(arr));
      setSaved(true);
      
      // Show success notification
      setNotification({ message: `✓ Product "${form.name}" added successfully!`, type: 'success' });
      
      // small delay then go to products page
      setTimeout(() => navigate('/products'), 1500);
    } catch (err) {
      setError('Could not save product');
      setNotification({ message: 'Failed to add product. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="add-product-page container">
      <h2>Add New Product</h2>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      {error && <p className="error">{error}</p>}
      {saved && <p className="success">Product saved — redirecting to Products...</p>}
      <form onSubmit={handleSubmit} className="add-product-form">
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
        <input name="specification" placeholder="Specification" value={form.specification} onChange={handleChange} />
        <input name="rating" type="number" step="0.1" min="0" max="5" placeholder="Rating" value={form.rating} onChange={handleChange} />
        <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} />
        <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit">Save Product</button>
          <button type="button" onClick={() => navigate('/products')}>Cancel</button>
        </div>
      </form>
      <p className="muted">Products added here are saved to your browser's localStorage and will appear on the Products page.</p>
    </div>
  );
}

export default AddProduct;
