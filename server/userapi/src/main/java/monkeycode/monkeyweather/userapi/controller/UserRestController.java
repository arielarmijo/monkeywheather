package monkeycode.monkeyweather.userapi.controller;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
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

import monkeycode.monkeyweather.userapi.domain.User;
import monkeycode.monkeyweather.userapi.exception.UserNotFoundException;
import monkeycode.monkeyweather.userapi.service.UserService;

@RestController
@RequestMapping("/")
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
			if (avatar == null) {
				Resource resource = new ClassPathResource("resources/img/unknown.jpg");
				int bufferSize = 1024*10; // 10 KB
				try (InputStream in = new BufferedInputStream(new FileInputStream(resource.getFile()))) {
						byte[] buffer = new byte[bufferSize];
						int bytesReaded;
						while ((bytesReaded = in.read(buffer)) > 0) {
							out.write(buffer, 0, bytesReaded);
							out.flush();
						}
					}
			} else {
				out.write(avatar);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
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
		if (image != null) {
			try {
				byte[] bytes = image.getBytes();
				user.setAvatar(bytes);
			} catch (IOException e) {
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
	
}
