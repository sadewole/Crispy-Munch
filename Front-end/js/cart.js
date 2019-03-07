const conCart = document.querySelector('.con-cart');
const allCart = document.querySelector('.all-cart');
const proceed = document.querySelector('#proceed');
const cancel = document.querySelector('#cancel');

proceed.addEventListener('click', () => {
  conCart.style.display = 'block';
  allCart.style.display = 'none';
});
cancel.addEventListener('click', () => {
  conCart.style.display = 'none';
  allCart.style.display = 'block';
});
