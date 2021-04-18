package tk.monkeycode.monkeyweather.userapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tk.monkeycode.monkeyweather.userapi.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	
	@Query("Select u.userName from User u")
	List<String> findAllUsersNames();
	User findByUserName(String username);

}
