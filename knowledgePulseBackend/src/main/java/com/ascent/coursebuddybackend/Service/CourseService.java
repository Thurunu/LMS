package com.ascent.coursebuddybackend.Service;

import com.ascent.coursebuddybackend.entity.Course;
import com.ascent.coursebuddybackend.entity.ResourceNotFoundException;
import com.ascent.coursebuddybackend.entity.Student;
import com.ascent.coursebuddybackend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@Transactional
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {

        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
    }

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course courseDetails) {
        Course course = getCourseById(id);

        course.setCourseCode(courseDetails.getCourseCode());
        course.setCourseName(courseDetails.getCourseName());
        course.setDescription(courseDetails.getDescription());
        course.setCredits(courseDetails.getCredits());
        course.setInstructor(courseDetails.getInstructor());

        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        Course course = getCourseById(id);
        courseRepository.delete(course);
    }

    public Set<Student> getCourseStudents(Long courseId) {
        Course course = getCourseById(courseId);
        return course.getStudents();
    }
}
