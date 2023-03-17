const api = {
	key: '9ff69c8cdd52144e87330ef32cec698c',
	base: 'http://api.openweathermap.org/data/2.5/',
};
const searchINPUT = document.querySelector('.search');
const submitBTN = document.querySelector('.btn');
const error = document.querySelector('.error');

// Display date
const curDate = new Date();
const date = document.querySelector('.date');
let options = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
};
const now = curDate.toLocaleString('en', options);
date.innerText = now;
//____________

function getInput(e) {
	e.preventDefault();
	if (!searchINPUT.value) {
		searchINPUT.placeholder = 'Введіть назву міста';

		return;
	}
	if (e.type == 'click') {
		getData(searchINPUT.value);
	}
}

function getData() {
	fetch(
		`${api.base}weather?q=${searchINPUT.value}&units=metric&appid=${api.key}`
	)
		.then((response) => response.json())
		.then(displayData);
}

function displayData(response) {
	if (response.cod === '404') {
		error.textContent = 'Enter the real name of the city';
		searchINPUT.value = '';
	} else {
		console.log(response);
		const city = document.querySelector('.city');
		city.innerText = `${response.name}, ${response.sys.country}`;
		error.textContent = '';
		const temperature = document.querySelector('.temp__property');
		temperature.innerHTML = `${response.main.temp} &deg;C`;
		const weather = document.querySelector('.weather__property');
		weather.innerText = `${response.weather[0].main}`;
		const tempRange = document.querySelector('.temp-range__property');
		if (response.main.temp_min == response.main.temp_max) {
			tempRange.innerHTML = `${Math.round(
			response.main.temp_min)}&deg;C`
		} else {
			tempRange.innerHTML = `${Math.floor(
				response.main.temp_min
			)}&deg;C - ${Math.round(response.main.temp_max)}&deg;C`;
		}
		
		const feels = document.querySelector('.feels__property');
		feels.innerHTML = `${response.main.feels_like}&deg;C`;
		const wind = document.querySelector('.wind__property');
		wind.innerHTML = `${response.wind.speed} m/s`;
	}
}

submitBTN.addEventListener('click', getInput);
