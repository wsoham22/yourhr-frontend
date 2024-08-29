import React from 'react';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../api';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './login.css'; // Import CSS file

const LoginPage = () => {
    const handleLogin = async (formData) => {
        try {
            const { token } = await loginUser(formData);
            localStorage.setItem('token', token);
            window.location.href = '/profile';
        } catch (error) {
            console.error('Failed to login', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <div className="auth-form">
                <AuthForm type="login" onSubmit={handleLogin} />
            </div>
            <p className="redirect-text">
                New here? <Link to="/signup" className="redirect-link">Sign up here</Link>
            </p>
        </div>
    );
};

export default LoginPage;
