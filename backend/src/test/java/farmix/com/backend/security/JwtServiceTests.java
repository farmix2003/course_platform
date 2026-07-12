package farmix.com.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;

class JwtServiceTests {

    @Test
    void generatesAndValidatesTokenWithBase64UrlSecret() {
        JwtService jwtService = new JwtService();
        ReflectionTestUtils.setField(
                jwtService,
                "secret",
                "MDEyMzQ1Njc4OWFiY2RlZjAxMjM0NTY3ODlhYmNkZWY_"
        );
        ReflectionTestUtils.setField(jwtService, "accessTokenExpirationMs", 60_000L);

        UserDetails user = User.withUsername("user@example.com")
                .password("unused")
                .authorities("ROLE_USER")
                .build();

        String token = jwtService.generateToken(user);

        assertThat(jwtService.extractEmail(token)).isEqualTo(user.getUsername());
        assertThat(jwtService.isTokenValid(token, user)).isTrue();
    }
}
