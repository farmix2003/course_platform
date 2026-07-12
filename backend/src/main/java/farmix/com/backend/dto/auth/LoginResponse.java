package farmix.com.backend.dto.auth;

import farmix.com.backend.dto.user.UserResponse;

public record LoginResponse(
        String token,
        String type,
        UserResponse user
) {
}
