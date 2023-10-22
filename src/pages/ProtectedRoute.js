import jwt_decode from 'jwt-decode';
import { Outlet } from 'react-router';
import CustomerLogin from './customer/Login';
import Forbidden403 from './error/Forbidden403';


function getAccessToken(cookieString) {
  const accessTokenRegex = /accessToken=([^;]*)/;
  const match = cookieString.match(accessTokenRegex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

function checkAuthenticated() {
  const accessToken = getAccessToken(document.cookie);
  if (accessToken) {
    return jwt_decode(accessToken);
  }
  return null;
}

export default function ProtectedRoute() {
  const user = checkAuthenticated();
  if (user) {
    if (user.role === 'customer' && window.location.pathname.includes('admin')) {
      return <Forbidden403 />; // Forbid access to admin pages for customers
    } else if (user.role === 'admin' && window.location.pathname.includes('customer')) {
      return <Forbidden403 />; // Forbid access to customer pages for admins
    } else {
      return <Outlet />;
    }
  }
  return user ? <Outlet /> : <CustomerLogin />;
}