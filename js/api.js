let deploy = true;
let url;

if (deploy) {
    url = 'http://152.67.40.135:8080/monkeyweather/user-api';
} else {
    url = 'http://localhost:8080/monkeyweather/user-api';
}

export const api = {};
api.user = url;
api.key = '72216e8ac7dc0f927f7aa3d9b2af7c3f';
api.weather = 'http://api.openweathermap.org/data/2.5';