package monkeycode.monkeyweather.userapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import monkeycode.monkeyweather.userapi.domain.Location;

public interface LocationRepository extends JpaRepository<Location, String> {

}
