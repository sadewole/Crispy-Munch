const menu = document.querySelector('#menu');
const customer = document.querySelector('#customer');
const order = document.querySelector('#order');
const menuNap = document.querySelector('#menuNap');
const customerNap = document.querySelector('#customerNap');
const orderNap = document.querySelector('#orderNap');

menu.addEventListener('click', () => {
  menuNap.style.display = 'block';
  customerNap.style.display = 'none';
  orderNap.style.display = 'none';
  if (window.innerWidth <= 768) {
    navPill.style.left = '-1000px';
    navFlex.style.opacity = 1;
  }
});
customer.addEventListener('click', () => {
  menuNap.style.display = 'none';
  customerNap.style.display = 'block';
  orderNap.style.display = 'none';
  if (window.innerWidth <= 768) {
    navPill.style.left = '-1000px';
    navFlex.style.opacity = 1;
  }
});
order.addEventListener('click', () => {
  menuNap.style.display = 'none';
  customerNap.style.display = 'none';
  orderNap.style.display = 'block';
  if (window.innerWidth <= 768) {
    navPill.style.left = '-1000px';
    navFlex.style.opacity = 1;
  }
});
