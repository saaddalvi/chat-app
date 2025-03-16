"use client";

import React, { useEffect, useState } from 'react';
import { Card } from '@repo/ui/card';
import Link from 'next/link';

interface Room {
  id: number;
  slug: string;
  adminId: number;
  createdAt: string;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await fetch('http://localhost:3003/rooms');
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        setRooms(data.rooms);
        setLoading(false);
      } catch (err) {
        setError('Failed to load rooms. Please try again later.');
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading rooms...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="rooms-container">
      <div className="rooms-header">
        <h1>Available Chat Rooms</h1>
        <p>Join a room or create your own to start chatting</p>
      </div>

      {rooms.length === 0 ? (
        <div className="no-rooms">
          <p>No rooms available. Be the first to create one!</p>
          <Link href="/create-room">
            <button className="create-room-btn">Create Room</button>
          </Link>
        </div>
      ) : (
        <div className="rooms-grid">
          {rooms.map((room) => (
            <Card
              key={room.id}
              title={room.slug}
              description={`Room #${room.id}`}
              icon={<RoomIcon />}
              iconColor={getRandomColor()}
              footer={
                <Link href={`/room/${room.slug}`}>
                  <button className="join-btn">Join Room</button>
                </Link>
              }
              className="room-card"
            />
          ))}
        </div>
      )}

      <div className="create-room-container">
        <Link href="/create-room">
          <button className="create-room-btn">Create New Room</button>
        </Link>
      </div>

      <style jsx>{`
        .rooms-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 100vh;
        }
        
        .rooms-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .rooms-header h1 {
          font-size: 2.5rem;
          color: #f3f4f6;
          margin-bottom: 0.5rem;
        }
        
        .rooms-header p {
          color: #9ca3af;
          font-size: 1.1rem;
        }
        
        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .room-card {
          height: 100%;
        }
        
        .join-btn {
          background-color: #4f46e5;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .join-btn:hover {
          background-color: #4338ca;
        }
        
        .create-room-container {
          text-align: center;
          margin-top: 2rem;
        }
        
        .create-room-btn {
          background-color: #10b981;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .create-room-btn:hover {
          background-color: #059669;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
        }
        
        .loading-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #3b82f6;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .error-container {
          text-align: center;
          padding: 2rem;
          background-color: rgba(239, 68, 68, 0.1);
          border-radius: 0.75rem;
          margin: 2rem auto;
          max-width: 600px;
        }
        
        .error-container button {
          background-color: #ef4444;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          margin-top: 1rem;
          cursor: pointer;
        }
        
        .no-rooms {
          text-align: center;
          padding: 3rem;
          background-color: #1f2937;
          border-radius: 0.75rem;
          border: 1px dashed #4b5563;
        }
        
        @media (max-width: 768px) {
          .rooms-grid {
            grid-template-columns: 1fr;
          }
          
          .rooms-header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

function RoomIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function getRandomColor(): "blue" | "purple" | "green" | "yellow" {
  const colors: ("blue" | "purple" | "green" | "yellow")[] = ["blue", "purple", "green", "yellow"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex] || "blue"; // Provide a fallback color
}
