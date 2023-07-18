import { Route, Routes } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
// import BioComponent from './components/BioComponent';

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="*" element={<HomeComponent />} />
      </Routes>
    );
  };

  export default AppRoutes;