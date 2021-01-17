# MonkeyWeather

### Descripción
Aplicación web que permite visualizar la información metereológica de una ciudad determinada.
Como plataforma se utilizan dos máquinas virtuales de Oracle Cloud. Una destinada a correr la base de datos relacional (Oracle XE) y otra dedicada a correr los servidores Tomcat y Jenkins. El servidor Jenkins automatiza la compilación y despliegue de la aplicación al realizarse un push en el repositorio. El servidor tomcat aloja la página cliente y al servidor. El cliente está escrito en html, css y java script. El servidor está escrito usando Spring MVC y Spring Data JPA. El código fuente del servidor está localizado en la rama backend.


### Objetivos
- Proporcionar datos metereológicos actuales y futuros de una determinada ciudad utilizando la API de [OpenWeather](https://openweathermap.org/current).
- Graficar datos metereológicos usando la librería [Plotly](https://plotly.com/javascript/).
- Implementar API Rest que ofrezca información de los usuarios registrados en la aplicación usando Spring Framework.

### Sitio web
[Monkey Weather App](http://monkeycode.tk/monkeyweather/)

### Servidor API Rest
[Monkey Weather User API](http://monkeycode.tk/monkeyweather-userapi/)