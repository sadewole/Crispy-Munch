document.querySelector('#opennav').addEventListener('click', () => {
	let li = document.querySelectorAll('.nav-item');
	li.forEach((ln) => {
		if (ln.className === 'nav-item') {
			ln.classList.add('responsive');
		} else {
			ln.classList.remove('responsive');
		}
	});
});
