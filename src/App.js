import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import DiagnosticLanding from './component/DiagnosticLanding';
import Wheel from './component/Wheel';
import Email from './component/Email';


function App() {
  return (
    <Router>
       <div className="App">
      <Routes>
        <Route path="/" element={<DiagnosticLanding />} />
        <Route path='/wheel' element={<Wheel />} />
        <Route path='email' element={<Email />} />
      </Routes>
    </div>
    </Router>

  );
}

export default App;
