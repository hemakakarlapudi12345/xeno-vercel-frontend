import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Login failed");
        setIsLoading(false);
        return;
      }

      // Save the token
      localStorage.setItem("token", data.token);

      if (typeof onLogin === "function") onLogin();
      
      // Navigate to dashboard
      navigate("/dashboard");
      
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Check backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    leftPanel: {
      flex: '1',
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '40px',
      position: 'relative',
      overflow: 'hidden'
    },
    rightPanel: {
      flex: '1',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px'
    },
    heroImage: {
      width: '400px',
      height: '300px',
      objectFit: 'cover',
      borderRadius: '20px',
      marginBottom: '30px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '3px solid rgba(255, 255, 255, 0.3)'
    },
    heroText: {
      color: 'white',
      textAlign: 'center'
    },
    heroTitle: {
      fontSize: '48px',
      fontWeight: 'bold',
      marginBottom: '16px',
      textShadow: '2px 4px 8px rgba(0, 0, 0, 0.3)'
    },
    heroSubtitle: {
      fontSize: '20px',
      opacity: '0.9',
      lineHeight: '1.6',
      textShadow: '1px 2px 4px rgba(0, 0, 0, 0.3)'
    },
    formCard: {
      background: 'white',
      borderRadius: '24px',
      padding: '48px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      width: '100%',
      maxWidth: '400px'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '32px'
    },
    logo: {
      width: '64px',
      height: '64px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '16px',
      boxShadow: '0 10px 25px -5px rgba(102, 126, 234, 0.4)'
    },
    shopIcon: {
      width: '32px',
      height: '32px',
      fill: 'white'
    },
    brandText: {
      fontSize: '28px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px',
      textAlign: 'center'
    },
    subtitle: {
      color: '#6b7280',
      marginBottom: '32px',
      textAlign: 'center',
      fontSize: '16px'
    },
    fieldGroup: {
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px'
    },
    inputContainer: {
      position: 'relative'
    },
    inputIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '20px',
      height: '20px',
      fill: '#9ca3af'
    },
    input: {
      width: '100%',
      paddingLeft: '48px',
      paddingRight: '16px',
      paddingTop: '16px',
      paddingBottom: '16px',
      background: '#f9fafb',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      color: '#111827',
      outline: 'none',
      transition: 'all 0.3s',
      boxSizing: 'border-box'
    },
    passwordInput: {
      paddingRight: '48px'
    },
    eyeButton: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
      color: '#9ca3af',
      transition: 'color 0.2s',
      borderRadius: '4px'
    },
    eyeIcon: {
      width: '20px',
      height: '20px',
      fill: 'currentColor'
    },
    errorContainer: {
      marginBottom: '24px',
      padding: '16px',
      background: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    errorIcon: {
      width: '20px',
      height: '20px',
      fill: '#ef4444',
      flexShrink: '0'
    },
    errorText: {
      color: '#b91c1c',
      fontSize: '14px',
      margin: '0'
    },
    submitButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      fontWeight: '600',
      padding: '16px 24px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.3s',
      boxShadow: '0 10px 25px -5px rgba(102, 126, 234, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    submitButtonDisabled: {
      background: 'linear-gradient(135deg, #9ca3af, #9ca3af)',
      cursor: 'not-allowed',
      boxShadow: 'none'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    arrowIcon: {
      width: '20px',
      height: '20px',
      fill: 'currentColor'
    },
    forgotPassword: {
      textAlign: 'center',
      marginTop: '24px'
    },
    link: {
      color: '#667eea',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'color 0.2s',
      cursor: 'pointer'
    },
    footer: {
      textAlign: 'center',
      marginTop: '32px',
      fontSize: '14px',
      color: '#6b7280'
    },
    decorativeCircle1: {
      position: 'absolute',
      top: '10%',
      right: '10%',
      width: '200px',
      height: '200px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      filter: 'blur(40px)'
    },
    decorativeCircle2: {
      position: 'absolute',
      bottom: '10%',
      left: '10%',
      width: '150px',
      height: '150px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      filter: 'blur(40px)'
    }
  };

  // Add keyframe animation for spinner
  const spinKeyframes = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;

  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = spinKeyframes;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={styles.container}>
      {/* Left Panel with Image */}
      <div style={styles.leftPanel}>
        <div style={styles.decorativeCircle1}></div>
        <div style={styles.decorativeCircle2}></div>
        
        {/* Shopify-style E-commerce Image */}
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="E-commerce Dashboard"
          style={styles.heroImage}
        />
        
        <div style={styles.heroText}>
          <h1 style={styles.heroTitle}>Your Store</h1>
          <p style={styles.heroSubtitle}>
            Manage your e-commerce business with powerful insights and analytics
          </p>
        </div>
      </div>

      {/* Right Panel with Login Form */}
      <div style={styles.rightPanel}>
        <div style={styles.formCard}>
          {/* Logo and Brand */}
          <div style={styles.logoContainer}>
            <div style={styles.logo}>
              <svg style={styles.shopIcon} viewBox="0 0 24 24">
                <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z"/>
              </svg>
            </div>
            <span style={styles.brandText}>ShopInsight</span>
          </div>

          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to your account</p>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputContainer}>
                <svg style={styles.inputIcon} viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputContainer}>
                <svg style={styles.inputIcon} viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  style={{...styles.input, ...styles.passwordInput}}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  onMouseEnter={(e) => e.target.style.color = '#667eea'}
                  onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                >
                  {showPassword ? (
                    <svg style={styles.eyeIcon} viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg style={styles.eyeIcon} viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={styles.errorContainer}>
                <svg style={styles.errorIcon} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <span style={styles.errorText}>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.submitButton,
                ...(isLoading ? styles.submitButtonDisabled : {})
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 20px 35px -5px rgba(102, 126, 234, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(0px)';
                  e.target.style.boxShadow = '0 10px 25px -5px rgba(102, 126, 234, 0.4)';
                }
              }}
            >
              {isLoading ? (
                <>
                  <div style={styles.spinner}></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <svg style={styles.arrowIcon} viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12,5 19,12 12,19"/>
                  </svg>
                </>
              )}
            </button>

            {/* Forgot Password */}
            <div style={styles.forgotPassword}>
              <span
                style={styles.link}
                onClick={() => alert('Forgot password functionality coming soon!')}
                onMouseEnter={(e) => e.target.style.color = '#4f46e5'}
                onMouseLeave={(e) => e.target.style.color = '#667eea'}
              >
                Forgot your password?
              </span>
            </div>
          </form>

          {/* Footer */}
          <div style={styles.footer}>
            Don't have an account?{" "}
            <span
              style={styles.link}
              onClick={() => alert('Sign up functionality coming soon!')}
              onMouseEnter={(e) => e.target.style.color = '#4f46e5'}
              onMouseLeave={(e) => e.target.style.color = '#667eea'}
            >
              Sign up for free
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 
