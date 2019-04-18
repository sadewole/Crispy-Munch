const foodMenu = document.querySelector('.food-menu');
const logout = document.querySelector('#logout');
const url = 'http://localhost:3000/api/v1/';

let token = null;
let id = null;

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
				if (data.status !== 200) {
					window.location.replace('./login.html');
				}
				if (data.status === 200 && data.data.role === 'Admin') {
					window.location.replace('./admin.html');
				}
			});
	} else {
		window.location.replace('./login.html');
	}
});

class GenericMenu {
	static availableFood(datas) {
		let output = '';

		for (let i = 0; i < datas.data.length; i++) {
			const info = datas.data[i];

			output += `<div class="card">
      <div class="card-img-top">
          <img src="${info.image}" alt="${info.name}">
      </div>
      <div class="card-img-body">
          <p>${info.name}</p>
          <p>₦${info.price}</p>
      </div>
      <span><i class="fas fa-cart-plus fa-2x" data-id="${info.id}"></i></span>
  </div>`;
		}

		foodMenu.innerHTML = output;
	}
}

const postFood = (id) => {
	fetch(`${url}order`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/plain, */*',
			Authorization: `${token}`
		},
		body: JSON.stringify({
			menuId: id,
			quantity: 1
		})
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status === 200) {
				alert(data.message);
			}
		})
		.catch((err) => {
			console.error(err);
		});
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
const loadAllFood = () => {
	fetch(`${url}menu`, {
		headers: {
			Authorization: `${token}`
		}
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status === 200 || data.data >= 1) {
				GenericMenu.availableFood(data);
			} else {
				document.querySelector('#noMenu').innerHTML = data.message;
			}
		})
		.catch((err) => {
			console.error(err);
		});
};

const toggleAddFood = (e) => {
	if (e.target.matches('i.fa-cart-plus')) {
		id = e.target.getAttribute('data-id');
		postFood(id);
	}
};

// Event listener
window.addEventListener('load', loadAllFood);
logout.addEventListener('click', signOut);
foodMenu.addEventListener('click', toggleAddFood);
