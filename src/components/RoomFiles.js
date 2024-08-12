import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoomFiles = ({ roomId, files, setFiles }) => {
    const [error, setError] = useState(null);
    console.log(roomId);
    
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/room/${roomId}/files`);
                setFiles(response.data);
            } catch (err) {
                setError(err);
                console.error('Error fetching files:', err);
            }
        };
        fetchFiles();
    }, [roomId]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Files in Room: {roomId}</h2>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>{file.filename} - <a href={`http://localhost:5000/download/${file._id}`} download>Download</a></li>
                ))}
            </ul>
        </div>
    );
};

export default RoomFiles;
