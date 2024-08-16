import React from "react";
import { Routes, Route } from "react-router-dom";
import Forms from '../Forms.jsx';
import ViewProduct from "../ViewProduct.jsx";
import EditProduct from "../EditProduct.jsx";
import Header from "../Adminpanel/Header.jsx";
import Sidebar from "../Adminpanel/Sidebar.jsx";
import Dashboard from "../Adminpanel/Dashboard.jsx";
import MainContent from './MainContent.jsx'
const AdminLayout = () => {
  return (
    <div className="app">
      <Header />
      <Sidebar />
      <div className="main-content"> {/* Wrapper for main content */}
        <MainContent>
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/form" element={<Forms />} />
          <Route path="/admin/viewproduct" element={<ViewProduct />} />
          <Route path="/admin/viewproduct/:id" element={<EditProduct />} /> {/* Ensure this route is under /admin */}
        </Routes>
        </MainContent>
      </div>
    </div>
  );
};

export default AdminLayout;
