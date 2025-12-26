package org.example.filmfetcher.Exceptions;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.example.filmfetcher.dto.ApiErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({AuthExceptions.DuplicateUsername.class, AuthExceptions.DuplicateEmail.class})
    public ResponseEntity<ApiErrorResponse> handleConflicts(RuntimeException ex, HttpServletRequest request) {
        String formattedMessage = "Error: " + ex.getMessage();
        return buildResponse(
                HttpStatus.CONFLICT,
                formattedMessage,
                request,
                null
        );
    }

    // Handle Unauthorized (401)
    @ExceptionHandler(AuthExceptions.InvalidCredentials.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidCredentials(AuthExceptions.InvalidCredentials ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.UNAUTHORIZED, ex.getMessage(), request, null);
    }

    // Handle Validation Errors (400)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err ->
                errors.put(err.getField(), err.getDefaultMessage()));

        return buildResponse(HttpStatus.BAD_REQUEST, "Validation failed", request, errors);
    }

    // Handle Wrong HTTP Method (405)
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiErrorResponse> handleMethodNotSupported(
            HttpRequestMethodNotSupportedException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.METHOD_NOT_ALLOWED, "Method " + ex.getMethod() + " not supported.", request, null);
    }

    // Handle 404 Not Found
    @ExceptionHandler(FavoriteExceptions.ResourceNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleNotFound(FavoriteExceptions.ResourceNotFoundException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.NOT_FOUND, "Error: " + ex.getMessage(), request, null);
    }

    // Handle 401 Unauthorized (for JWT issues)
    @ExceptionHandler(FavoriteExceptions.InvalidTokenException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidToken(FavoriteExceptions.InvalidTokenException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.UNAUTHORIZED, "Error: " + ex.getMessage(), request, null);
    }
    // The Safety Net (500)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGeneralException(Exception ex, HttpServletRequest request) {
        log.error("CRITICAL ERROR: ", ex); // We log full trace ONLY for 500 errors
        return buildResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "An unexpected error occurred. Please try again later.",
                request,
                null
        );
    }

    private ResponseEntity<ApiErrorResponse> buildResponse(
            HttpStatus status,
            String message,
            HttpServletRequest request,
            Map<String, String> validationErrors
    ) {
        ApiErrorResponse response = new ApiErrorResponse(
                LocalDateTime.now(), status.value(), status.getReasonPhrase(), message, request.getRequestURI(), validationErrors
        );
        return new ResponseEntity<>(response, status);
    }
}