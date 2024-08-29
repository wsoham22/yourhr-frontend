import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css'; // Import CSS file

const ProfilePage = () => {
    const [resume, setResume] = useState(null);
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const userResume = response.data.resume;
                console.log(userResume);
                if (userResume && userResume.path) {
                    // Construct the full URL for the resume
                    setResumeUrl(`http://localhost:5000/${userResume.path}`);
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
            await axios.post('http://localhost:5000/api/user/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Resume uploaded successfully');
            // Fetch updated resume URL
            const response = await axios.get('http://localhost:5000/api/user/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const userResume = response.data.resume;
            if (userResume && userResume.path) {
                setResumeUrl(`http://localhost:5000/${userResume.path}`);
            }
        } catch (error) {
            console.error('Failed to upload resume', error);
        }
    };

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="resume-container">
                {resumeUrl ? (
                    <div>
                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a>
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
