import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import { Outlet } from 'react-router';
import CustomerLogin from './customer/Login';

function checkAuthenticated() {
    return true;
}

export default function ProtectedRoute() {
  const isAuthenticated = checkAuthenticated(); 

  return isAuthenticated ? <Outlet /> : <CustomerLogin /> ;
}
