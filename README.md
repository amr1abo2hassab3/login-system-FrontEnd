User Authentication System
This project implements a user authentication system where users can register and log in using their email and password. It stores user data in localStorage to persist login states.

Features:
Sign Up: Allows users to register with their name, email, and password.
Login: Users can log in by providing their email and password.
Input Validation: Ensures the correct format for name, email, and password.
User Storage: Stores user data in localStorage to check for existing users and manage login sessions.
Error Handling: Displays appropriate error or success messages based on user input.
Logout: Users can log out, clearing their session from localStorage.
LocalStorage Usage:
Users: Stores registered user data in localStorage under the key "users".
Current User: Stores the currently logged-in user under the key "user".
