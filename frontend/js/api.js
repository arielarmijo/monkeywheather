let debug = false;
let url;

if (debug) {
    url = 'http://localhost:8080/monkeyweather';
} else {
    url = 'http://monkeycode.tk/monkeyweather-userapi';
}

export const api = {};
api.user = url;
api.key = '72216e8ac7dc0f927f7aa3d9b2af7c3f';
api.weather = 'http://api.openweathermap.org/data/2.5';