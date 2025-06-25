import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { adminRoutes } from './app/admin/routes';
import './main.css';

export default function App() {
  return (
    <Router>
      <Routes>
        {adminRoutes}
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
    </Router>
  );
}
