package farmix.com.backend.dto.user;

import farmix.com.backend.entity.UserRole;

public record UserResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        UserRole role
) {
}
