const menu = document.querySelector('#menu');
const customer = document.querySelector('#customer');
const order = document.querySelector('#order');
const menuNap = document.querySelector('#menuNap');
const customerNap = document.querySelector('#customerNap');
const orderNap = document.querySelector('#orderNap');
const addMenu = document.querySelector('.add-menu');
const modalbg = document.querySelector('.modalbg');
const modalbg2 = document.querySelector('.modalbg2');
const totalSale = document.querySelector('#totalSale');
const searchUser = document.querySelector('#searchUser');
const foodMenu = document.querySelector('.foodMenu');
const userInfo = document.querySelector('.userInfo');
const closeModal = document.querySelector('#cancel');
const closeModal2 = document.querySelector('#cancel2');
const logHistory = document.querySelector('#history');

const addFoodName = document.querySelector('#addFoodName');
const addFoodPrice = document.querySelector('#addFoodPrice');
const addFoodImage = document.querySelector('#addFoodImage');
const editFoodForm = document.querySelector('#editFoodForm');
const save = document.querySelector('#save');
const errorPost = document.querySelector('#errorPost');
const logout = document.querySelector('#logout');
const url = 'http://localhost:3000/api/v1/';

let token = null;
let id = null;
const clearError1 = () => {
	errorPost.innerText = '';
};
addFoodName.addEventListener('input', clearError1);
addFoodPrice.addEventListener('input', clearError1);
addFoodImage.addEventListener('input', clearError1);

// Query fetch
window.addEventListener('load', () => {
	if (localStorage.getItem('token') && localStorage.getItem('token') !== 'null') {
		token = localStorage.getItem('token');
		fetch(`${url}auth/secret`, {
			headers: {
				Authorization: `${token}`
			}
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status !== 200 && data.data.role !== 'Admin') {
					window.location.replace('./login.html');
				}
				if (data.status === 200 && data.data.role === 'User') {
					window.location.replace('./menu.html');
				}

				document.querySelector('#username').innerHTML = data.data.username;
			});
	} else {
		window.location.replace('./login.html');
	}
});

const postNewFood = () => {
	const formData = new FormData(document.forms.myForm);

	fetch(`${url}menu`, {
		method: 'POST',
		headers: {
			Authorization: `${token}`
		},
		body: formData
	})
		.then((res) => res.json())
		.then((datas) => {
			if (datas.status === 201) {
				alert(datas.message);
				window.location.href = './admin.html';
			}
		})
		.catch((err) => console.error(err));
};

class GenericDisplay {
	static displayFoodList(datas) {
		let output = '';
		console.log(datas);
		for (let i = 0; i < datas.data.length; i++) {
			const info = datas.data[i];

			output += `<tr>
      <td><img src="${info.image}" alt=""></td>
      <td>${info.name}</td>
      <td>₦${info.price}</td>
      <td class="edit"><i class="far fa-edit" data-id="${info.id}"></i></td>
      <td class="delete"><i class="far fa-trash-alt" data-id="${info.id}"></i></td>
  </tr>`;
		}

		foodMenu.innerHTML = `
    <table class="table table-responsive">
                              <thead>
                                  <tr>
                                      <td></td>
                                      <td>Name</td>
                                      <td>Price</td>
                                      <td>Edit</td>
                                      <td>Delete</td>
                                  </tr>
                              </thead>
                              <tbody>
                                  ${output}
                              </tbody>
                          </table>
    `;
	}

	static displayEditFood(datas) {
		const info = datas.data;
		editFoodForm.innerHTML = `<form method="POST" enctype="multipart/form-data" id="myEditForm">
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" name="name" id="editFoodName" value="${info.name}">
      </div>
      <div class="form-group">
        <label>Price:</label>
        <input type="text" class="form-control" name="price" id="editFoodPrice" value="${info.price}">
      </div>
      <div class="form-group">
        <label>Image:</label>
        <input type="file" class="form-control" name="image" id="editFoodImage" value="${info.image}">
	  </div>
	  <p id="editErr"></p>
      <button id="save" type="button" class="success">Save</button>
      <button id="cancel2" type="button" class="close">Cancel</button>
    </form>`;
	}

	static displayAllUsers(datas) {
		let output = '';

		for (let i = 0; i < datas.data.length; i++) {
			const info = datas.data[i];

			output += `<tr>
	  <td>${info.username}</td>
	  <td>${info.email}</td>
	  <td>${info.role}</td>
	  <td class="promote"><i class="fas fa-upload" data-id="${info.id}"></i></td>
	  <td class="delete"><i class="far fa-trash-alt" data-id="${info.id}"></i></td>
	</tr>`;
		}

		userInfo.innerHTML = `
    <table class="table table-responsive">
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Position</td>
                <td>Promote</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody id="findUser">
               ${output}
            </tbody>
    </table>
    `;
	}

	static history(datas) {
		let output = '';

		for (let i = 0; i < datas.data.length; i++) {
			const info = datas.data[i];

			output += `
      <tr>
              <td data-label="Ordered date">${info.orderedDate}</td>
              <td data-label="Ordered Id">${info.id}</td>
              <td data-label="Food">${info.food.name}</td>
              <td data-label="Quantity">${info.quantity}</td>
              <td data-label="User Id"><a href="#">${info.userId}</a></td>
              <td data-label="Address">${info.address}</td>
              <td data-label="Phone number">+234${info.phone}</td>
              <td data-label="Price">₦${info.amount}</td>
              <td data-label="Status">
                <select name="" id="select-item">
                  <option value="new">new</option>
                  <option value="processing">processing</option>
                  <option value="completed">completed</option>
                </select>
              </td>
              <td data-label="Delete"><button>cancel</button></td>
      </tr>
      `;
		}

		logHistory.innerHTML = `
    <table class="table table-responsive">
          <thead>
            <tr>
              <th>Ordered date</th>
              <th>Order Id</th>
              <th>Food</th>
              <th>Quantity</th>
              <th>User Id</th>
              <th>Address</th>
              <th>Phone number</th>
              <th>Price</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            ${output}
          </tbody>
    </table>
    `;
	}
}

const upgradeUser = () => {
	fetch(`${url}user/${id}`, {
		method: 'PUT',
		headers: {
			Authorization: `${token}`
		}
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status === 200) {
				alert(data.message);
				window.location.reload('./admin.html');
			}
		})
		.catch((err) => console.error(err));
};

const deleteUser = () => {
	fetch(`${url}user/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `${token}`
		}
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status === 200) {
				alert(data.message);
				window.location.reload('./admin.html');
			}
		})
		.catch((err) => {
			console.error(err);
		});
};
const addNewFood = (e) => {
	e.preventDefault();
	if (addFoodName.value === '') {
		errorPost.innerHTML = 'Food name is not allowed to be empty';
		return;
	}
	if (addFoodPrice.value === '' || isNaN(addFoodPrice.value)) {
		errorPost.innerHTML = 'Food price must be a numeric value';
		return;
	}
	if (addFoodImage.value === '') {
		errorPost.innerHTML = 'Food image is not allowed to be empty';
		return;
	}
	postNewFood();
};

const saveEditedFood = () => {
	const editFoodName = document.querySelector('#editFoodName');
	const editFoodPrice = document.querySelector('#editFoodPrice');
	const editFoodImage = document.querySelector('#editFoodImage');
	const editErr = document.querySelector('#editErr');

	if (editFoodName.value === '') {
		editErr.innerHTML = 'Food name is not allowed to be empty';
		return;
	}

	if (editFoodPrice.value === '' || isNaN(addFoodPrice.value)) {
		editErr.innerHTML = 'Food price must be a numeric value';
		return;
	}

	if (editFoodImage.value === '') {
		editErr.innerHTML = 'Food image is not allowed to be empty';
		return;
	}

	const editFoodData = new FormData(document.forms.myEditForm);

	fetch(`${url}menu/${id}`, {
		method: 'PUT',
		headers: {
			Authorization: `${token}`
		},
		body: editFoodData
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status === 201) {
				alert(data.message);
				window.location.href = './admin.html';
			}
		});
};

const deleteFood = () => {
	fetch(`${url}menu/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status === 200) {
				window.location.replace('./admin.html');
			}
		});
};

const editFood = () => {
	fetch(`${url}menu/${id}`)
		.then((res) => res.json())
		.then((data) => {
			if (data.status === 200) {
				GenericDisplay.displayEditFood(data);
			}
		})
		.catch((err) => console.error(err));
};

// Load all food once logged in
const loadAllFood = () => {
	fetch(`${url}menu`, {
		headers: {
			Authorization: `${token}`
		}
	})
		.then((res) => res.json())
		.then((datas) => {
			if (datas.status === 200 && datas.data >= 1) {
				GenericDisplay.displayFoodList(datas);
			} else {
				document.querySelector('#noMenu').innerHTML = datas.message;
			}
		})
		.catch((err) => console.error(err));
};

// load all order history once logged in
const orderHistory = () => {
	fetch(`${url}order`, {
		headers: {
			Authorization: `${token}`
		}
	})
		.then((res) => res.json())
		.then((datas) => {
			if (datas.status === 200 || datas.data >= 1) {
				GenericDisplay.history(datas);
			} else {
				document.querySelector('#history').innerHTML = datas.message;
			}
		})
		.catch((err) => console.error(err));
};

// Load total sales
const totalPayment = () => {
	fetch(`${url}total`, {
		headers: {
			Authorization: `${token}`
		}
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status === 200) {
				totalSale.innerHTML = `₦${data.total}`;
			} else {
				totalSale.innerHTML = data.message;
			}
		})
		.catch((err) => console.error(err));
};

// load all user once logged in
const allUsers = () => {
	fetch(`${url}user`, {
		headers: {
			Authorization: `${token}`
		}
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status === 200) {
				GenericDisplay.displayAllUsers(data);
			}
		})
		.catch((err) => console.error(err));
};

const signOut = () => {
	fetch(`${url}auth/logout`, {
		method: 'GET',
		headers: {
			Authorization: `${token}`
		}
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status === 200) {
				if (typeof Storage !== 'undefined') {
					localStorage.setItem('token', `${data.token}`);
				}
				window.location.replace('./login.html');
			}
		})
		.catch((err) => console.error(err));
};

// Event functions
const editFoodModal = () => {
	modalbg2.style.display = 'block';
	editFood();
};

const openFoodModal = () => {
	modalbg.style.display = 'block';
};
const closeFoodModal = (e) => {
	if (e.target === modalbg || e.target === closeModal || e.target === closeModal2 || e.target === modalbg2) {
		modalbg.style.display = 'none';
		modalbg2.style.display = 'none';
	}
};

const controlSearch = () => {
	const val = searchUser.value.toUpperCase();
	const filter = findUser.querySelectorAll('tr');

	filter.forEach((i) => {
		if (i.children[0].innerText.toUpperCase().indexOf(val) !== -1) {
			i.style.display = '';
		} else {
			i.style.display = 'none';
		}
	});
};

// event delegation
const toggleDone = (e) => {
	if (e.target.matches('i.fa-trash-alt')) {
		id = e.target.getAttribute('data-id');
		deleteFood();
	}
	if (e.target.matches('i.fa-edit')) {
		id = e.target.getAttribute('data-id');
		editFoodModal();
	}
};
const toggleEdit = (e) => {
	if (e.target.matches('button.success')) {
		saveEditedFood();
	}

	if (e.target.matches('button.close')) {
		modalbg2.style.display = 'none';
	}
};
const toggleUser = (e) => {
	if (e.target.matches('i.fa-trash-alt')) {
		id = e.target.getAttribute('data-id');
		deleteUser();
	}
	if (e.target.matches('i.fa-upload')) {
		id = e.target.getAttribute('data-id');
		upgradeUser();
	}
};

// Generic Event listener
window.addEventListener('load', () => {
	loadAllFood();
	allUsers();
	orderHistory();
	totalPayment();
});

save.addEventListener('click', addNewFood);
foodMenu.addEventListener('click', toggleDone);
editFoodForm.addEventListener('click', toggleEdit);
logout.addEventListener('click', signOut);
userInfo.addEventListener('click', toggleUser);

addMenu.addEventListener('click', openFoodModal);
window.addEventListener('click', closeFoodModal);

searchUser.addEventListener('input', controlSearch);

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
