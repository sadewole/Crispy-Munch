const logout = document.querySelector('#logout');
const url = 'http://localhost:3000/api/v1/';

let token = null;
// const modalbg = document.querySelector('.modalbg');

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

// add modal function
// const addMenu = () => {
//   modalbg.style.display = 'block';
//   document.querySelector('.addModal').style.marginTop = '0px';
// };

// const editMenu = () => {
//   const edit = document.querySelectorAll('.edit');
//   edit.forEach(i => {
//     i.addEventListener('click', () => {
//       modalbg.style.display = 'block';
//       document.querySelector('.addModal').style.marginTop = '0px';
//     });
//   });
// };

// const exitModal = e => {
//   if (e.target === modalbg) {
//     modalbg.style.display = 'none';
//   }
// };

// const close = () => {
//   const close = document.querySelectorAll('.close');

//   close.forEach(i => {
//     i.addEventListener('click', () => {
//       modalbg.style.display = 'none';
//     });
//   });
// };

// const Modal = () => {
//   window.addEventListener('click', exitModal);
//   document.querySelector('.add-menu').addEventListener('click', addMenu);
//   editMenu();
//   close();
// };

// Modal();

// end
