<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Inicio</title>
</head>
<body>
	<h1>API Usuarios MonkeyWeather App</h1>
	<table>
		<thead>
			<tr>
				<th>Acción</th>
				<th>End Point</th>
				<th>Method</th>
			</tr>

		</thead>
		<tbody>
			<tr>
				<td>Obtener nombres de usuarios</td>
				<td>/users</td>
				<td>GET</td>
			</tr>
			<tr>
				<td>Obtener datos de usuario</td>
				<td>/user/{username}</td>
				<td>GET</td>
			</tr>
			<tr>
				<td>Obtener imagen de usuario</td>
				<td>/user/{username}/image</td>
				<td>GET</td>
			</tr>
			 <tr>
				<td>Crear usuario</td>
				<td>/user/</td>
				<td>POST</td>
			</tr>
			<tr>
				<td>Agregar ciudad a usuario</td>
				<td>/user/{username}/{city}</td>
				<td>PUT</td>
			</tr>
			<tr>
				<td>Borrar usuario</td>
				<td>/user/</td>
				<td>DELETE</td>
			</tr>
		</tbody>
	</table>
</body>
</html>