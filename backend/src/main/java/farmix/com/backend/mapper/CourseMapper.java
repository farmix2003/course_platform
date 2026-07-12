package farmix.com.backend.mapper;

import farmix.com.backend.dto.course.CourseResponse;
import farmix.com.backend.entity.Course;

public class CourseMapper {

    public CourseResponse toResponse(Course course) {
        return new CourseResponse(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getImageUrl(),
                course.getPrice(),
                course.getCreatedAt()
        );
    }

}
