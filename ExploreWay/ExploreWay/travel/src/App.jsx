import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./page/HomePage"; //In this way we can create page directly
import LoginPage from "./page/LoginPage"
import SignupPage from "./page/SignupPage"
import AddupPage from "./page/AddupPage"
import CardsPage from "./page/CardsPage"
import DestinationPage from "./page/DestinationPage.jsx"
import StoryPage from "./page/StoryPage"  //In this way we can create page directly with dynamic id like /story/1234567890
import EditPage from "./page/EditPage"
import MemberPage from "./page/MemberPage"
import FeedbackPage from "./page/DisscountPage.jsx" //In this way we can create page directly with dynamic id like /feedback/1234567890
import ConnectPage from "./page/ConnectPage"
import TripPage from "./page/TripPage"
import AdminPage from "./page/AdminPage" //In this way we can create page directly
import BuyPage from "./page/BuyPage" //In this way we can create page directly
// import 'bootstrap/dist/css/bootstrap.min.css';
import TestimonialPage from './page/TestimonialPage';
import { Toaster } from 'react-hot-toast';
import ContactPage from './page/ContactPage.jsx';
import DisscountPage from "./page/DisscountPage.jsx";
import AppRoutes from "./routes/AppRoutes.jsx"
import DestinationDetails from "./page/DestinationDetails.jsx";
 

const App = () => {
  return (
    <>   
     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/add" element={<AddupPage />} />
          <Route path="/card" element={<CardsPage />} />
          <Route path="/destiny" element={<DestinationPage />} />
          <Route path="/story/:id" element={<StoryPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/member" element={<MemberPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/trips" element={<TripPage/>} />
          <Route path="/admin-dashboard" element={<AdminPage/>} />
          <Route path="/buy" element={<BuyPage/>}/>
          <Route path="/testimonial" element={<TestimonialPage />}/>
          <Route path="/contact" element={<ContactPage />}/>
          <Route path="/disscount" element={<DisscountPage />}/>
          <Route path="/explore/:id" element={<DestinationDetails />} />
          
        </Routes>
        <div><Toaster/></div>
        <AppRoutes/>
      </BrowserRouter>
    </>
  )
}

export default App;
