import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ShopDashboard from './pages/shop/ShopDashboard';
import ShopListPage from './pages/admin/ShopListPage';
import CreateShopPage from './pages/admin/CreateShopPage';
import AdminPage from './pages/admin/AdminPage';
import CreateAdminPage from './pages/admin/CreateAdminPage';
import EmployeeListPage from './pages/shop/EmployeeListPage';
import RotaPage from './pages/shop/RotaPage';
import PunchingPage from './pages/shop/PunchingPage';
import SalaryPage from './pages/shop/SalaryPage';
import PayoutListPage from './pages/shop/PayoutListPage';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {/* Toast notifications container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Router>
        <Routes>
          {/* Login route */}
          <Route
            path="/login"
            element={
              user?.token
                ? user.role === 'Admin'
                  ? <Navigate to="/admin/dashboard" />
                  : <Navigate to="/shop/dashboard" />
                : <LoginPage />
            }
          />

          {/* Admin dashboard */}
          <Route
            path="/admin/dashboard"
            element={user?.role === 'Admin' ? <AdminDashboard /> : <Navigate to="/login" />}
          />

          {/* Admin Shop List */}
          <Route
            path="/admin/shops"
            element={user?.role === 'Admin' ? <ShopListPage /> : <Navigate to="/login" />}
          />
          {/* Admin Admins Page */}
          <Route
            path="/admin/admins"
            element={user?.role === 'Admin' ? <AdminPage /> : <Navigate to="/login" />}
          />
          {/* Create Admin Page */}
          <Route
            path="/admin/create"
            element={user?.role === 'Admin' ? <CreateAdminPage /> : <Navigate to="/login" />}
          />

          {/* Admin Create Shop */}
          <Route
            path="/admin/create/shop"
            element={user?.role === 'Admin' ? <CreateShopPage /> : <Navigate to="/login" />}
          />

          {/* Shop dashboard */}
          <Route
            path="/shop/dashboard"
            element={user?.role === 'ShopAdmin' ? <ShopDashboard /> : <Navigate to="/login" />}
          />
          {/* EmployeeListPage */}
          <Route
            path="/shop/employees"
            element={user?.role === 'ShopAdmin' ? <EmployeeListPage /> : <Navigate to="/login" />}
          />
          {/* Rota Page */}
          <Route
            path="/shop/create/rota"
            element={user?.role === 'ShopAdmin' ? <RotaPage /> : <Navigate to="/login" />}
          />
          {/* Punxhings Page */}
          <Route
            path="/shop/punchings"
            element={user?.role === 'ShopAdmin' ? <PunchingPage /> : <Navigate to="/login" />}
          />
          {/* Salary Page */}
          <Route
            path="/shop/salary"
            element={user?.role === 'ShopAdmin' ? <SalaryPage /> : <Navigate to="/login" />}
          />
          {/* Payout Page */}
          <Route
            path="/shop/payout"
            element={user?.role === 'ShopAdmin' ? <PayoutListPage /> : <Navigate to="/login" />}
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
