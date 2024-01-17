const api = 'http://localhost:8080'
// const api = 'https://jade-muddy-leopard.cyclic.app';

export function loginCustomer(email, password, role) {
  return fetch(`${api}/auth/login/customer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, role }),
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

export function getCustomerTemplate(jwtAccess) {
  return fetch (`${api}/templates/user`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwtAccess}`
    }
  })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      }
      
      return response.json();
    })
}
