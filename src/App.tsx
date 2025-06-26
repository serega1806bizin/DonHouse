import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { adminRoutes } from './app/admin/routes';
import './main.css';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';

export default function App() {
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
