package tk.monkeycode.monkeyweather.userapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tk.monkeycode.monkeyweather.userapi.domain.User;
import tk.monkeycode.monkeyweather.userapi.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public List<String> obtenerNombresUsuario() {
		return userRepo.findAllUsersNames();
	}

	@Override
	public User buscarUsuarioPorNombre(String username) {
		return userRepo.findByUserName(username);
	}

	@Override
	public void guardarUsuario(User user) {
		userRepo.save(user);
	}

	@Override
	public void borrarUsuario(User user) {
		userRepo.delete(user);
	}
	
}
