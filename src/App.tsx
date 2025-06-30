import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { adminRoutes } from './app/admin/routes';
import './main.css';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import DesktopBlocker from './app/admin/pages/DesktopBlocker/DesktopBlocker';

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

  // eslint-disable-next-line curly
  if (!isMobile) return <DesktopBlocker />;

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
