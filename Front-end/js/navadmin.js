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
