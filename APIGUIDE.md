## Base URL
```
http://localhost:8080/api
```
## Quick Start

**Default Admin Login:**
- Username: `admin@example.com`
- Password: `admin123`
---

## Authentication

### Register User
**POST** `/auth/register`

Creates a new user account.

**Request Body:**
```json
{
  "username": "student@example.com",
  "password": "securePassword123",
  "role": "STUDENT"
}
```


**Response:**
```json
{
  "id": 1,
  "username": "student@example.com",
  "password": "$2a$10$...",
  "role": "STUDENT"
}
```


**Status Codes:**
- `200 OK` - User created successfully

---

### Login User
**POST** `/auth/login`

Authenticates a user and returns a token.

**Request Body:**
```json
{
  "username": "student@example.com",
  "password": "securePassword123"
}
```


**Response:**
```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```


**Status Codes:**
- `200 OK` - Login successful
- `500 Internal Server Error` - Login failed

---

## Students Management

### Get All Students
**GET** `/students`

Retrieves all students.

**Response:**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "dateOfBirth": "1995-06-15",
    "address": "123 Main Street, City, State",
    "createdAt": "2024-01-15T10:30:00",
    "courses": [],
    "user": {
      "id": 2,
      "username": "john.doe@example.com",
      "role": "STUDENT"
    }
  }
]
```


**Status Codes:**
- `200 OK` - Students retrieved successfully

---

### Get Student by ID
**GET** `/students/{id}`

Retrieves a specific student by ID.

**Parameters:**
- `id` (path) - Student ID

**Response:**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "dateOfBirth": "1995-06-15",
  "address": "123 Main Street, City, State",
  "createdAt": "2024-01-15T10:30:00",
  "courses": [
    {
      "id": 1,
      "courseCode": "CS101",
      "courseName": "Introduction to Computer Science",
      "description": "Basic concepts of programming and computer science",
      "credits": 3,
      "instructor": "Dr. Smith",
      "createdAt": "2024-01-10T09:00:00"
    }
  ],
  "user": {
    "id": 2,
    "username": "john.doe@example.com",
    "role": "STUDENT"
  }
}
```


**Status Codes:**
- `200 OK` - Student found
- `404 Not Found` - Student not found

---

### Create Student
**POST** `/students`

Creates a new student and associated user account.

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "password": "studentPassword123",
  "phone": "+1987654321",
  "dateOfBirth": "1996-03-22",
  "address": "456 Oak Avenue, City, State"
}
```


**Response:**
```json
{
  "id": 2,
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phone": "+1987654321",
  "dateOfBirth": "1996-03-22",
  "address": "456 Oak Avenue, City, State",
  "createdAt": "2024-01-15T14:30:00",
  "courses": [],
  "user": {
    "id": 3,
    "username": "jane.smith@example.com",
    "role": "STUDENT"
  }
}
```


**Status Codes:**
- `201 Created` - Student created successfully
- `400 Bad Request` - Invalid input data

---

### Update Student
**PUT** `/students/{id}`

Updates an existing student.

**Parameters:**
- `id` (path) - Student ID

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Johnson",
  "email": "jane.johnson@example.com",
  "phone": "+1987654321",
  "dateOfBirth": "1996-03-22",
  "address": "789 Pine Street, City, State"
}
```


**Response:**
```json
{
  "id": 2,
  "firstName": "Jane",
  "lastName": "Johnson",
  "email": "jane.johnson@example.com",
  "phone": "+1987654321",
  "dateOfBirth": "1996-03-22",
  "address": "789 Pine Street, City, State",
  "createdAt": "2024-01-15T14:30:00",
  "courses": [],
  "user": {
    "id": 3,
    "username": "jane.johnson@example.com",
    "role": "STUDENT"
  }
}
```


**Status Codes:**
- `200 OK` - Student updated successfully
- `404 Not Found` - Student not found

---

### Delete Student
**DELETE** `/students/{id}`

Deletes a student.

**Parameters:**
- `id` (path) - Student ID

**Response:** No content

**Status Codes:**
- `204 No Content` - Student deleted successfully
- `404 Not Found` - Student not found

---

### Get Student's Courses
**GET** `/students/{id}/courses`

Retrieves all courses a student is enrolled in.

**Parameters:**
- `id` (path) - Student ID

**Response:**
```json
[
  {
    "id": 1,
    "courseCode": "CS101",
    "courseName": "Introduction to Computer Science",
    "description": "Basic concepts of programming and computer science",
    "credits": 3,
    "instructor": "Dr. Smith",
    "createdAt": "2024-01-10T09:00:00",
    "createdBy": {
      "id": 1,
      "username": "admin@example.com",
      "role": "ADMIN"
    }
  }
]
```


**Status Codes:**
- `200 OK` - Courses retrieved successfully
- `404 Not Found` - Student not found

---

### Enroll Student in Course
**POST** `/students/{studentId}/courses/{courseId}`

Enrolls a student in a specific course.

**Parameters:**
- `studentId` (path) - Student ID
- `courseId` (path) - Course ID

**Response:**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "dateOfBirth": "1995-06-15",
  "address": "123 Main Street, City, State",
  "createdAt": "2024-01-15T10:30:00",
  "courses": [
    {
      "id": 1,
      "courseCode": "CS101",
      "courseName": "Introduction to Computer Science",
      "description": "Basic concepts of programming and computer science",
      "credits": 3,
      "instructor": "Dr. Smith",
      "createdAt": "2024-01-10T09:00:00"
    }
  ]
}
```


**Status Codes:**
- `200 OK` - Student enrolled successfully
- `404 Not Found` - Student or course not found

---

### Unenroll Student from Course
**DELETE** `/students/{studentId}/courses/{courseId}`

Removes a student from a specific course.

**Parameters:**
- `studentId` (path) - Student ID
- `courseId` (path) - Course ID

**Response:** No content

**Status Codes:**
- `204 No Content` - Student unenrolled successfully
- `404 Not Found` - Student or course not found

---

## Courses Management

### Get All Courses
**GET** `/courses`

Retrieves all courses.

**Response:**
```json
[
  {
    "id": 1,
    "courseCode": "CS101",
    "courseName": "Introduction to Computer Science",
    "description": "Basic concepts of programming and computer science",
    "credits": 3,
    "instructor": "Dr. Smith",
    "createdAt": "2024-01-10T09:00:00",
    "students": [],
    "createdBy": {
      "id": 1,
      "username": "admin@example.com",
      "role": "ADMIN"
    }
  }
]
```


**Status Codes:**
- `200 OK` - Courses retrieved successfully

---

### Get Course by ID
**GET** `/courses/{id}`

Retrieves a specific course by ID.

**Parameters:**
- `id` (path) - Course ID

**Response:**
```json
{
  "id": 1,
  "courseCode": "CS101",
  "courseName": "Introduction to Computer Science",
  "description": "Basic concepts of programming and computer science",
  "credits": 3,
  "instructor": "Dr. Smith",
  "createdAt": "2024-01-10T09:00:00",
  "students": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "dateOfBirth": "1995-06-15",
      "address": "123 Main Street, City, State",
      "createdAt": "2024-01-15T10:30:00"
    }
  ],
  "createdBy": {
    "id": 1,
    "username": "admin@example.com",
    "role": "ADMIN"
  }
}
```


**Status Codes:**
- `200 OK` - Course found
- `404 Not Found` - Course not found

---

### Create Course
**POST** `/courses`

Creates a new course. **Requires ADMIN role**.

**Headers:**
```
Authorization: Bearer {jwt_token}
```


**Request Body:**
```json
{
  "courseCode": "CS201",
  "courseName": "Data Structures and Algorithms",
  "description": "Advanced programming concepts including data structures and algorithm design",
  "credits": 4,
  "instructor": "Dr. Johnson"
}
```


**Response:**
```json
{
  "id": 2,
  "courseCode": "CS201",
  "courseName": "Data Structures and Algorithms",
  "description": "Advanced programming concepts including data structures and algorithm design",
  "credits": 4,
  "instructor": "Dr. Johnson",
  "createdAt": "2024-01-15T16:00:00",
  "students": [],
  "createdBy": {
    "id": 1,
    "username": "admin@example.com",
    "role": "ADMIN"
  }
}
```


**Status Codes:**
- `201 Created` - Course created successfully
- `400 Bad Request` - Invalid input data
- `403 Forbidden` - Insufficient privileges (not admin)

---

### Update Course
**PUT** `/courses/{id}`

Updates an existing course.

**Parameters:**
- `id` (path) - Course ID

**Request Body:**
```json
{
  "courseCode": "CS201",
  "courseName": "Advanced Data Structures",
  "description": "In-depth study of data structures and their applications",
  "credits": 4,
  "instructor": "Dr. Johnson"
}
```


**Response:**
```json
{
  "id": 2,
  "courseCode": "CS201",
  "courseName": "Advanced Data Structures",
  "description": "In-depth study of data structures and their applications",
  "credits": 4,
  "instructor": "Dr. Johnson",
  "createdAt": "2024-01-15T16:00:00",
  "students": [],
  "createdBy": {
    "id": 1,
    "username": "admin@example.com",
    "role": "ADMIN"
  }
}
```


**Status Codes:**
- `200 OK` - Course updated successfully
- `404 Not Found` - Course not found

---

### Delete Course
**DELETE** `/courses/{id}`

Deletes a course. **Requires ADMIN role**.

**Headers:**
```
Authorization: Bearer {jwt_token}
```


**Parameters:**
- `id` (path) - Course ID

**Response:** No content

**Status Codes:**
- `204 No Content` - Course deleted successfully
- `404 Not Found` - Course not found
- `403 Forbidden` - Insufficient privileges (not admin)

---

### Get Course Students
**GET** `/courses/{id}/students`

Retrieves all students enrolled in a specific course.

**Parameters:**
- `id` (path) - Course ID

**Response:**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "dateOfBirth": "1995-06-15",
    "address": "123 Main Street, City, State",
    "createdAt": "2024-01-15T10:30:00",
    "user": {
      "id": 2,
      "username": "john.doe@example.com",
      "role": "STUDENT"
    }
  }
]
```


**Status Codes:**
- `200 OK` - Students retrieved successfully
- `404 Not Found` - Course not found

---

## Error Responses

### Standard Error Format
```json
{
  "timestamp": "2024-01-15T10:30:00.123+00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Student not found with id: 999",
  "path": "/api/students/999"
}
```




## Authentication & Authorization

### JWT Token Usage
For endpoints requiring authentication, include the JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```


### Role-Based Access Control
- **ADMIN**: Can create, update, and delete courses
- **STUDENT**: Can view courses, enroll/unenroll in courses
- **Public**: Can register and login

### Protected Endpoints
- `POST /courses` - Requires ADMIN role
- `DELETE /courses/{id}` - Requires ADMIN role

---

## Data Models

### Users
```typescript
{
  id: number,
  username: string,
  password: string, // Encrypted
  role: "ADMIN" | "STUDENT"
}
```


### Student
```typescript
{
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string, // Not returned in responses
  phone?: string,
  dateOfBirth?: string, // ISO date format
  address?: string,
  createdAt: string, // ISO datetime format
  courses: Course[],
  user: Users
}
```


### Course
```typescript
{
  id: number,
  courseCode: string,
  courseName: string,
  description?: string,
  credits?: number,
  instructor?: string,
  createdAt: string, // ISO datetime format
  students: Student[],
  createdBy: Users
}
```
