const url = 'http://localhost:3000/api/v1/';
const token = null;

// window.addEventListener('load', () => {
//   if (localStorage.getItem('token') && localStorage.getItem('token') !== 'null') {
//     token = localStorage.getItem('token');
//     fetch(`${url}secret`, {
//       headers: {
//         Authorization: `${token}`
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (data.status === 200) {
//           window.location.replace('./dashboard.html');
//           return;
//         }
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   }
// });

const validateEmail = emailVal => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(emailVal);
};

const validatePassword = passwordVal => {
  const pas = /^(?=.*?[\w+])(?=(.*[\W+]?))(?!.*\s).{5,}$/;
  return pas.test(passwordVal);
};
