import './App.css';
import {Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Navbar from './Components/Navbar';



function App() {
  return (
    <>
      <Navbar/>
      <div className='Container'>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/chatapp" element={<Chat />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </>
    
    
  );
}

export default App;
