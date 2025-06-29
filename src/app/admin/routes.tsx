/* eslint-disable max-len */
import { Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { HomePage } from './pages/homePage/homePage';
import { SettingsPage } from './pages/settingsPage/settingsPage';
import { EditingRegulationsPage } from './pages/editingRegulationsPage/editingRegulationsPage';
import { CreateTestPage } from './pages/testCreatePage/createTestPage';
import { EditingTestPage } from './pages/editingTestPage/editingTestPage';
import { TestsPage } from './pages/testsPage/testsPage';
import { TestDetailsPage } from './pages/testDetailsPage/testDetailsPage';
import { TestResultPage } from './pages/testResultPage/testResultPage';
import { SignaturesPage } from './pages/signaturesPage/signaturesPage';
import { InstrumentsPage } from './pages/instumentsPage/instumentsPage';
import { ForemansPage } from './pages/foremansPage/foremansPage';
import { ForemanFinesPage } from './pages/foremanFinesPage/foremanFinesPage';
import { AgentsLayout } from './pages/agentsPage/AgentsLayout';
import { MastersSection } from './pages/agentsPage/MastersSection/MastersSection';
import { SuppliersSection } from './pages/agentsPage/SuppliersSection/SuppliersSection';
import { ProjectsPage } from './pages/projectsPage/projectsPage';
import { GraficsPage } from './pages/graficsPage/graficsPage';
import { EditingForemanPage } from './pages/EditingForemanPage/EditingForemanPage';
import { FineDetailsPage } from './pages/FineDetailsPage/FineDetailsPage';

export const adminRoutes = (
  <Route path="admin" element={<AdminLayout />}>
    <Route index element={<Navigate to="home" replace />} />
    <Route path="home" element={<HomePage />} />

    <Route path="settings" element={<SettingsPage />} />
    <Route path="editingRegulations" element={<EditingRegulationsPage />} />

    <Route path="createTest" element={<CreateTestPage />} />
    <Route path="editingTest/:idTest" element={<EditingTestPage />} />
    <Route path="tests" element={<TestsPage />} />
    <Route path="testDetails/:idTest" element={<TestDetailsPage />} />
    <Route path="testResult/:idAns" element={<TestResultPage />} />

    <Route path="signatures" element={<SignaturesPage />} />
    <Route path="instruments" element={<InstrumentsPage />} />

    <Route path="foremans" element={<ForemansPage />} />
    <Route path="fines/foreman/:idForeman" element={<ForemanFinesPage />} />
    <Route path="fines/details/:idFine" element={<FineDetailsPage />} />

    <Route path="editingForeman/:idForeman" element={<EditingForemanPage />} />

    <Route path="agents" element={<AgentsLayout />}>
      <Route index element={<Navigate to="masters" replace />} />
      <Route path="masters" element={<MastersSection />} />
      <Route path="suppliers" element={<SuppliersSection />} />
    </Route>

    <Route path="projects" element={<ProjectsPage />} />
    <Route path="grafics" element={<GraficsPage />} />
  </Route>
);
