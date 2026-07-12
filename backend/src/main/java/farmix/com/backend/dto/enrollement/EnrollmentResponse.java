package farmix.com.backend.dto.enrollement;

import java.time.LocalDateTime;

public record EnrollmentResponse(

        Long id,

        Long courseId,

        String courseTitle,

        LocalDateTime enrolledAt

) {}