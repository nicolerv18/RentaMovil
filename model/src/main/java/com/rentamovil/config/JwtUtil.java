package com.rentamovil.config;


import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Set;

/**
 * Utilidad para la generación y validación de tokens JWT.
 *
 * <p>Esta clase se encarga de:
 * <ul>
 *     <li>Generar tokens firmados con información del usuario</li>
 *     <li>Extraer datos del token (como el username)</li>
 *     <li>Validar la integridad y expiración del token</li>
 * </ul>
 *
 * <p>Usa la librería io.jsonwebtoken para la construcción y parsing del JWT.
 *
 * IMPORTANTE: En producción, la clave secreta no debe estar hardcodeada.
 * Debe almacenarse en variables de entorno o servicios seguros.
 */
@Component
public class JwtUtil {
    private static final String SECRET = "clave-super-secretatatata-rentamovil-3032-jwt";
    private static  final long EXPIRATION = 86400000L;

    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(String username, Set<String> roles) {
        return Jwts.builder()
                .subject(username)
                .claim("roles", roles)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key)
                .compact();
    }
    public String extracUsername(String token) {
        return Jwts.parser().verifyWith(key).build()
                .parseSignedClaims(token).getPayload().getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

}
