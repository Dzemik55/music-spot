package com.spotifyapi.musicspot.exceptions;

import lombok.Getter;

public class UserNotFoundException extends RuntimeException {

    private String errorCode;
    @Getter
    private String message;

    public UserNotFoundException(String message) {
        super(message);
        this.message = message;
    }

    public String getErrorCode() {
        return "USER_NOT_FOUND";
    }

}