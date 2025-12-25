package com.ascent.coursebuddybackend.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ascent.coursebuddybackend.Service.StudentService;
import com.ascent.coursebuddybackend.entity.Course;
import com.ascent.coursebuddybackend.entity.CustomUserDetails;
import com.ascent.coursebuddybackend.entity.Student;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Student student = studentService.getStudentById(id);
        return ResponseEntity.ok(student);
    }

    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student, @RequestParam String username) {
        System.out.println("------Student Controller-----");
        System.out.println(student);
        Student createdStudent = studentService.createStudent(student, username);
        return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        Student updatedStudent = studentService.updateStudent(id, student);
        return ResponseEntity.ok(updatedStudent);
    }

    @GetMapping("/me")
    public ResponseEntity<Student> getCurrentStudentProfile(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        System.out.println(userDetails.getUser());
        Student student = studentService.getStudentByUser(userDetails.getUser());
        return ResponseEntity.ok(student);
    }

    @PutMapping("/me")
    public ResponseEntity<Student> updateCurrentStudentProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody Student studentDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Student updatedStudent = studentService.updateStudentByUser(userDetails.getUser(), studentDetails);
        return ResponseEntity.ok(updatedStudent);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me/courses")
    public ResponseEntity<Set<Course>> getMyEnrolledCourses(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Set<Course> courses = studentService.getStudentCoursesByUser(userDetails.getUser());
        return ResponseEntity.ok(courses);
    }

    @PostMapping("/me/enroll")
    public ResponseEntity<Map<String, String>> enrollInCourse(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody Map<String, Long> request) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Long courseId = request.get("courseId");
        studentService.enrollStudentInCourseByUser(userDetails.getUser(), courseId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Successfully enrolled in course");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/me/unenroll")
    public ResponseEntity<Map<String, String>> unenrollFromCourse(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody Map<String, Long> request) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Long courseId = request.get("courseId");
        studentService.unenrollStudentFromCourseByUser(userDetails.getUser(), courseId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Successfully unenrolled from course");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/courses")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Set<Course>> getStudentCourses(@PathVariable Long id) {
        Set<Course> courses = studentService.getStudentCourses(id);
        return ResponseEntity.ok(courses);
    }

    @PostMapping("/{studentId}/courses/{courseId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Student> enrollStudentInCourse(
            @PathVariable Long studentId,
            @PathVariable Long courseId) {
        Student student = studentService.enrollStudentInCourse(studentId, courseId);
        return ResponseEntity.ok(student);
    }

    @DeleteMapping("/{studentId}/courses/{courseId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> unenrollStudentFromCourse(
            @PathVariable Long studentId,
            @PathVariable Long courseId) {
        studentService.unenrollStudentFromCourse(studentId, courseId);
        return ResponseEntity.noContent().build();
    }
}
