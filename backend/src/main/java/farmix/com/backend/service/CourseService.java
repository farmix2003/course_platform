package farmix.com.backend.service;

import farmix.com.backend.dto.course.CourseRequest;
import farmix.com.backend.dto.course.CourseResponse;
import farmix.com.backend.entity.Course;
import farmix.com.backend.exception.ResourceNotFoundException;
import farmix.com.backend.mapper.CourseMapper;
import farmix.com.backend.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseMapper mapper;
    private final TelegramService telegramService;

    @Transactional(readOnly = true)
    public List<CourseResponse> findAllCourses() {
        return courseRepository.findAll()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public CourseResponse findCourseById(Long id) {
        Course course = findById(id);
        return mapper.toResponse(course);
    }

    @Transactional
    public CourseResponse createCourse(CourseRequest request) {
        Course course = Course.builder()
                .title(request.title())
                .description(request.description())
                .imageUrl(request.imageUrl())
                .price(request.price())
                .build();

        Course savedCourse = courseRepository.save(course);

        telegramService.sendMessage("""
            📚 New course created

            ID: %d
            Title: %s
            Price: %s
            """.formatted(
                savedCourse.getId(),
                savedCourse.getTitle(),
                savedCourse.getPrice()
        ));

        return mapper.toResponse(savedCourse);
    }

    @Transactional
    public CourseResponse updateCourse(
            Long id,
            CourseRequest request
    ) {
        Course course = findById(id);

        course.setTitle(request.title());
        course.setDescription(request.description());
        course.setImageUrl(request.imageUrl());
        course.setPrice(request.price());

        Course updatedCourse = courseRepository.save(course);

        return mapper.toResponse(updatedCourse);
    }

    @Transactional
    public void deleteCourse(Long id) {
        Course course = findById(id);
        courseRepository.delete(course);
    }

    private Course findById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Course not found with id: " + id
                        )
                );
    }
}