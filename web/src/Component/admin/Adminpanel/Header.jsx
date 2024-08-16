import React from 'react';
import './Header.css';
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { IoMdMail } from "react-icons/io";

const Header = () => {
  return (
    <header className="header">
      <ul className="header-menu">
        <li><IoMdMail /> </li>
        <li><MdNotifications /></li>
        <li><MdOutlineAccountCircle /></li>
      </ul>
    </header>
  );
};

export default Header;
