package com.ascent.coursebuddybackend.repository;

import com.ascent.coursebuddybackend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // Change from findByUserID to findByUser_Id (notice the underscore and proper casing)
    Student findByUser_Id(Long id);  // Also changed int to Long for consistency
    boolean existsById(Long id);
}