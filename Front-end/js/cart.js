const logout = document.querySelector('#logout');
const conCart = document.querySelector('.con-cart');
const myCart = document.querySelector('#myCart');
const showCart = document.querySelector('.showCart');
const cancel = document.querySelector('#cancel');
const payment = document.querySelector('#payment');

const url = 'http://localhost:3000/api/v1/';
let token = null;
let id = null;

const updateTotal = () => {
  const cartItem = document.getElementsByClassName('cart-item');
  const sumTotal = document.getElementById('total');
  console.log(cartItem);

  let Total = 0;
  for (let i = 0; i < cartItem.length; i++) {
    let sub = 0;
    const cartRow = cartItem[i];
    const subTotal = cartRow.getElementsByClassName('subTotal')[0];
    let price = cartRow.getElementsByClassName('price')[0].innerText;
    const quantity = cartRow.getElementsByClassName('quantity')[0].value;
    price = price.replace('₦', '');
    sub += price * quantity;

    subTotal.innerHTML = `₦${sub}`;
    Total += price * quantity;
  }
  console.log(`₦${Total}`);
  sumTotal.innerText = `₦${Total}`;
};

class allCart {
  static viewMyCart(data) {
    let output = '';

    for (let i = 0; i < data.data.length; i++) {
      const info = data.data[i];
      output += `
      <tr class="cart-item">
      <td><span class="orderImg">
          <img src="${info.food.image}" alt="${info.food.name}">
      </span>
      ${info.food.name}</td>
      <td><input type="number" class="quantity" data-id="${info.id}" name="quantity" value="${
        info.quantity
      }"></td>
      <td><i class="fas fa-trash" data-id="${info.id}"></i></td>
      <td class="price">₦${info.food.price}</td>
      <td class="subTotal">₦</td>
    </tr>
      `;
    }
    myCart.innerHTML = `
    
    <table class="table table-responsive">
      <thead>
        <tr>
          <th>Food Item</th>
          <th>Quantity</th>
          <th>Remove</th>
          <th>Unit Price</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
      ${output}
      </tbody>
    </table>
    <h1 id="total"></h1>
    <button class="btn btn-tertiary" id="proceed">Proceed to checkout</button>
    
   
    `;
  }
}

// delete food from cart
const deleteFoodFromCart = () => {
  fetch(`${url}order/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: `${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 200) {
        window.location.replace('./cart.html');
      }
    });
};

const makePay = () => {
  fetch(`${url}order`);
};

// change quantity
const updateFood = quantity => {
  fetch(`${url}order/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: `${token}`
    },
    body: JSON.stringify({
      quantity
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 200) {
        alert(data.message);
      }
    })
    .catch(err => console.error(err));
};

const loadMyCart = () => {
  fetch(`${url}user/${id}/order`, {
    headers: {
      Authorization: `${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 200 || data.data >= 1) {
        allCart.viewMyCart(data);
      } else {
        document.querySelector('#noCart').innerHTML = data.message;
      }
    })
    .catch(err => console.error(err));
};

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
        id = data.data.id;

        loadMyCart();
        updateTotal();
      });
  } else {
    window.location.replace('./login.html');
  }
});

const checkQuantity = e => {
  let quantity = e.target;
  id = quantity.getAttribute('data-id');
  if (quantity.value <= 0) {
    quantity.value = 1;
  }
  quantity = Number(quantity.value);
  updateFood(quantity);
  updateTotal();
};

// Event delegation
const toggleDone = e => {
  if (e.target.matches('#proceed')) {
    conCart.style.display = 'block';
    myCart.style.display = 'none';
  }
  if (e.target.matches('i.fa-trash')) {
    id = e.target.getAttribute('data-id');
    deleteFoodFromCart();
  }
  if (e.target.matches('input')) {
    const input = e.target;
    input.addEventListener('change', checkQuantity);
  }
  updateTotal();
};

// Event listener
logout.addEventListener('click', signOut);
showCart.addEventListener('click', toggleDone);
payment.addEventListener('click', makePay);

cancel.addEventListener('click', e => {
  e.preventDefault();
  conCart.style.display = 'none';
  myCart.style.display = 'block';
});
