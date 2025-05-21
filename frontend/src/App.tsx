import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from 'sonner';
import MainLayout from '@/components/layout/MainLayout';
import Profiles from '@/pages/Profiles';
import Alerts from '@/pages/Alerts';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Profiles />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </MainLayout>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
