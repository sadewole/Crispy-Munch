const menu = document.querySelector('#menu');
const customer = document.querySelector('#customer');
const order = document.querySelector('#order');
const menuNap = document.querySelector('#menuNap');
const customerNap = document.querySelector('#customerNap');
const orderNap = document.querySelector('#orderNap');
const addMenu = document.querySelector('.add-menu');
const modalbg = document.querySelector('.modalbg');
const modalbg2 = document.querySelector('.modalbg2');
const searchUser = document.querySelector('#searchUser');
const findUser = document.querySelectorAll('#findUser tr');
const foodMenu = document.querySelector('.foodMenu');
const closeModal = document.querySelector('#cancel');
const closeModal2 = document.querySelector('#cancel2');

const addFoodName = document.querySelector('#addFoodName');
const addFoodPrice = document.querySelector('#addFoodPrice');
const addFoodImage = document.querySelector('#addFoodImage');
const editFoodForm = document.querySelector('#editFoodForm');
const save = document.querySelector('#save');
const errorPost = document.querySelector('#errorPost');
// const url = 'http://localhost:3000/api/v1/';
let id = null;

const clearError = () => {
  errorPost.innerText = '';
};
addFoodName.addEventListener('input', clearError);
addFoodPrice.addEventListener('input', clearError);
addFoodImage.addEventListener('input', clearError);

// Query fetch

const postNewFood = () => {
  const formData = new FormData(document.forms.myForm);

  fetch(`${url}menu`, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(datas => {
      if (datas.status === 201) {
        alert(datas.message);
        window.location.href = './admin.html';
      }
    })
    .catch(err => console.error(err));
};

class GenericDisplay {
  static displayFoodList(datas) {
    let output = '';

    for (let i = 0; i < datas.data.length; i++) {
      const info = datas.data[i];

      output += `<tr>
      <td><img src="${info.image}" alt=""></td>
      <td>${info.name}</td>
      <td>${info.price}</td>
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
        <input type="text" class="form-control" name="price" id="editFoodPrice" value="${
          info.price
        }">
      </div>
      <div class="form-group">
        <label>Image:</label>
        <input type="file" class="form-control" name="image" id="editFoodImage" value="${
          info.image
        }">
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
	  <td>${info.name}</td>
	  <td>${info.role}</td>
	  <td class="promote"><i class="fas fa-upload"></i></td>
	  <td class="delete"><i class="far fa-trash-alt"></i></td>
	</tr>`;
    }

    foodMenu.innerHTML = `
    <table class="table table-responsive">
            <thead>
              <tr>
                <td>Name</td>
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
}
const addNewFood = e => {
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
    body: editFoodData
  })
    .then(res => res.json())
    .then(data => {
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
    .then(res => res.json())
    .then(data => {
      if (data.status === 200) {
        window.location.replace('./admin.html');
      }
    });
};

const editFood = () => {
  fetch(`${url}menu/${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.status === 200) {
        GenericDisplay.displayEditFood(data);
      }
    })
    .catch(err => console.error(err));
};

// Load all food once login
const loadAllFood = () => {
  fetch(`${url}menu`)
    .then(res => res.json())
    .then(datas => {
      if (datas.status === 200 || datas.data >= 1) {
        GenericDisplay.displayFoodList(datas);
      } else {
        document.querySelector('#noMenu').innerHTML = datas.message;
      }
    })
    .catch(err => console.error(err));
};

// Event functions
const editFoodModal = () => {
  modalbg2.style.display = 'block';
  editFood();
};

const openFoodModal = () => {
  modalbg.style.display = 'block';
};
const closeFoodModal = e => {
  if (
    e.target === modalbg ||
    e.target === closeModal ||
    e.target === closeModal2 ||
    e.target === modalbg2
  ) {
    modalbg.style.display = 'none';
    modalbg2.style.display = 'none';
  }
};

// event delegation
const toggleDone = e => {
  if (e.target.matches('i.fa-trash-alt')) {
    id = e.target.getAttribute('data-id');
    deleteFood();
  }
  if (e.target.matches('i.fa-edit')) {
    id = e.target.getAttribute('data-id');
    editFoodModal();
  }
};
const toggleEdit = e => {
  if (e.target.matches('button.success')) {
    saveEditedFood();
  }

  if (e.target.matches('button.close')) {
    modalbg2.style.display = 'none';
  }
};

// Generic Event listener
window.addEventListener('load', loadAllFood);
save.addEventListener('click', addNewFood);
foodMenu.addEventListener('click', toggleDone);
editFoodForm.addEventListener('click', toggleEdit);

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
