import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import './ViewProduct.css';
import { MdDelete } from "react-icons/md";
import Pagination from './Pagination';

const ViewProduct = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const apiURL = "http://localhost:8001";
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const getItems = async () => {
    try {
      const response = await fetch(`${apiURL}/viewproduct`);
      if (!response.ok) {
        const errData = await response.text();
        setError(`Unable to fetch items: ${errData}`);
        return;
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);


  const pagination = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to page 1 after search
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/viewproduct/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`${apiURL}/product/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorMsg = await response.text();
          setError(`Unable to delete item: ${errorMsg}`);
          return;
        }
        getItems();
      } catch (err) {
        setError(`Error deleting item: ${err.message}`);
      }
    }
  };

  return (
    <div className='container-fluid'>
      <div className='product-section'>
        <div className='heading'>
          <h2>All Products</h2>
        </div>
        <div className='form-group'>
          <input type='text'
            className='form-control'
            placeholder='search product'
            value={search}
            onChange={handleChange}
          />
        </div>
      </div>

      {error && <p className='error-message'>{error}</p>}
      <div className="table-responsive">
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((item, index) => (
              <tr key={item._id}>
                <td>{indexOfFirstProduct + index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <p className='description-cell'>
                    {item.description.length > 50
                      ? `${item.description.substring(0, 50)}...`
                      : item.description}
                  </p>
                </td>
                <td>{item.price}</td>
                <td>
                  <img
                    src={`${apiURL}/${item.image}`}
                    alt="Product"
                    className='product-image'
                    style={{ width: '100px' }}
                  />
                </td>
                <td>
                  <button className='btn btn-primary' onClick={() => handleEdit(item._id)} style={{ marginRight: '5px' }}><FaEdit /></button>
                  <button className='btn btn-danger' onClick={() => handleDelete(item._id)}><MdDelete /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='pagination'>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            pagination={pagination}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;