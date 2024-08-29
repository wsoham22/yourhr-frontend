import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css'; // Import CSS file
import { FaTrash } from 'react-icons/fa'; // Import Font Awesome Trash Icon

const ProfilePage = () => {
    const [resume, setResume] = useState(null);
    const [resumeUrl, setResumeUrl] = useState('');
    const REACT_APP_API_URL = "https://yourhr-backend01-z33d.onrender.com/api";

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await axios.get(`${REACT_APP_API_URL}/user/profile`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const userResume = response.data.resume;
                console.log(userResume);
                if (userResume && userResume.path) {
                    setResumeUrl(`https://yourhr-backend01-z33d.onrender.com/${userResume.path}`);
                }
            } catch (error) {
                console.error('Failed to fetch resume', error);
            }
        };

        fetchResume();
    }, []);

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('resume', resume);

        try {
            await axios.post(`${REACT_APP_API_URL}/user/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Resume uploaded successfully');
            // Fetch updated resume URL
            const response = await axios.get(`${REACT_APP_API_URL}/user/profile`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const userResume = response.data.resume;
            console.log(userResume);
            if (userResume && userResume.path) {
                setResumeUrl(`${REACT_APP_API_URL}/${userResume.path}`);
            }
        } catch (error) {
            console.error('Failed to upload resume', error);
        }
    };

    const handleResumeDelete = async () => {
        try {
            await axios.delete(`https://yourhr-backend01-z33d.onrender.com/api/user/deleteresume`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Resume deleted successfully');
            setResumeUrl('');
        } catch (error) {
            console.error('Failed to delete resume', error);
        }
    };

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="resume-container">
                {resumeUrl ? (
                    <div>
                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a>
                        <button onClick={handleResumeDelete} className="delete-button">
                            <FaTrash /> Delete Resume
                        </button>
                    </div>
                ) : (
                    <p>No resume uploaded yet.</p>
                )}
            </div>
            <div className="upload-section">
                <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                />
                <button onClick={handleFileUpload}>Upload Resume</button>
            </div>
        </div>
    );
};

export default ProfilePage;
