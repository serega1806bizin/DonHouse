import { useEffect, useState } from 'react';

export default function DesktopBlocker() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(dark);
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        background: isDark
          ? 'linear-gradient(-45deg, #1f1c2c, #928dab, #1f1c2c, #928dab)'
          : 'linear-gradient(-45deg, #fceabb, #f8b500, #fceabb, #f8b500)',
        backgroundSize: '400% 400%',
        animation: 'gradientFlow 10s ease infinite',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: isDark ? '#fff' : '#333',
        textAlign: 'center',
        padding: '2rem',
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <img
        src="/icons/logo-white.png"
        alt="Mobile only"
        style={{
          width: '500px',
          marginBottom: '2rem',
          animation: 'pulse 3s ease-in-out infinite',
        }}
      />
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '1rem',
          animation: 'fadeInUp 1.2s ease-out both',
          animationDelay: '0.3s',
        }}
      >
        Это приложение только для мобильных устройств 📱
      </h1>
      <p
        style={{
          fontSize: '1.2rem',
          maxWidth: '500px',
          lineHeight: '1.6',
          animation: 'fadeInUp 1.2s ease-out both',
          animationDelay: '0.6s',
        }}
      >
        Пожалуйста, откройте сайт на телефоне или уменьшите окно до мобильной
        ширины, чтобы продолжить.
      </p>
      <style>
        {`
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.9; }
          }
        `}
      </style>
    </div>
  );
}
