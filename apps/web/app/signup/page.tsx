"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { Button } from '@repo/ui/button';

export default function SignUp() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:3003/signup', {
        name,
        username,
        password
      });
      
      if (response.data.username) {
        router.push('/signin');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="auth-form">
        <h1 className="form-title">Create Account</h1>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Name</label>
            <div className="input-container">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="Your name"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="username">Email</label>
            <div className="input-container">
              <input
                id="username"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-container">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>
          
          <div className="form-actions">
            <Button
              type="submit"
              variant="primary"
              size="medium"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
        
        <p className="form-footer">
          Already have an account?{' '}
          <Link href="/signin" className="auth-link">
            Sign in
          </Link>
        </p>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          min-height: 100vh;
          align-items: center;
          justify-content: center;
          background-color: #121212;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        
        .auth-form {
          width: 100%;
          max-width: 450px;
          padding: 2.5rem;
          background-color: #1e1e1e;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          color: #e0e0e0;
          border: 1px solid #333;
        }
        
        .form-title {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
          color: #fff;
          letter-spacing: -0.5px;
        }
        
        .error-message {
          background-color: rgba(220, 38, 38, 0.2);
          border: 1px solid rgba(220, 38, 38, 0.3);
          color: #ef4444;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          color: #a0a0a0;
          margin-bottom: 0.5rem;
        }
        
        .input-container {
          position: relative;
          border-radius: 0.5rem;
          background-color: #2a2a2a;
          overflow: hidden;
          transition: all 0.2s ease;
        }
        
        .input-container:focus-within {
          box-shadow: 0 0 0 2px #3b82f6;
        }
        
        .form-input {
          width: 100%;
          background-color: transparent;
          border: none;
          color: #ffffff;
          padding: 1rem;
          font-size: 1rem;
          outline: none;
        }
        
        .form-input::placeholder {
          color: #6b7280;
        }
        
        .form-actions {
          margin-top: 2rem;
        }
        
        .submit-button {
          width: 100%;
          background-color: #3b82f6;
          color: white;
          font-weight: 600;
          padding: 0.875rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 1rem;
        }
        
        .submit-button:hover {
          background-color: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
        }
        
        .submit-button:active {
          transform: translateY(0);
        }
        
        .submit-button:disabled {
          background-color: #3b82f680;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .form-footer {
          text-align: center;
          margin-top: 1.5rem;
          color: #a0a0a0;
          font-size: 0.9rem;
        }
        
        .auth-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        
        .auth-link:hover {
          color: #60a5fa;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
