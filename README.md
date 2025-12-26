# 🎥 FilmFetcher

A modern, full-stack movie discovery and management application built with **Spring Boot 3** and **Angular 19**. FilmFetcher provides a seamless experience for browsing trending movies and maintaining a personalized "favorites" list, secured by **Auth0** enterprise-grade authentication.

---

## 🚀 Key Features

- **Enterprise Authentication:** Managed login and registration flows powered by **Auth0**.
- **Secure Identity:** Uses OAuth2 and OpenID Connect (OIDC) standards for user identity.
- **Movie Discovery:** Real-time data fetching from TMDB for trending and top-rated films.
- **Personalized Favorites:** Toggle movies in/out of your collection with instant UI feedback.
- **Modern Control Flow:** Utilizes Angular 19's `@if` and `@for` for high-performance rendering.
- **Robust API Security:** Spring Boot backend validates Auth0-issued JWTs to protect user data.
- **Professional Notifications:** Integrated **SweetAlert2** for toasts and interactive alerts.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Angular 19 (Standalone Components)
- **Identity Provider:** Auth0 SDK for Angular
- **State Management:** RxJS (Observables & `forkJoin`)
- **Feedback:** SweetAlert2

### Backend
- **Framework:** Spring Boot 3.x (Java 21)
- **Security:** Spring Security (OAuth2 Resource Server)
- **Data:** Spring Data JPA (Hibernate)
- **Architecture:** DTO Pattern using **Java Records**

---

## 🔐 Authentication Flow



1. **Frontend:** User clicks "Login" and is redirected to the Auth0 Universal Login page.
2. **Auth0:** After successful login, Auth0 redirects the user back to the Angular app with an **Access Token**.
3. **API Calls:** Angular attaches this token to the `Authorization` header.
4. **Backend:** Spring Boot validates the token against Auth0’s public keys (JWKS) before processing requests.

---

## 📂 Project Structure

### Backend Architecture
- **Controllers:** REST endpoints protected by Auth0 scope checks.
- **Security Config:** Configured as an **OAuth2 Resource Server** to validate JWTs from your Auth0 domain.
- **Entities:** JPA models for `UserEntity` (linked by Auth0 `sub` ID) and `FavoriteMovie`.
- **DTOs:** Immutable Java Records for clean data transfer.
- **Exceptions:** GlobalExceptionHandler for mapping custom domain exceptions.

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- **Java 21** or higher
- **Node.js** (LTS version)
- **Auth0 Account:** A created "Single Page Application" (for Angular) and "API" (for Spring Boot).
- **TMDB API Key** (Free from [themoviedb.org](https://www.themoviedb.org/))

### 2. Backend Setup
1. Open `src/main/resources/application.properties`.
2. Configure your Auth0 audience and issuer:
   ```properties
   spring.security.oauth2.resourceserver.jwt.issuer-uri=https://YOUR_[DOMAIN.auth0.com/](https://DOMAIN.auth0.com/)
   spring.security.oauth2.resourceserver.jwt.audiences=YOUR_API_IDENTIFIER
