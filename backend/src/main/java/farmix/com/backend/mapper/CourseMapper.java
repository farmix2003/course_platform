package farmix.com.backend.mapper;

import farmix.com.backend.dto.course.CourseRequest;
import farmix.com.backend.dto.course.CourseResponse;
import farmix.com.backend.entity.Course;
import org.springframework.stereotype.Component;

@Component
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

    public Course toEntity(CourseRequest request) {
        return Course.builder()
                .title(request.title())
                .description(request.description())
                .imageUrl(request.imageUrl())
                .price(request.price())
                .build();
    }

    public void updateEntity(
            CourseRequest request,
            Course course
    ) {
        course.setTitle(request.title());
        course.setDescription(request.description());
        course.setImageUrl(request.imageUrl());
        course.setPrice(request.price());
    }
}