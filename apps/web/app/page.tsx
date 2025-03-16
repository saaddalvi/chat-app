"use client";

import { useState, useEffect } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="app-container">
      {/* Header/Navigation */}
      <nav className="header">
        <div className="nav-container">
          <h1 className="logo">ChatApp</h1>
          <div>
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="medium"
                onClick={() => {
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Button variant="primary" size="medium">
                <Link href="/signin">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="main-content">
        {/* Hero section */}
        <div className="hero-section">
          <h2 className="hero-title">Welcome to ChatApp</h2>
          <p className="hero-subtitle">
            Connect with friends, family, and colleagues in real-time. Create or join rooms to start chatting instantly.
          </p>
        </div>

        {/* Card section */}  
        <div className="card-grid">
          {/* Create Room Card */}
          <Card
            title="Create Room"
            description="Start a new conversation by creating your own chat room"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
            iconColor="blue"
            footer={
                <Button 
                  variant="primary" 
                  size="medium" 
                  onClick={() => {
                    if (isLoggedIn) {
                      router.push("/create-room");
                    } else {
                      router.push("/signin");
                    }
                  }}
                >
                  Create Room
                </Button>
            }
          />

          {/* Join Room Card */}
          <Card
            title="Join Room"
            description="Enter a room code to join an existing conversation"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
              </svg>
            }
            iconColor="purple"
            footer={
              <Button variant="primary" size="medium"
              onClick={() => {
                if (isLoggedIn) {
                  router.push("/join-room");
                } else {
                  router.push("/signin");
                }
              }}>
                Join Room 
              </Button>
            }
          />

          {/* View Rooms Card */}
          <Card
            title="View Rooms"
            description="Explore all available public chat rooms"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
            iconColor="green"
            footer={
              <Button variant="primary" size="medium"
              onClick={() => {
                if (isLoggedIn) {
                  router.push("/rooms");
                } else {
                  router.push("/signin");
                }
              }}>
                Browse Rooms
              </Button>
            }
          />
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h3 className="section-title">Everything you need to chat</h3>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon-container blue">
                <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="feature-title">Secure Chats</h4>
              <p className="feature-text">End-to-end encryption for all your conversations</p>
            </div>
            <div className="feature">
              <div className="feature-icon-container purple">
                <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h4 className="feature-title">Real-time Messaging</h4>
              <p className="feature-text">Instant message delivery with live typing indicators</p>
            </div>
            <div className="feature">
              <div className="feature-icon-container green">
                <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h4 className="feature-title">Group Chats</h4>
              <p className="feature-text">Create rooms with multiple participants</p>
            </div>
            <div className="feature">
              <div className="feature-icon-container yellow">
                <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="feature-title">Media Sharing</h4>
              <p className="feature-text">Share images, videos and documents easily</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-branding">
              <h2 className="footer-logo">ChatApp</h2>
              <p className="footer-tagline">Connect with everyone, anywhere</p>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">
                <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="social-link">
                <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="social-link">
                <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="copyright">© 2023 ChatApp. All rights reserved.</p>
            <div className="footer-links">
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* Base styles */
        .app-container {
          min-height: 100vh;
          background-color: #111827;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        /* Header styles */
        .header {
          background-color: #1f2937;
          padding: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1rem;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #60a5fa;
          margin: 0;
        }

        /* Main content styles */
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 1rem;
        }

        /* Hero section styles */
        .hero-section {
          text-align: center;
          margin-bottom: 5rem;
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          background: linear-gradient(to right, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.125rem;
          color: #d1d5db;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Card grid styles */
        .card-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .card-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .hero-title {
            font-size: 3rem;
          }
        }

        /* Removed card styles as they are handled by the Card component */

        /* Features section styles */
        .features-section {
          margin-top: 6rem;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 3rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .section-title {
            font-size: 2rem;
          }
        }

        @media (min-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .feature {
          text-align: center;
          padding: 1.5rem;
        }

        .feature-icon-container {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .feature-icon {
          width: 1.5rem;
          height: 1.5rem;
        }

        .feature-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .feature-text {
          color: #9ca3af;
          font-size: 0.875rem;
        }

        /* Footer styles */
        .footer {
          background-color: #1f2937;
          padding: 2.5rem 0;
          margin-top: 3rem;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .footer-top {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
        }

        .footer-branding {
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .footer-logo {
          font-size: 1.25rem;
          font-weight: 700;
          color: #60a5fa;
          margin-bottom: 0.5rem;
        }

        .footer-tagline {
          color: #9ca3af;
          font-size: 0.875rem;
        }

        .social-links {
          display: flex;
          gap: 1.5rem;
        }

        .social-link {
          color: #9ca3af;
          transition: color 0.2s ease;
        }

        .social-link:hover {
          color: #60a5fa;
        }

        .social-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .footer-bottom {
          border-top: 1px solid #374151;
          padding-top: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .copyright {
          color: #9ca3af;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
        }

        .footer-link {
          color: #9ca3af;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: #60a5fa;
        }

        @media (min-width: 768px) {
          .footer-top {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .footer-branding {
            margin-bottom: 0;
            text-align: left;
          }

          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .copyright {
            margin-bottom: 0;
          }
        }
      `}</style>
    </div>
  );
}
