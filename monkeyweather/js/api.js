let deploy = true;
let dev_host = 'http://localhost:8080';
let prod_host = 'http://152.67.40.135:8080';
let endpoint = 'monkeyweather/user-api';
let url;

if (deploy) {
    url = `${prod_host}/${endpoint}`;
} else {
    url = `${dev_host}/${endpoint}`;
}

export const api = {};
api.user = url;
api.key = '72216e8ac7dc0f927f7aa3d9b2af7c3f';
api.weather = 'http://api.openweathermap.org/data/2.5';