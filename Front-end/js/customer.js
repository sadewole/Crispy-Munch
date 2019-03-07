const search = document.querySelector('#search');
const tbody = document.querySelectorAll('#tbody tr');

const controlSearch = e => {
  const val = e.target.value.toUpperCase();

  tbody.forEach(i => {
    if (i.children[0].innerText.toUpperCase().indexOf(val) !== -1) {
      i.style.display = '';
    } else {
      i.style.display = 'none';
    }
  });
};
search.addEventListener('input', controlSearch);
