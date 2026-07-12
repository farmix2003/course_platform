package farmix.com.backend.dto.auth;

import farmix.com.backend.entity.UserRole;

public record RegisterResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        UserRole role,
        String accessToken
) {
}
