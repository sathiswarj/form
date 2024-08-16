import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/admin/User/Home.jsx';
import Forms from './Component/admin/Forms.jsx';
import ViewProduct from "./Component/admin/ViewProduct.jsx";
import EditProduct from "./Component/admin/EditProduct.jsx";
import Header from "./Component/admin/Adminpanel/Header.jsx";
import Sidebar from "./Component/admin/Adminpanel/Sidebar.jsx";
import Dashboard from "./Component/admin/Adminpanel/Dashboard.jsx";
import MainContent from './Component/admin/Adminpanel/MainContent';
import LandPage from './Component/admin/User/LandPage.jsx';
import Shop from './Component/admin/User/Shop.jsx';
function App() {
  return (
    <Router>
      
      <Routes>
      <Route path="/" element={<Home />}>
          <Route index element={<LandPage />} />
          <Route path='/shop' element={<Shop />} />
        </Route>
        <Route path="/admin/*" element={
          <>
            <Header />
            <Sidebar />
            <MainContent>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="form" element={<Forms />} />
                <Route path="viewproduct" element={<ViewProduct />} />
                <Route path="viewproduct/:id" element={<EditProduct />} />
              </Routes>
            </MainContent>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
