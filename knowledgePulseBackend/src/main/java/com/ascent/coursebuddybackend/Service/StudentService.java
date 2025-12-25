package com.ascent.coursebuddybackend.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ascent.coursebuddybackend.entity.Course;
import com.ascent.coursebuddybackend.entity.ResourceNotFoundException;
import com.ascent.coursebuddybackend.entity.Student;
import com.ascent.coursebuddybackend.entity.Users;
import com.ascent.coursebuddybackend.repository.CourseRepository;
import com.ascent.coursebuddybackend.repository.StudentRepository;

@Service
@Transactional
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserService userService;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    public Student createStudent(Student student, String username) {
        student.setFirstName(student.getFirstName());
        student.setLastName(student.getLastName());
        student.setPhone(student.getPhone());
        student.setAddress(student.getAddress());
        student.setHighestEducation(student.getHighestEducation());

        Users user = userService.getUserByUsername(username);

        // Link user to student
        student.setUser(user);

        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student studentDetails) {
        Student student = getStudentById(id);

        student.setFirstName(studentDetails.getFirstName());
        student.setLastName(studentDetails.getLastName());
        student.setPhone(studentDetails.getPhone());
        student.setAddress(studentDetails.getAddress());
        student.setHighestEducation(studentDetails.getHighestEducation());
        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        studentRepository.delete(student);
    }

    public Set<Course> getStudentCourses(Long studentId) {
        Student student = getStudentById(studentId);
        return student.getCourses();
    }

    public Student enrollStudentInCourse(Long studentId, Long courseId) {
        Student student = getStudentById(studentId);
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        student.enrollInCourse(course);
        return studentRepository.save(student);
    }

    public void unenrollStudentFromCourse(Long studentId, Long courseId) {
        Student student = getStudentById(studentId);
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        student.unenrollFromCourse(course);
    }


    public Student getStudentByUser(Users user) {

        return studentRepository.findByUser_Id((long) user.getId());

    }

    public Student updateStudentByUser(Users user, Student studentDetails) {
        Student student = getStudentByUser(user);
        student.setFirstName(studentDetails.getFirstName());
        student.setLastName(studentDetails.getLastName());
        student.setPhone(studentDetails.getPhone());
        student.setAddress(studentDetails.getAddress());
        student.setHighestEducation(studentDetails.getHighestEducation());
        return studentRepository.save(student);
    }

    public Set<Course> getStudentCoursesByUser(Users user) {
        Student student = getStudentByUser(user);
        return student.getCourses();
    }

    public Student enrollStudentInCourseByUser(Users user, Long courseId) {
        Student student = getStudentByUser(user);
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));
        student.enrollInCourse(course);
        return studentRepository.save(student);
    }

    public void unenrollStudentFromCourseByUser(Users user, Long courseId) {
        Student student = getStudentByUser(user);
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));
        student.unenrollFromCourse(course);
        studentRepository.save(student);
    }

}