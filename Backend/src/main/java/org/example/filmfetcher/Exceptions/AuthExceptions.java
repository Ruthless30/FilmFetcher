package org.example.filmfetcher.Exceptions;

public class AuthExceptions {

    public static class DuplicateEmail extends RuntimeException{
        public DuplicateEmail(String message){
            super(message);
        }
    }

    public static class DuplicateUsername extends RuntimeException {
        public DuplicateUsername(String message) {
            super(message);
        }
    }

    public static class InvalidCredentials extends RuntimeException{
        public InvalidCredentials(String message){
            super(message);
        }
    }

}
