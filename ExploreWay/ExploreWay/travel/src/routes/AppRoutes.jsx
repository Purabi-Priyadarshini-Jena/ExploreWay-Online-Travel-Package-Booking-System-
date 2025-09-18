import { Routes, Route } from 'react-router-dom';
import DestinationDetails from "../page/DestinationDetails";

const AppRoutes = () => (
  <Routes>
    <Route path="/explore/:id" element={<DestinationDetails />} />
  </Routes>
);

export default AppRoutes;
