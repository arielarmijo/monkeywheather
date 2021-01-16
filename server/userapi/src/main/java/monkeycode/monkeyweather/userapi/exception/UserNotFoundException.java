package monkeycode.monkeyweather.userapi.exception;

public class UserNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public UserNotFoundException() {
		
	}
	
	public UserNotFoundException(String username) {
		super("Usuario " + username + " no exite.");
	}

}
