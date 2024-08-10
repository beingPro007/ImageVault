import React from 'react';
import { useParams } from 'react-router-dom';

function Room() {
  const { roomId } = useParams();

  return (
    <div className="room">
      <h1>Room ID: {roomId}</h1>
      <p className='text-blue-500'>Here you can upload and manage files.</p>
    </div>
  );
}

export default Room;
