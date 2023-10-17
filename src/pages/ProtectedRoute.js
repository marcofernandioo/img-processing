import { Route, Navigate } from 'react-router-dom';

function checkAuthenticated() {
    return true;
}

export default function ProtectedRoute({ element }) {
  const isAuthenticated = checkAuthenticated(); 

  return isAuthenticated ? element : <Navigate to="/" />;
}
