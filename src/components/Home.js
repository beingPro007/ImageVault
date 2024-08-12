import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    try {
      const response = await axios.get('http://localhost:5000/room/create');
      if (response.status === 201) {
        navigate(`/room/${response.data.roomId}`);
      } else {
        console.error('Failed to create room:', response.data);
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleJoinRoom = async () => {
    if (roomId.trim()) {
        try {
            const response = await axios.get(`http://localhost:5000/room/${roomId}`);
            if (response.status === 200) {
                navigate(`/room/${roomId}`);
            } else {
                console.error('Room not found:', response.data);
            }
        } catch (error) {
            console.error('Error joining room:', error);
        }
    }
};


  return (
    <div className="home">
      <h1>FileVault</h1>
      <button onClick={handleCreateRoom}>Create a Room</button>
      <div>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
    </div>
  );
}

export default Home;
