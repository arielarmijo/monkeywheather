package monkeycode.monkeyweather.userapi.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")
public class User {

	@Id
	@Column(name = "user_name")
	private String userName;

	@Column(name = "password")
	private String password;

	@Lob
	@JsonIgnore
	@Column(name = "avatar")
	private byte[] avatar;

	@ManyToMany(fetch = FetchType.EAGER,
				cascade = { CascadeType.DETACH,
							CascadeType.PERSIST,
							CascadeType.MERGE,
							CascadeType.REFRESH })
	@JoinTable(name = "rel_users_locations",
			   joinColumns = @JoinColumn(name = "user_fk"),
			   inverseJoinColumns = @JoinColumn(name = "location_fk"))
	private Set<Location> locations;

	public User() {
	}

	public void addLocation(String city) {
		if (locations == null) {
			locations = new HashSet<Location>();
		}
		locations.add(new Location(city));
	}
	

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public byte[] getAvatar() {
		return avatar;
	}

	public void setAvatar(byte[] avatar) {
		this.avatar = avatar;
	}
	
	public Set<Location> getLocations() {
		return locations;
	}

	public void setLocations(Set<Location> locations) {
		this.locations = locations;
	}


	@Override
	public String toString() {
		return "User [userName=" + userName + ", password=" + password + "]";
	}

}
