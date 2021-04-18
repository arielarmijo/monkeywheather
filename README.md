# MonkeyWeather

Para viajar es fundamental conocer las condiciones meteorológicas del lugar de destino. MonkeyWeather facilita esta información a través de una interfaz sencilla e intuitiva. Ofrece además la posibilidad de registrar las preferencias del usuario.

### Descripción
Aplicación web que permite visualizar la información metereológica de una ciudad determinada.
Como plataforma se utilizan dos máquinas virtuales de Oracle Cloud. Una destinada a correr la base de datos relacional (Oracle XE) y otra dedicada a correr los servidores Tomcat y Jenkins. El servidor Jenkins automatiza la compilación y despliegue de la aplicación al realizarse un push en el repositorio. El servidor tomcat aloja la página cliente y al servidor. El cliente está escrito en html, css y java script. El servidor está escrito usando Spring MVC y Spring Data JPA. El código fuente del servidor está localizado en la rama backend.


### Objetivos
- Proporcionar datos metereológicos actuales y futuros de una determinada ciudad utilizando la API de [OpenWeather](https://openweathermap.org/current).
- Graficar datos metereológicos usando la librería [Plotly](https://plotly.com/javascript/).
- Implementar API Rest que ofrezca información de los usuarios registrados en la aplicación usando Spring Framework.

### Sitio web
[Monkey Weather App](http://152.67.40.135:8080/monkeyweather/)

### Servidor API Rest
[Monkey Weather User API](http://152.67.40.135:8080/monkeyweather/user-api)
