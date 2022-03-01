import { Route, Routes } from 'react-router-dom';
import './App.css';
import Current from './components/Current';
import InputSection from './components/InputSection';
import Navbar from './components/Navbar';
import ThreeDays from './components/ThreeDays'

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<InputSection />}>
          <Route path='current' element={<Current />} />
          <Route path='days' element={<ThreeDays />} />
        </Route>
        <Route path='*' element={<div><p>404 Page Not Found</p></div>} />
      </Routes>
    </div>
  );
}

export default App;
