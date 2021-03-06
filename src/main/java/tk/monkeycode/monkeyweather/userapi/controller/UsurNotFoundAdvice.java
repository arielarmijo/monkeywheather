package tk.monkeycode.monkeyweather.userapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import tk.monkeycode.monkeyweather.userapi.exception.UserNotFoundException;

@ControllerAdvice
public class UsurNotFoundAdvice {

	@ResponseBody
	@ExceptionHandler(UserNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public String userNotFoundHandler(UserNotFoundException e) {
		return e.getMessage();
	}
	
}
