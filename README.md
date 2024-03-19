# User Management RESTful API

This project implements a RESTful API for managing user information using Node.js, Express.js, and MongoDB. The API provides endpoints for creating, updating, deleting, and retrieving user data, along with an endpoint for uploading images. It ensures data validation, strong password rules, secure password storage using bcrypt, and appropriate HTTP status codes and messages in responses.

## Assignment Details

### Objectives

- Implement user-related API endpoints using Node.js, Express, and MongoDB.
- Secure password storage using bcrypt.
- Enable image uploading with specific format validations. Ex: Multer can be used for file handling.
- Use Postman for testing API endpoints.

### Functionalities to Implement

1. **User Creation**
   - Endpoint: POST: `/user/insert`
   - Function: Creates a new user with full name, email, and password. Implements validations for email, full name, and enforces strong password rules.

2. **Update User Details**
   - Endpoint: PUT: `/user/edit`
   - Function: Allows updating the user's full name and password. Email cannot be updated. Validates full name and password and ensures the user exists in the database before updating.

3. **Delete User**
   - Endpoint: DELETE: `/user/delete`
   - Function: Deletes a user by their email.

4. **Retrieve All Users**
   - Endpoint: GET: `/user/getAll`
   - Function: Retrieves all users' full names, email addresses, and passwords stored in the database.

5. **Upload Image**
   - Endpoint: POST: `/user/uploadImage`
   - Function: Allows users to upload an image file to the server. It only accepts JPEG, PNG, and GIF formats. Uses Multer for file handling. Stores the uploaded image in an "images" folder and saves the path in the database. Responds with confirmation of upload along with the file path.

### Additional Requirements

- All API responses must include appropriate HTTP status codes and messages.


