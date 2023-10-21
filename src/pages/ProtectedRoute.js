import { Outlet } from 'react-router';
import CustomerLogin from './customer/Login';

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
  if (accessToken) return true;
  else return false;
}

export default function ProtectedRoute() {
  const isAuthenticated = checkAuthenticated();
  return isAuthenticated ? <Outlet /> : <CustomerLogin /> ;
}