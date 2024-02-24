import decode from 'jwt-decode';

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
  const custId = decode(jwtAccess).id;
  return fetch (`${api}/templates/user/${custId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwtAccess}`
    },
  })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        // throw new Error('Network response was not ok');
        throw new Error(response);
      }
      
      return response.json();
    })
}

export function adminGetCustomerTemplate(id) {
  return fetch (`${api}/templates/user/${custId}`, {
    method: 'GET',
  })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        // throw new Error('Network response was not ok');
        throw new Error(response);
      }
      
      return response.json();
    })
}

export function getAllCustomers(jwtAccess) {
  return fetch(`${api}/user/customer`, {
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

// 
export function getCustomerTemplates(arr) {
  return fetch(`${api}/templates/user/templatelist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({idList: arr})
  })
  .then(res => {
    return res.json()}
  )
  .catch(err => {
    return err;
  })
}

export function loginAdmin(email, password) {
  return fetch(`${api}/auth/login/admin`, {
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
