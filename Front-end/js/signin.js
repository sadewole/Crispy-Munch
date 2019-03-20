const error = document.querySelector('#error');
const emailLog = document.querySelector('#emailLog');
const passLog = document.querySelector('#passLog');
const submitLog = document.querySelector('#submitLog');
const url = 'http://localhost:3000/api/v1/';

let token = null;

const clearError = () => {
  error.innerText = '';
};

const validateEmail = emailVal => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(emailVal);
};

emailLog.addEventListener('input', clearError);
passLog.addEventListener('input', clearError);

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

const fetchLogin = () => {
  fetch(`${url}auth/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: emailLog.value,
      password: passLog.value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 200) {
        if (typeof Storage !== 'undefined') {
          localStorage.setItem('token', `${data.token}`);
        }
        if (data.data.role === 'Admin') {
          window.location.replace('./admin.html');
          return;
        }
        window.location.replace('./menu.html');
        return;
      }
      error.innerHTML = data.message;
    })
    .catch(err => {
      error.innerHTML = 'Invalid email or password';
    });
};

const validateLogin = e => {
  e.preventDefault();
  if (!validateEmail(emailLog.value.trim())) {
    error.innerHTML = 'Enter a valid email';
    return;
  }
  if (passLog.value === '') {
    error.innerHTML = 'Enter your password';
    return;
  }
  fetchLogin();
};

submitLog.addEventListener('click', validateLogin);
