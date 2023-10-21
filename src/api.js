// import axios from 'axios';
// require('dotenv').config();

// const api = process.env.API;
const api = 'http://localhost:8080'

export function login(email, password) {
  return fetch(`${api}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    })
}

export function register(email, password, username) {
  return fetch(`${api}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, username }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}

export function getAllImages(jwtAccess) {
  return fetch(`${api}/images/all`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwtAccess}`,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}
