// add modal function
const modalbg = document.querySelector('.modalbg');

const addMenu = () => {
	modalbg.style.display = 'block';
	document.querySelector('.addModal').style.marginTop = '0px';
};

const editMenu = () => {
	const edit = document.querySelectorAll('.edit');
	edit.forEach((i) => {
		i.addEventListener('click', () => {
			modalbg.style.display = 'block';
			document.querySelector('.addModal').style.marginTop = '0px';
		});
	});
};

const exitModal = (e) => {
	if (e.target == modalbg) {
		modalbg.style.display = 'none';
	}
};

const close = () => {
	let close = document.querySelectorAll('.close');

	close.forEach((i) => {
		i.addEventListener('click', () => {
			modalbg.style.display = 'none';
		});
	});
};

const Modal = () => {
	window.addEventListener('click', exitModal);
	document.querySelector('.add-menu').addEventListener('click', addMenu);
	editMenu();
	close();
};

Modal();

// end
