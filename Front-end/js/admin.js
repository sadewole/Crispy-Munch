const menu = document.querySelector('#menu');
const customer = document.querySelector('#customer');
const order = document.querySelector('#order');
const menuNap = document.querySelector('#menuNap');
const customerNap = document.querySelector('#customerNap');
const orderNap = document.querySelector('#orderNap');
const addMenu = document.querySelector('.add-menu');
const modalbg = document.querySelector('.modalbg');
const closeModal = document.querySelector('#cancel');
const searchUser = document.querySelector('#searchUser');
const findUser = document.querySelectorAll('#findUser tr');

// Generally
const openFoodModal = () => {
  modalbg.style.display = 'block';
};
const closeFoodModal = e => {
  if (e.target === modalbg || e.target === closeModal) {
    modalbg.style.display = 'none';
  }
};

const controlSearch = e => {
  const val = e.target.value.toUpperCase();

  findUser.forEach(i => {
    if (i.children[0].innerText.toUpperCase().indexOf(val) !== -1) {
      i.style.display = '';
    } else {
      i.style.display = 'none';
    }
  });
};

searchUser.addEventListener('input', controlSearch);
addMenu.addEventListener('click', openFoodModal);
window.addEventListener('click', closeFoodModal);

menu.addEventListener('click', () => {
  menuNap.style.display = 'block';
  customerNap.style.display = 'none';
  orderNap.style.display = 'none';
  removeNav();
});
customer.addEventListener('click', () => {
  menuNap.style.display = 'none';
  customerNap.style.display = 'block';
  orderNap.style.display = 'none';
  removeNav();
});
order.addEventListener('click', () => {
  menuNap.style.display = 'none';
  customerNap.style.display = 'none';
  orderNap.style.display = 'block';
  removeNav();
});
