import React from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Dashboard from './pages/Dashboard/Dashboard';
import Syllabus from './pages/Syllabus/Syllabus';
import Quiz from './pages/Quiz/Quiz';
import Sheets from './pages/Sheets/Sheets';
import Practice from './pages/Practice/Practice';


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/syllabus" element={<Syllabus/>} />
          <Route path="/quiz" element={<Quiz/>} />
          <Route path="/sheets" element={<Sheets/>} />
          <Route path="/practice" element={<Practice/>} />
      </Routes>
    </Router>
  )
}

export default App
