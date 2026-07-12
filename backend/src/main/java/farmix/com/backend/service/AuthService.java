package farmix.com.backend.service;

import farmix.com.backend.dto.auth.LoginRequest;
import farmix.com.backend.dto.auth.LoginResponse;
import farmix.com.backend.dto.auth.RegisterRequest;
import farmix.com.backend.dto.auth.RegisterResponse;
import farmix.com.backend.dto.user.UserResponse;
import farmix.com.backend.entity.User;
import farmix.com.backend.entity.UserRole;
import farmix.com.backend.exception.DuplicateResourceException;
import farmix.com.backend.repository.UserRepository;
import farmix.com.backend.security.JwtService;
import farmix.com.backend.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public RegisterResponse registerUser(RegisterRequest request){

        String email = request.email().trim().toLowerCase(Locale.ROOT);
        if(userRepository.findByEmail(email).isPresent()){
            throw new DuplicateResourceException(
                    "User already exists with email: " + email
            );
        }
        User user = User.builder()
                .firstName(request.firstName().trim())
                .lastName(request.lastName().trim())
                .email(email)
                .password(passwordEncoder.encode(request.password()))
                .userRole(UserRole.USER)
                .build();

        User savedUser = userRepository.save(user);

        String accessToken = jwtService.generateToken(new UserPrincipal(savedUser));

        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getFirstName(),
                savedUser.getLastName(),
                savedUser.getEmail(),
                savedUser.getUserRole(),
                accessToken
        );
    }

    @Transactional(readOnly = true)
    public LoginResponse loginUser(LoginRequest request) {

        String email = normalizeEmail(request.email());

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                email,
                                request.password()
                        )
                );

        UserPrincipal principal =
                (UserPrincipal) authentication.getPrincipal();

        assert principal != null;
        String accessToken = jwtService.generateToken(principal);

        UserResponse userResponse = new UserResponse(
                principal.getId(),
                principal.getFirstName(),
                principal.getLastName(),
                principal.getEmail(),
                principal.getRole()
        );

        return new LoginResponse(
                accessToken,
                "Bearer",
                userResponse
        );
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
