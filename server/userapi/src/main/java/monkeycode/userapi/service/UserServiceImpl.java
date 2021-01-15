package monkeycode.userapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import monkeycode.userapi.domain.User;
import monkeycode.userapi.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	
	@Autowired
	private UserRepository repo;
	
	@Override
	public List<String> obtenerNombresUsuario() {
		return repo.findAllUsersNames();
	}

	@Override
	public User buscarUsuarioPorNombre(String username) {
		//return repo.findById(username).orElse(null);
		return repo.findByUserName(username);
	}

	@Override
	public void guardarUsuario(User user) {
		repo.save(user);
	}

	@Override
	public void borrarUsuario(User user) {
		repo.delete(user);
	}
	
}
