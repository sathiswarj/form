import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleHandler = () => {
    console.log("Toggle clicked");
    setOpen(!isOpen);
    console.log("isOpen:", !isOpen);
  };

  return (
    <section className='nav-section'>
      <header>
        <div className='logo'><p className='web-logo'>Logo</p></div>
        <div className='hamburger' onClick={toggleHandler}>
          <FaBars />
        </div>
        <nav className={`nav-bar ${isOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to='/'>Home</Link></li> 
            <li><Link to='/shop'>Shop</Link></li> 
            <li><Link to='/product-details'>Product</Link></li> 
            <li><Link to='/cart'>Cart</Link></li> 
            <li><Link to='/contact-us'>Contact Us</Link></li> 
            <li><Link to='/account'>Account</Link></li> 
          </ul>
        </nav>
      </header>
      <Outlet />
    </section>
  );
};

export default Home;
