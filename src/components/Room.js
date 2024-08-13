import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RoomFiles from './RoomFiles';

function Room() {
  const { roomId } = useParams();
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleFileDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Room ID: {roomId}</h1>
      
      <div
        className={`border-2 border-dashed border-gray-300 rounded-lg p-6 w-full max-w-lg text-center ${dragOver ? 'bg-gray-200' : 'bg-white'}`}
        onDrop={handleFileDrop}
        onDragOver={handleFileDragOver}
        onDragLeave={handleFileDragLeave}
      >
        <p className="text-gray-600 mb-2">Drag & Drop your file here or</p>
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200">
          Browse Files
        </label>
      </div>

      <button
        onClick={handleFileUpload}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 mt-4"
      >
        Upload File
      </button>

      <RoomFiles roomId={roomId} files={files} setFiles={setFiles} />
    </div>
  );
}

export default Room;
