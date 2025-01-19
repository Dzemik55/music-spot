package com.spotifyapi.musicspot.exceptions;

import lombok.Getter;

public class InvalidCredentialsException extends RuntimeException {

    private String errorCode;
    @Getter
    private String message;

    public InvalidCredentialsException(String message) {
        super(message);
        this.message = message;
    }

    public String getErrorCode() {
        return "INVALID_CREDENTIALS";
    }

}