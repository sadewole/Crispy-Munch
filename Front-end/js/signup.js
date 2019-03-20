const submitReg = document.querySelector('#submitReg');
const nameReg = document.querySelector('#nameReg');
const emailReg = document.querySelector('#emailReg');
const passReg = document.querySelector('#passReg');
const error = document.querySelector('#error');
const passConfirm = document.querySelector('#passConfirm');
const url = 'http://localhost:3000/api/v1/';

let token = null;

const clearError = () => {
  error.innerText = '';
};

const validateEmail = emailVal => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(emailVal);
};

const validatePassword = passwordVal => {
  const pas = /^(?=.*?[\w+])(?=(.*[\W+]?))(?!.*\s).{5,}$/;
  return pas.test(passwordVal);
};

emailReg.addEventListener('input', clearError);
passReg.addEventListener('input', clearError);
nameReg.addEventListener('input', clearError);
passConfirm.addEventListener('input', clearError);

window.addEventListener('load', () => {
  if (localStorage.getItem('token') && localStorage.getItem('token') !== 'null') {
    token = localStorage.getItem('token');
    fetch(`${url}auth/secret`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200 && data.data.role === 'User') {
          window.location.replace('./menu.html');
          return;
        }
        if (data.status === 200 && data.data.role === 'Admin') {
          window.location.replace('./admin.html');
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
});

const fetchReg = () => {
  fetch(`${url}auth/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: nameReg.value,
      email: emailReg.value,
      password: passReg.value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 200) {
        if (typeof Storage !== 'undefined') {
          localStorage.setItem('token', `${data.token}`);
        }
        window.location.href = './menu.html';
        return;
      }
      error.innerHTML = data.message;
    })
    .catch(err => console.error(err));
};

const validateReg = e => {
  e.preventDefault();
  if (nameReg.value === '') {
    error.innerHTML = 'Enter your username';
    return;
  }
  if (!validateEmail(emailReg.value.trim())) {
    error.innerHTML = 'Enter a valid email';
    return;
  }
  if (!validatePassword(passReg.value.trim())) {
    error.innerHTML = 'Password must not contain space and must be 5 characters or more';
    return;
  }
  if (passConfirm.value !== passReg.value) {
    error.innerHTML = 'Password do not match';
    return;
  }
  fetchReg();
};

submitReg.addEventListener('click', validateReg);
