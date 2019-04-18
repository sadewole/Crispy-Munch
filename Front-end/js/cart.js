const logout = document.querySelector('#logout');
const conCart = document.querySelector('.con-cart');
const myCart = document.querySelector('#myCart');
const showCart = document.querySelector('.showCart');
const cancel = document.querySelector('#cancel');
const payment = document.querySelector('#payment');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const address = document.querySelector('#address');
const error = document.querySelector('#error');

const url = 'http://localhost:3000/api/v1/';
let token = null;
let id = null;

const clearError = () => {
  error.innerText = '';
};
email.addEventListener('input', clearError);
address.addEventListener('input', clearError);
phone.addEventListener('input', clearError);

const validateEmail = emailVal => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(emailVal);
};
const validatePhone = phoneVal => {
  const reg = /\d{11}/;
  return reg.test(phoneVal);
};

const updateTotal = () => {
  const cartItem = document.getElementsByClassName('cart-item');
  const sumTotal = document.getElementById('total');

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
  sumTotal.innerText = `₦${Total}`;
};

class allCart {
  static viewMyCart(data) {
    let output = '';
    let Total = 0;

    for (let i = 0; i < data.data.length; i++) {
      const info = data.data[i];
      if (info.payment === 'pending') {
        document.querySelector('#noCart').style.display = 'none';
        myCart.style.display = 'block';

        Total += info.food.price * info.quantity;
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
				<td class="subTotal">₦${info.food.price * info.quantity}</td>
			</tr>
				`;
      }
      if (info.payment === 'paid') {
        myCart.style.display = 'none';
        document.querySelector(
          '#noCart'
        ).innerHTML = `<h1>Cart is empty</h1><p>Browse our catalog and discover the best deals!</p>`;
      }
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
    <h1 id="total">₦${Total}</h1>
    <button class="btn btn-tertiary" id="proceed">Proceed to checkout</button>`;
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
  fetch(`${url}user/${id}/order`, {
    method: 'PUT',
    headers: {
      Authorization: `${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      phone: phone.value,
      address: address.value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 200) {
        alert(data.message);
        window.location.replace('./menu.html');
      }
    })
    .catch(err => console.error(err));
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
        document.querySelector('#noCart').innerHTML = `<h1>${
          data.message
        }</h1><p>Browse our catalog and discover the best deals!</p>`;
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
        email.value = data.data.email;
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

const validatePayment = e => {
  e.preventDefault();
  if (!validateEmail(email.value.trim())) {
    error.innerHTML = 'Enter a valid email';
    return;
  }
  if (!validatePhone(phone.value)) {
    error.innerHTML = 'Enter a valid phone number';
    return;
  }
  if (address.value.length <= 10) {
    error.innerHTML = 'Enter a valid address';
    return;
  }
  makePay();
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
payment.addEventListener('click', validatePayment);

cancel.addEventListener('click', e => {
  e.preventDefault();
  conCart.style.display = 'none';
  myCart.style.display = 'block';
});
