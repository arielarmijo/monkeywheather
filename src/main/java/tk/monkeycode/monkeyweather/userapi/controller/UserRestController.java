package tk.monkeycode.monkeyweather.userapi.controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import tk.monkeycode.monkeyweather.userapi.domain.User;
import tk.monkeycode.monkeyweather.userapi.exception.UserNotFoundException;
import tk.monkeycode.monkeyweather.userapi.service.UserService;

@RestController
@RequestMapping("/user-api")
public class UserRestController {
	
	
	@Autowired
	private UserService service;
	
	@GetMapping("/users")
	public List<String> mostrarUsuarios() {
		return service.obtenerNombresUsuario();
	}
	
	@GetMapping("/user/{username}")
	public User obtenerUsuario(@PathVariable String username) {
		User user = service.buscarUsuarioPorNombre(username);
		if (user == null) {
			user = new User();
			user.setUserName("NULL");
		}
		System.out.println(user);
		return user;
	}
	
	
	@GetMapping("/user/{username}/image")
	public void obtenerImagenUsuario(@PathVariable(name = "username") String username, HttpServletResponse response) {
		User user = service.buscarUsuarioPorNombre(username);
		byte[] avatar = user.getAvatar();
		response.setContentType("image/jpeg, image/jpg, image/png");
		try (OutputStream out = response.getOutputStream()) {
			out.write(avatar);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	@PostMapping("/user")
	public String agregarUsuario(@RequestParam String userName,
			 					@RequestParam String password,
			 					@RequestParam(required = false) String location,
								@RequestParam(required = false) MultipartFile image) {
		User user = new User();
		user.setUserName(userName);
		user.setPassword(password);
		if (!location.isEmpty()) {
			user.addLocation(location);
		}
		byte[] bytes;
		if (image != null) {
			try {
				bytes = image.getBytes();
				user.setAvatar(bytes);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			Resource resource = new ClassPathResource("resources/img/unknown.jpg");
			try (FileInputStream fis = new FileInputStream(resource.getFile())) {
				bytes = new byte[(int) resource.getFile().length()];
				fis.read(bytes);
				user.setAvatar(bytes);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		service.guardarUsuario(user);
		return "Usuario guardado con éxito";
	}
	
	
	@PutMapping("/user/{username}/{city}")
	public User agregarCiudad(@PathVariable String username, @PathVariable String city) {
		User usuario = service.buscarUsuarioPorNombre(username);
		usuario.addLocation(city);
		service.guardarUsuario(usuario);
		return usuario;
	}
	
	@DeleteMapping("/user/{username}")
	public String borrarUsuario(@PathVariable String username) {
		User user = service.buscarUsuarioPorNombre(username);
		if (user == null) {
			throw new UserNotFoundException(username);
		}
		service.borrarUsuario(user);
		return "Usuario " +  username + " eliminado.";
	}
	
	@DeleteMapping("/user/{username}/{city}")
	public User borrarCiudadUsuario(@PathVariable String username, @PathVariable String city) {
		User usuario = service.buscarUsuarioPorNombre(username);
		usuario.removeLocation(city);
		service.guardarUsuario(usuario);
		return usuario;
	}
	
}