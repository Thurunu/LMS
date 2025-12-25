# Student Registration System - Technical Documentation


---

## Table of Contents

1. [Database Design](#database-design)
2. [Backend Implementation](#backend-implementation)
3. [Frontend Implementation](#frontend-implementation)
4. [Security Implementation](#security-implementation)
5. [Code Walkthrough](#code-walkthrough)
---



### Technology Justification

| Technology | Purpose | Justification |
|-----------|---------|---------------|
| React.js | Frontend Framework | Modern, component-based, large community support |
| Spring Boot | Backend Framework | Enterprise-grade, robust, scalable |
| MS SQL Server | Database | Requirement specification, reliable, widely used |
| JWT | Authentication | Stateless, secure, scalable |
| Tailwind CSS | Styling | Rapid development, consistent design |

---

## 1. Database Design

### 1.1 Entity-Relationship Diagram

```
┌─────────────────┐              ┌─────────────────┐
│     USERS       │              │    STUDENTS     │
├─────────────────┤              ├─────────────────┤
│ id (PK)         │              │ id (PK)         │
│ username        │──────1:1─────│ user_id (FK)    │
│ password        │              │ first_name      │
│ role            │              │ last_name       │
└─────────────────┘              │ phone           │
                                 │ address         │
                                 │ highest_edu...  │
                                 │ created_at      │
                                 └────────┬────────┘
                                          │
                                          │
                                     M    │    N
                                 ┌────────▼────────┐
                                 │ STUDENT_COURSES │
                                 ├─────────────────┤
                                 │ student_id (PK) │
                                 │ course_id (PK)  │
                                 └────────┬────────┘
                                          │
                                     M    │    N
                                 ┌────────▼────────┐
                                 │    COURSES      │
                                 ├─────────────────┤
                                 │ id (PK)         │
                                 │ course_code     │
                                 │ course_name     │
                                 │ description     │
                                 │ credits         │
                                 │ instructor      │
                                 │ created_at      │
                                 │ created_by (FK) │
                                 └─────────────────┘
```

### 1.2 Database Schema

#### Table: users
```sql
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    CONSTRAINT CHK_role CHECK (role IN ('STUDENT', 'ADMIN'))
);
```

#### Table: students
```sql
CREATE TABLE students (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    highest_education VARCHAR(255),
    address VARCHAR(500),
    created_at DATETIME DEFAULT GETDATE(),
    user_id INT NOT NULL,
    CONSTRAINT FK_student_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE
);
```

#### Table: courses
```sql
CREATE TABLE courses (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(200) NOT NULL,
    description TEXT,
    credits INT,
    instructor VARCHAR(200),
    created_at DATETIME DEFAULT GETDATE(),
    created_by INT,
    CONSTRAINT FK_course_creator FOREIGN KEY (created_by) 
        REFERENCES users(id) ON DELETE SET NULL
);
```

#### Table: student_courses
```sql
CREATE TABLE student_courses (
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    PRIMARY KEY (student_id, course_id),
    CONSTRAINT FK_sc_student FOREIGN KEY (student_id) 
        REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT FK_sc_course FOREIGN KEY (course_id) 
        REFERENCES courses(id) ON DELETE CASCADE
);
```

### 1.3 Normalization Analysis

**First Normal Form (1NF)**: ✅
- All attributes contain atomic values
- No repeating groups

**Second Normal Form (2NF)**: ✅
- In 1NF
- No partial dependencies (all non-key attributes fully depend on primary key)

**Third Normal Form (3NF)**: ✅
- In 2NF
- No transitive dependencies

---

## 2. Backend Implementation

### 2.1 Spring Boot Configuration

**application.properties**
```properties
# Database Configuration
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=knowledgePulse
spring.datasource.username=sa
spring.datasource.password=2115@test
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

### 2.2 Security Configuration

**JWT-Based Authentication Flow**

```java
// 1. User Login Request
POST /api/auth/login
{
    "username": "student@example.com",
    "password": "password123"
}

// 2. Backend Validates Credentials
AuthenticationManager.authenticate()

// 3. Generate JWT Token
JWTService.generateToken(username, role)

// 4. Return Token to Client
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "student@example.com",
    "role": "STUDENT"
}

// 5. Client Stores Token (localStorage)
localStorage.setItem('token', token)

// 6. Client Sends Token in Subsequent Requests
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// 7. Backend Validates Token (JwtFilter)
JwtFilter.doFilterInternal()
  → Extract token from header
  → Validate token signature
  → Extract username and role
  → Set SecurityContext

// 8. Spring Security Authorizes Request
@PreAuthorize("hasRole('STUDENT')")
```

### 2.3 Key Classes Explanation

#### UserController.java
**Purpose**: Handles authentication endpoints

```java
@RestController
@RequestMapping("/api/auth")
public class UserController {
    
    // Register new student
    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@RequestBody Users user) {
        // 1. Encode password with BCrypt
        // 2. Save user to database
        // 3. Generate JWT token
        // 4. Return token and user info
    }
    
    // User login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users user) {
        // 1. Authenticate credentials
        // 2. Fetch user from database
        // 3. Generate JWT token with role
        // 4. Return token and user details
    }
}
```

#### StudentController.java
**Purpose**: Manages student-related operations

```java
@RestController
@RequestMapping("/api/students")
public class StudentController {
    
    // Get all students (Admin only)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Student>> getAllStudents() {
        // Returns list of all students with their details
    }
    
    // Enroll student in course
    @PostMapping("/me/enroll")
    public ResponseEntity<?> enrollInCourse(@RequestBody Map<String, Long> request) {
        // 1. Get current authenticated student
        // 2. Get course by ID
        // 3. Add course to student's enrolled courses
        // 4. Save to database (creates entry in student_courses table)
    }
    
    // Unenroll from course
    @PostMapping("/me/unenroll")
    public ResponseEntity<?> unenrollFromCourse(@RequestBody Map<String, Long> request) {
        // 1. Get current authenticated student
        // 2. Get course by ID
        // 3. Remove course from student's enrolled courses
        // 4. Save to database (deletes entry from student_courses table)
    }
}
```

#### CourseController.java
**Purpose**: Manages course operations

```java
@RestController
@RequestMapping("/api/courses")
public class CourseController {
    
    // Get all courses (Public access)
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        // Returns all available courses
    }
    
    // Create course (Admin only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        // 1. Validate course data
        // 2. Set created_by to current admin
        // 3. Save to database
        // 4. Return created course
    }
}
```

### 2.4 JPA Entity Relationships

```java
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // One-to-One relationship with Users
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;
    
    // Many-to-Many relationship with Courses
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "student_courses",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses = new HashSet<>();
    
    // Helper methods for enrollment
    public void enrollInCourse(Course course) {
        this.courses.add(course);
        course.getStudents().add(this);
    }
    
    public void unenrollFromCourse(Course course) {
        this.courses.remove(course);
        course.getStudents().remove(this);
    }
}
```

---

## 3. Frontend Implementation

### 3.1 React Component Architecture

```
src
├── App.jsx
├── index.css
├── main.jsx
├── assets
│   ├── AboutBannerImage.png
│   ├── Bannerimage.jpg
│   ├── BannerImage2.png
│   ├── courses/
│   │   ├── HC1.png
│   │   ├── HC2.png
│   │   └── ...
│   └── instructors/
│       ├── A1.png
│       ├── A2.png
│       └── ...
├── components
│   ├── EasySteps.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── HeroSection.jsx
│   ├── Instructors.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── admin/
│   │   ├── CourseTab.jsx
│   │   ├── StatsCard.jsx
│   │   └── StudentTab.jsx
│   ├── course/
│   │   ├── CourseCard.jsx
│   │   ├── CourseDescription.jsx
│   │   ├── CourseInfo.jsx
│   │   ├── CourseList.jsx
│   │   ├── EnrollmentPanel.jsx
│   │   ├── MyLearning.jsx
│   │   └── RelatedCourses.jsx
│   └── home/
│       └── LatestCourses.jsx
├── hooks
│   └── useApi.js
├── pages
│   ├── AboutPage.jsx
│   ├── AdminDashboard.jsx
│   ├── CourseDetailPage.jsx
│   ├── CoursePage.jsx
│   ├── FAQPage.jsx
│   ├── HomePage.jsx
│   ├── MyCoursesPage.jsx
│   ├── RegisterPage.jsx
│   ├── SignInPage.jsx
│   └── StudentProfile.jsx
└── services
    ├── assets.js
    ├── authService.js
    ├── courseService.js
    └── studentService.js
```

### 3.2 State Management

**Authentication State**
- Stored in `localStorage`:
  - `token`: JWT authentication token
  - `user`: User object (email, role)

**Component State (useState hooks)**
- Form data
- Loading states
- Error messages
- Fetched data (courses, students)

### 3.3 API Service Layer

**authService.js**
```javascript
const authService = {
    // Register new student
    register: async (userData) => {
        // 1. Send POST request to /api/auth/register
        // 2. Receive JWT token
        // 3. Store token in localStorage
        // 4. Create student details record
        // 5. Navigate to courses page
    },
    
    // Login user
    login: async (credentials) => {
        // 1. Send POST request to /api/auth/login
        // 2. Receive token and user info
        // 3. Store in localStorage
        // 4. Return user object
    },
    
    // Check if user is admin
    isAdmin: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.role?.toLowerCase() === 'admin';
    }
}
```

**studentService.js**
```javascript
const studentService = {
    // Enroll in course
    enrollInCourse: async (courseId) => {
        // 1. Get token from localStorage
        // 2. Send POST to /api/students/me/enroll
        // 3. Include Authorization header
        // 4. Return success response
    },
    
    // Get enrolled courses
    getMyEnrolledCourses: async () => {
        // 1. Send GET to /api/students/me/courses
        // 2. Return list of enrolled courses
    }
}
```

### 3.4 Protected Routes Implementation

```javascript
function ProtectedRoute({ children, adminOnly = false }) {
    const isAuthenticated = authService.isAuthenticated();
    const isAdmin = authService.isAdmin();
    
    // Check authentication
    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }
    
    // Check admin access
    if (adminOnly && !isAdmin) {
        return <Navigate to="/" />;
    }
    
    return children;
}

// Usage in Router
<Route 
    path="/my-courses" 
    element={
        <ProtectedRoute>
            <MyCoursesPage />
        </ProtectedRoute>
    } 
/>

<Route 
    path="/admin" 
    element={
        <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
        </ProtectedRoute>
    } 
/>
```

---

## 4. Security Implementation

### 4.1 Password Security
- **BCrypt Encryption**: All passwords encrypted with BCrypt (cost factor 12)
- **Strength**: 12 rounds = 2^12 iterations ≈ 4096 hashing rounds
- **Salt**: Automatically generated unique salt per password

### 4.2 JWT Token Structure

```
Header:
{
    "alg": "HS256",
    "typ": "JWT"
}

Payload:
{
    "sub": "student@example.com",  // Subject (username)
    "role": "STUDENT",              // User role
    "iat": 1701234567,              // Issued at
    "exp": 1701320967               // Expiration (24 hours)
}

Signature:
HMACSHA256(
    base64UrlEncode(header) + "." + base64UrlEncode(payload),
    SECRET_KEY
)
```

### 4.3 CORS Configuration

```java
@Bean
public UrlBasedCorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.addAllowedOrigin("http://localhost:5173");
    configuration.addAllowedMethod("*");
    configuration.addAllowedHeader("*");
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

### 4.4 Authorization Matrix

| Endpoint | Guest | Student | Admin |
|----------|-------|---------|-------|
| GET /api/courses | ✅ | ✅ | ✅ |
| GET /api/courses/{id} | ✅ | ✅ | ✅ |
| POST /api/auth/register | ✅ | ❌ | ❌ |
| POST /api/auth/login | ✅ | ✅ | ✅ |
| GET /api/students/me | ❌ | ✅ | ❌ |
| POST /api/students/me/enroll | ❌ | ✅ | ❌ |
| GET /api/students | ❌ | ❌ | ✅ |
| POST /api/courses | ❌ | ❌ | ✅ |
| DELETE /api/courses/{id} | ❌ | ❌ | ✅ |

---


## 5. Code Walkthrough

### 5.1 Student Registration Flow

**Step-by-Step Execution**:

1. **User fills registration form** (RegisterPage.jsx)
```javascript
const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    highestEducation: ''
});
```

2. **Form validation**
```javascript
if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match');
    return;
}
```

3. **Call authService.register()**
```javascript
const response = await authService.register(formData);
```

4. **Backend receives request** (UserController.java)
```java
@PostMapping("/register")
public ResponseEntity<RegistrationResponse> register(@RequestBody Users user) {
    RegistrationResponse response = userService.register(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
}
```

5. **UserService processes registration**
```java
public RegistrationResponse register(Users user) {
    // Encrypt password
    user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
    
    // Save to database
    Users savedUser = userRepo.save(user);
    
    // Generate JWT token
    String token = jwtService.generateToken(savedUser.getUsername(), savedUser.getRole());
    
    return new RegistrationResponse(
        savedUser.getUsername(),
        savedUser.getRole(),
        token,
        "User registered successfully"
    );
}
```

6. **Frontend stores token**
```javascript
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));
```

7. **Create student details record**
```javascript
const userData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    address: formData.address,
    highestEducation: formData.highestEducation
};

await axios.post(`/api/students?username=${email}`, userData, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
```

8. **Navigate to courses page**
```javascript
navigate('/courses');
```

### 5.2 Course Enrollment Flow

**Step-by-Step Execution**:

1. **User clicks "Enroll Now"** (CourseDetailPage.jsx)
```javascript
const handleEnroll = async () => {
    if (!authService.isAuthenticated()) {
        alert('Please login to enroll');
        navigate('/signin');
        return;
    }
    
    await studentService.enrollInCourse(courseId);
}
```

2. **studentService makes API call**
```javascript
enrollInCourse: async (courseId) => {
    const response = await api.post('/students/me/enroll', { courseId });
    return response.data;
}
```

3. **Backend receives enrollment request** (StudentController.java)
```java
@PostMapping("/me/enroll")
public ResponseEntity<?> enrollInCourse(@RequestBody Map<String, Long> request) {
    // Get authenticated user from SecurityContext
    CustomUserDetails userDetails = (CustomUserDetails) 
        SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    
    // Get student by username
    Student student = studentService.getStudentByUsername(userDetails.getUsername());
    
    // Get course
    Long courseId = request.get("courseId");
    Course course = courseService.getCourseById(courseId);
    
    // Enroll student
    student.enrollInCourse(course);
    studentRepo.save(student);
    
    return ResponseEntity.ok().body(Map.of("message", "Successfully enrolled"));
}
```

4. **Database update** (Hibernate executes SQL)
```sql
INSERT INTO student_courses (student_id, course_id) 
VALUES (123, 45);
```

5. **Success response sent to frontend**

6. **UI updates enrollment status**
```javascript
setIsEnrolled(true);
alert('Successfully enrolled in the course!');
```



---

