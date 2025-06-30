import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { adminRoutes } from './app/admin/routes';
import './main.css';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';

export default function App() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen(); // начальная проверка
    window.addEventListener('resize', checkScreen);

    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  if (!isMobile) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: 'white' }}>
          Извините, это приложение доступно только на мобильных устройствах.
        </h2>
      </div>
    );
  }

  return (
    <ConfigProvider
      locale={ruRU}
      getPopupContainer={trigger =>
        (trigger?.parentNode as HTMLElement) || document.body
      }
    >
      <Router>
        <Routes>
          {adminRoutes}
          <Route path="*" element={<div>Страница не найдена</div>} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}
