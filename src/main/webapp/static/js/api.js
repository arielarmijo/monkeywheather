const deploy = true;
const prod_host = 'http://152.67.40.135:8080';
const dev_host = 'http://localhost:8080';
const endpoint = 'monkeyweather/user-api';
const url = (deploy) ? `${prod_host}/${endpoint}` : `${dev_host}/${endpoint}`;
export const api = {
	key: '72216e8ac7dc0f927f7aa3d9b2af7c3f',
	weather: 'http://api.openweathermap.org/data/2.5',
	user: url
};
