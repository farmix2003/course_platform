package farmix.com.backend.dto.course;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CourseResponse(
        Long id,

        String title,

        String description,

        String imageUrl,

        BigDecimal price,

        LocalDateTime createdAt
) {
}
