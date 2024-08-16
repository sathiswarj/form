import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { IoStatsChart } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { MdReport } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { FaBars } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className='icon-text'>
        <h2 className={`icon ${isOpen ? 'show' : 'hide'}`}>Icon</h2>
        <div className='bars'>
          <FaBars onClick={toggleHandler} />
        </div>
      </div>
      <ul className='list-item'>
        <li>
          <Link to="/admin" className="icon">
            <IoStatsChart className='side-icon' />
            <span className={`text ${isOpen ? 'show' : 'hide'}`}>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/form" className="icon">
            <FaCartShopping className='side-icon'/>
            <span className={`text ${isOpen ? 'show' : 'hide'}`}>Product</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/viewproduct" className="icon">
            <MdPeopleAlt className='side-icon' />
            <span className={`text ${isOpen ? 'show' : 'hide'}`}>Customers</span>
          </Link>
        </li>
        <li>
          <Link to="/inventory" className="icon">
            <FaBoxArchive className='side-icon' />
            <span className={`text ${isOpen ? 'show' : 'hide'}`}>Inventory</span>
          </Link>
        </li>
        <li>
          <Link to="/reports" className="icon">
            <MdReport className='side-icon' />
            <span className={`text ${isOpen ? 'show' : 'hide'}`}>Reports</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className="icon">
            <IoSettings className='side-icon' />
            <span className={`text ${isOpen ? 'show' : 'hide'}`}>Settings</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
