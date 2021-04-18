package tk.monkeycode.monkeyweather.userapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tk.monkeycode.monkeyweather.userapi.domain.Location;

public interface LocationRepository extends JpaRepository<Location, String> {

}
