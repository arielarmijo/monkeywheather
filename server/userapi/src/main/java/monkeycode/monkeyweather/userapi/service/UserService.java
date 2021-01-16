package monkeycode.monkeyweather.userapi.service;

import java.util.List;

import monkeycode.monkeyweather.userapi.domain.User;

public interface UserService {
	
	List<String> obtenerNombresUsuario();
	User buscarUsuarioPorNombre(String username);
	void guardarUsuario(User user);
	void borrarUsuario(User user);
}
