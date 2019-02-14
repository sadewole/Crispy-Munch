// navbar functions
const navPill = document.querySelector('.nav-pills');
const modal = document.querySelector('.modal');
const navFlex = document.querySelector('.nav-flex');

const openNav = () => {
	if (window.innerWidth <= 768) {
		navPill.style.left = '0';
		navFlex.style.opacity = 0;
		modal.style.display = 'block';
	} else {
		navFlex.style.opacity = 1;
		navPill.style.left = '0';
	}
};

const closeNav = (e) => {
	if (e.target == modal) {
		navPill.style.left = '-1000px';
		navFlex.style.opacity = 1;
	}
};

const start = () => {
	window.addEventListener('click', closeNav);
	document.querySelector('#opennav').addEventListener('click', openNav);
};
start();

// end

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
