import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import ForgotPasswordPage from './pages/forgotPassword';
import ResetPasswordPage from './pages/resetPassword';
import SuccessPage from './components/Success';
import MyProfilePage from './pages/myProfile';
import DiscoverPlantsPage from './pages/discoverPlants';
import IdentifyPlantPage from './pages/identifyPlant';
import TodaysPlanPage from './pages/todaysPlan';
import UpdatePlanPage from './pages/updatePlan';
import ContactPage from './pages/contact';
import Admin from './pages/admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/signUp' element={<SignUpPage />}/>
        <Route path='/forgotPassword' element={<ForgotPasswordPage />}/>
        <Route path='/resetPassword' element={<ResetPasswordPage />}/>
        <Route path='/SuccessPage' element={<SuccessPage />}/>
        <Route path="/signIn" element={<SignInPage/>}/>
        <Route path="/myProfile" element={<MyProfilePage/>}/>
        <Route path="/discoverPlants" element={<DiscoverPlantsPage/>}/>
        <Route path="/identifyPlant" element={<IdentifyPlantPage/>}/>
        <Route path="/todaysPlan" element={<TodaysPlanPage/>}/>
        <Route path="/updatePlan" element={<UpdatePlanPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path='/adminDashboard' element={<Admin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
