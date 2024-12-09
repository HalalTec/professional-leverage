import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import Home from './component/Home';
import Wheel from './component/Wheel';
import Email from './component/Email';


function App() {
  return (
    <Router>
       <div className="App">
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path='/wheel' element={<Wheel />} />
        <Route path='email' element={<Email />} />
      </Routes>
    </div>
    </Router>
   
  );
}

export default App;
