package farmix.com.backend.dto.course;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record CourseRequest(
        @NotBlank
        String title,

        String description,

        String imageUrl,

        @PositiveOrZero
        BigDecimal price

) {
}
