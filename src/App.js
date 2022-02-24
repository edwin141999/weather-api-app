import { Route, Routes } from 'react-router-dom';
import './App.css';
import Current from './components/Current';
import Navbar from './components/Navbar';
import ThreeDays from './components/ThreeDays'

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Current />} />
        <Route path='days' element={<ThreeDays />} />
      </Routes>
    </div>
  );
}

export default App;
