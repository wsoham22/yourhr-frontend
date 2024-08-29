import React from 'react';
import AuthForm from '../components/AuthForm';
import { signupUser } from '../api';
import { Link } from 'react-router-dom'; 
import './sign.css'; 

const SignupPage = () => {
    const handleSignup = async (data) => {
        try {
            await signupUser(data);
            window.location.href = '/login';
        } catch (error) {
            console.error('Failed to signup', error);
            alert('Signup failed. Please check your details and try again.');
        }
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <div className="auth-form">
                <AuthForm type="signup" onSubmit={handleSignup} />
            </div>
            <p className="redirect-text">
                Already signed up? <Link to="/login" className="redirect-link">Login here</Link>
            </p>
        </div>
    );
};

export default SignupPage;
