import { Route, Routes } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import ContactComponent from './components/ContactComponent';

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="*" element={<HomeComponent />} />
        <Route path="/contact" element={<ContactComponent />} />
      </Routes>
    );
  };

  export default AppRoutes;