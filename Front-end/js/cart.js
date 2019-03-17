const logout = document.querySelector('#logout');
const conCart = document.querySelector('.con-cart');
const allCart = document.querySelector('.all-cart');
const proceed = document.querySelector('#proceed');
const cancel = document.querySelector('#cancel');

const url = 'http://localhost:3000/api/v1/';

let token = null;

window.addEventListener('load', () => {
  if (localStorage.getItem('token') && localStorage.getItem('token') !== 'null') {
    token = localStorage.getItem('token');
    fetch(`${url}auth/secret`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.status !== 200) {
          window.location.replace('./login.html');
        }
        if (data.status === 200 && data.data.role === 'Admin') {
          window.location.replace('./admin.html');
        }
      });
  } else {
    window.location.replace('./login.html');
  }
});

const signOut = () => {
  fetch(`${url}auth/logout`, {
    method: 'GET',
    headers: {
      Authorization: `${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 200) {
        if (typeof Storage !== 'undefined') {
          localStorage.setItem('token', `${data.token}`);
        }
        window.location.replace('./login.html');
      }
    })
    .catch(err => console.error(err));
};

logout.addEventListener('click', signOut);

proceed.addEventListener('click', () => {
  conCart.style.display = 'block';
  allCart.style.display = 'none';
});
cancel.addEventListener('click', () => {
  conCart.style.display = 'none';
  allCart.style.display = 'block';
});
