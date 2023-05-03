import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import { BrowserRouter as Router, Routes, Route
 } from 'react-router-dom';
import Home from './components/home';
import Vehicles from './components/vehicles';
import Login from './components/auth/login';
import Protected from "./Protected";
import VehicleView from './components/vehicleView';
import Dashboard from './components/auth/dashboard';
import PostImgs from './components/post';
import VehicleType from './components/vehicleType';
function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Routes>
        <Route path='/vehiclestype/:bodyType' element={<VehicleType />} />
        <Route path='/vehicle/:groupId' element={<VehicleView/>}/>
        <Route path='/' element={<Home/>} />
        <Route path='/vehicles' element={<Vehicles/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/post' element={<PostImgs/>}/>
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
