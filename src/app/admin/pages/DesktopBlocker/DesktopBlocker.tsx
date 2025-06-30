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
          ? 'linear-gradient(135deg, #1f1c2c, #928dab)'
          : 'linear-gradient(135deg, #fceabb, #f8b500)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: isDark ? '#fff' : '#333',
        textAlign: 'center',
        padding: '2rem',
        fontFamily: 'Segoe UI, sans-serif',
        animation: 'fadeIn 1.5s ease-out',
      }}
    >
      <img
        src="/icons/logo-white.png"
        alt="Mobile only"
        style={{ width: '500px', marginBottom: '2rem' }}
      />
      <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>
        Это приложение только для мобильных устройств 📱
      </h1>
      <p style={{ fontSize: '1.1rem', maxWidth: '500px' }}>
        Пожалуйста, откройте сайт на телефоне или уменьшите окно до мобильной
        ширины, чтобы продолжить.
      </p>
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
