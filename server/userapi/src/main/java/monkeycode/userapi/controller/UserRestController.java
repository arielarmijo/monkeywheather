package monkeycode.userapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import monkeycode.userapi.domain.User;
import monkeycode.userapi.exception.UserNotFoundException;
import monkeycode.userapi.service.UserService;

@RestController
@RequestMapping("/")
public class UserRestController {

	@Autowired
	private UserService service;
	
	@GetMapping("/users")
	public List<String> mostrarConsumidores() {
		return service.obtenerNombresUsuario();
	}
	
	@GetMapping("/user/{username}")
	public User obtenerConsumidor(@PathVariable(name = "username") String username) {
		User user = service.buscarUsuarioPorNombre(username);
		if (user == null) {
			throw new UserNotFoundException(username);
		}
		return user;
	}
	
	@PostMapping("/user")
	public String agregarConsumidor(@RequestBody User user) {
		service.guardarUsuario(user);
		return "Usuario guardado con éxito";
	}
	
	@PutMapping("/user")
	public String actualizarConsumidor(@RequestBody User nvoUser) {
		service.guardarUsuario(nvoUser);
		return "Usuario actualizado con éxito.";
	}
	
	@DeleteMapping("/user/{username}")
	public String borrarCliente(@PathVariable String username) {
		User user = service.buscarUsuarioPorNombre(username);
		if (user == null) {
			throw new UserNotFoundException(username);
		}
		service.borrarUsuario(user);
		return "Usuario " +  username + " eliminado.";
	}
	
}
