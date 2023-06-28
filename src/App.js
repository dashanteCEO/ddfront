import './App.css';
import Header from './components/header';
import { BrowserRouter as Router, Routes, Route
 } from 'react-router-dom';
import Home from './components/home';
import Vehicles from './components/vehicles';
import Login from './components/auth/login';
import Protected from "./Protected";
import Post from './components/post';
import VehicleView from './components/vehicleView';
import VehicleType from './components/vehicleType';
import Dashboard from './components/auth/dashboard';
import Footer from './components/footer'
import SearchBrand from './components/searchBrand';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/vehicles' element={<Vehicles/>} />
        <Route path='/vehiclestype/:bodyType' element={<VehicleType/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/vehicle/:groupId' element={<VehicleView/>}/>
        <Route element={<Protected/>}>
        <Route path='/search/:brand' element={<SearchBrand/>}/>
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
        <Route path='/post' element={<Post/>}/>
        </Route>
        </Routes>
      </Router>
      <Footer/>
    </div>
  ); 
}

export default App;
