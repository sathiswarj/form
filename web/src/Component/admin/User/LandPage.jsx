import React, { useState, useEffect } from 'react';
import banner1 from '../../../assets/banner2.jpg';
import shoe from '../../../assets/shoe2.jpg';
import shirt from '../../../assets/shirt.jpg';
import glass from '../../../assets/cooling.jpg';
import watch from '../../../assets/watch.jpg';
import { MdLocalShipping } from "react-icons/md";
import './LandPage.css'

const LandPage = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState('');
  const apiURL = "http://localhost:8001";

  const fetchItems = async () => {
    try {
      const response = await fetch(`${apiURL}/bestseller`);
      if (!response.ok) {
        const errData = await response.text();
        setError(`Unable to fetch items: ${errData}`);
        console.error(`Error: ${errData}`);
        return;
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setProduct(data);
    } catch (err) {
      console.error(`Error fetching items: ${err}`);
      setError('Failed to fetch products. Please try again later.');
    }
  };



  useEffect(() => {
    fetchItems()
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div id="myCarousel" className="carousel slide" data-ride="carousel">

          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>


          <div className="carousel-inner">
            <div className="item active">
              <img src={banner1} alt="Los Angeles" style={{ width: '100%' }} />
            </div>
            <div className="item">
              <img src={banner1} alt="Chicago" style={{ width: '100%' }} />
            </div>
            <div className="item">
              <img src={banner1} alt="New York" style={{ width: '100%' }} />
            </div>
          </div>


          <a className="left carousel-control" href="#myCarousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#myCarousel" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

        <div className="product col-md-12">
          <div className="row">
            <div className="col-sm-6 " >
              <img src={shoe} alt="Product" style={{ width: '65%', height: '50%' }} />
            </div>
            <div className="col-sm-6 text">
              <h2>Selected materials designed for comfort and sustainability</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
            </div>
          </div>
        </div>


        <div className="services">
          <div className="col-md-12">
            <div className="col-sm-3">
              <span style={{ display: 'flex' }}>
                <MdLocalShipping /> <p>Free shipping on orders over $50</p>
              </span>
            </div>
            <div className="col-sm-3">
              <span style={{ display: 'flex' }}>
                <MdLocalShipping /> <p>Low prices guaranteed</p>
              </span>
            </div>
            <div className="col-sm-3">
              <span style={{ display: 'flex' }}>
                <MdLocalShipping /> <p>Available to you 24/7</p>
              </span>
            </div>
          </div>
        </div>

        <div className="premium-products">
          <div className="col-md-12">
            <h2>Premium products</h2>
            <p>We recommend</p>
          </div>
          <div className="row">
      <div className=" col-md-4 mb-4">
        <div className="card card-1">
          <img src={shirt} alt="Shirt" className="card-img-top" style={{ width: '100%' }}/>
          <div className='product-detail'>
            <p>Allen Solly Men's Regular Fit Shirt</p>
            <p>₹899</p>
            <p>100+ bought in past month</p>
          </div>
        </div>
      </div>
      <div className=" col-md-4 mb-4">
        <div className="card card-1">
          <img src={glass} alt="Glass" className="card-img-top" style={{ width: '100%' }}/>
          <div className='product-detail'>
            <p>Allen Solly Men's Regular Fit Shirt</p>
            <p>₹899</p>
            <p>100+ bought in past month</p>
          </div>
        </div>
      </div>
      <div className=" col-md-4 mb-4">
        <div className="card card-1">
          <img src={watch} alt="Watch" className="card-img-top" style={{ width: '100%' }} />
          <div className='product-detail'>
            <p>Allen Solly Men's Regular Fit Shirt</p>
            <p>₹899</p>
            <p>100+ bought in past month</p>
          </div>
        </div>
      </div>
    </div>
        </div>

        <div className="best-sellers">
          <div className="col-md-12">
            <h2>Best sellers</h2>
          
          {error && <p className="error">{error}</p>}
          {product.map((item) => (
            <div className="card-2">
              <div className="col-sm-4" key={item._id}>
                <img src={`${apiURL}/${item.image}`} alt={item.name} style={{ width: '100%' }} />
              </div>
            </div>
          ))}
        </div>
        </div>
       </div>


    </>
  );
};

export default LandPage;
