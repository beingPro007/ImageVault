import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RoomFiles from './RoomFiles';

function Room() {
  const { roomId } = useParams();
  const [file, setFile] = useState([]);
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://localhost:5000/upload/${roomId}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert('File uploaded successfully!');
        setFiles((prevFiles) => [...prevFiles, result]);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="room">
      <h1>Room ID: {roomId}</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
      
      {/* <ul>
        {files.map((file) => (
          <li key={file._id}>
            {file.filename} - <a href={`http://localhost:5000/download/${file._id}`} download>Download</a>
          </li>
        ))}
      </ul> */}


      <RoomFiles roomId={roomId} files={files} setFiles={setFiles} />
    </div>
  );
}

export default Room;
