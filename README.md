# MonkeyWeather

### Descripción
Aplicación web que permite visualizar la información metereológica de una ciudad determinada.
Como plataforma se utilizan dos máquinas virtuales de Oracle Cloud. Una destinada a correr la base de datos (Oracle XE) y otra dedicada a correr los servidores Tomcat y Jenkins. El servidor Jenkins automatiza la compilación y despliegue de la aplicación al realizarse un push en el repositorio. El servidor tomcat aloja la página cliente y al servidor. El cliente está escrito en html, css y java script. El servidor está escrito usando Spring MVC y Spring Data JPA.


### Objetivos
- Proporcionar datos metereológicos actuales e futuros de una determinada ciudad utilizando API de terceros.
- Graficar datos metereológicos usando librería java script externa.
- Implementar API Rest con datos de los usuarios de la aplicación.

### Sitio web
[Monkey Weather App](http://monkeycode.tk/monkeyweather/)

### Servidor API Rest
[Monkey Weather User API](http://monkeycode.tk/monkeyweather-userapi/)