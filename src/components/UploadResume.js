import React from 'react';

const UploadResume = ({ onFileChange }) => (
    <input
        type="file"
        onChange={onFileChange}
    />
);

export default UploadResume;
