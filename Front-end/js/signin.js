const errLog = document.querySelector('#errLog');
const errReg = document.querySelector('#errReg');
const emailLog = document.querySelector('#emailLog');
const passLog = document.querySelector('#passLog');
const nameReg = document.querySelector('#nameReg');
const emailReg = document.querySelector('#emailReg');
const passReg = document.querySelector('#passReg');
const passConfirm = document.querySelector('#passConfirm');
const submitLog = document.querySelector('#submitLog');
const submitReg = document.querySelector('#submitReg');

const clearError = () => {
  errLog.innerText = '';
};
emailLog.addEventListener('input', clearError);
passLog.addEventListener('input', clearError);

const validateLogin = e => {
  e.preventDefault();
  if (!validateEmail(emailLog.value.trim())) {
    errLog.innerHTML = 'Enter a valid email';
    return;
  }
  if (passLog.value === '') {
    errLog.innerHTML = 'Enter your password';
    return;
  }
};

submitLog.addEventListener('click', validateLogin);
submitReg.addEventListener('click', validateReg);
