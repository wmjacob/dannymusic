import { Route, Routes } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import ContactComponent from './components/ContactComponent';
import { LiveShows } from './components/LiveShows';

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="*" element={<HomeComponent />} />
        <Route path="/contact" element={<ContactComponent />} />
        <Route path="/live-shows" element={<LiveShows />} />
      </Routes>
    );
  };

  export default AppRoutes;