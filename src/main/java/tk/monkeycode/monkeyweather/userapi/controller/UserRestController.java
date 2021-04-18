package tk.monkeycode.monkeyweather.userapi.controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
	
	private final Logger logger = LoggerFactory.getLogger(UserRestController.class);	
	
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
	
	
	
	
	
	@GetMapping(value = "/user/{username}/image", produces = MediaType.IMAGE_PNG_VALUE)
	public ResponseEntity<byte[]> obtenerImagenUsuario(@PathVariable(name = "username") String username, HttpServletRequest request) throws IOException {
		User user = service.buscarUsuarioPorNombre(username);
		byte[] avatar = user.getAvatar();
		if (avatar == null) {
			ServletContext context = request.getServletContext();
			InputStream inputStream = context.getResourceAsStream("/static/img/unknown.jpg");
			avatar = IOUtils.toByteArray(inputStream);
		} 
		return new ResponseEntity<>(avatar, HttpStatus.OK);
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
