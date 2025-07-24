import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = () => {
    if (!username || !password) {
      setError('用户名和密码不能为空');
      return;
    }
    // 模拟登录成功
    setError('');
    if (rememberMe) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
    console.log('登录成功:', { username, password });
    navigate('/chat');
  };

  // 定义一些样式，让代码更清晰
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily:
        "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    },
    loginCard: {
      padding: '40px',
      borderRadius: '20px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      width: '350px',
      animation: 'fadeInUp 0.7s ease-out forwards',
    },
    title: {
      color: '#fff',
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '2rem',
      fontWeight: '600',
    },
    inputGroup: {
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#fff',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s ease',
    },
    button: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '10px',
      border: 'none',
      background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
      color: '#fff',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '10px',
    },
    error: {
      color: '#ff8a80',
      textAlign: 'center',
      height: '20px',
      marginBottom: '10px',
    },
    rememberMeContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      color: '#fff',
    },
    checkbox: {
      marginRight: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .input-field:focus {
            box-shadow: 0 0 15px rgba(137, 247, 254, 0.5);
            border-color: #89f7fe;
          }
          .login-button:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(102, 166, 255, 0.6);
          }
        `}
      </style>
      <div style={styles.loginCard}>
        <h1 style={styles.title}>Welcome</h1>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            className="input-field"
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            className="input-field"
          />
        </div>
        <div style={styles.error}>{error}</div>
        <div style={styles.rememberMeContainer}>
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            style={styles.checkbox}
          />
          <label htmlFor="rememberMe">记住密码</label>
        </div>
        <button
          onClick={handleLogin}
          style={styles.button}
          className="login-button"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
