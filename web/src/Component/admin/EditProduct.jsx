import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [editCategory, setEditCategory] = useState('');
  const [isBestSeller, setIsBestSeller] = useState(false); // default to false
  const [existingImage, setExistingImage] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const apiURL = "http://localhost:8001";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${apiURL}/product/${id}`);
        if (!response.ok) {
          const errData = await response.text();
          setError(`Unable to fetch product: ${errData}`);
          return;
        }
        const data = await response.json();
        setEditName(data.name || '');
        setEditDescription(data.description || '');
        setEditPrice(data.price || '');
        setEditCategory(data.category || '');
        setIsBestSeller(data.bestseller || false);
        setExistingImage(`${apiURL}/${data.image}`);
      } catch (err) {
        setError(`Error: ${err.message}`);
      }
    };
    fetchProduct();
  }, [id, apiURL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', editName);
    formData.append('description', editDescription);
    formData.append('price', editPrice);
    formData.append('category', editCategory);
    formData.append('bestseller', isBestSeller); // Update bestseller status

    if (editImage) {
      formData.append('image', editImage);
    }

    try {
      const response = await fetch(`${apiURL}/product/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        setMessage('Product updated successfully');
        setTimeout(() => {
          navigate('/admin/viewproduct');
        }, 2000);
      } else {
        const errData = await response.json();
        setError(`Unable to update product: ${errData.message || 'Unknown error'}`);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className='container-fluid'>
      <div className='container-card'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className="form-control"
              placeholder="Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <textarea
              className="form-control"
              placeholder="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              className="form-control"
              placeholder="Price"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className="form-control"
              placeholder="Category"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='file'
              className='form-control'
              onChange={(e) => setEditImage(e.target.files[0])}
            />
            {existingImage && (
              <img src={existingImage} alt='Product' style={{ width: '100px' }} />
            )}
          </div>
          <div className='form-group'>
            <input
              type='checkbox'
              className='form-check-input'
              checked={isBestSeller}
              onChange={(e) => setIsBestSeller(e.target.checked)}
              id='bestseller'
            />
            <label className='form-check-label' htmlFor='bestseller' style={{ color: 'white' }}>
              Best Seller
            </label>
          </div>
          <button className='btn btn-success' type='submit'>Submit</button>
          {message && <p className='text-success'>{message}</p>}
          {error && <p className='text-danger'>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
