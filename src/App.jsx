import React from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Dashboard from './pages/Dashboard/Dashboard';
import Syllabus from './pages/Syllabus/Syllabus';
import Quiz from './pages/Quiz/Quiz';
import Sheets from './pages/Sheets/Sheets';
import Practice from './pages/Practice/Practice';
import AllStudents from './pages/AllStudents/AllStudents';
import Login from './pages/Login/Login';
import { UserProvider } from './context/UserContext/UserContext';
import ProtectedRoute from './context/Protected/ProtectedRoute';


function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/syllabus" element={<Syllabus/>} />
          <Route path="/quiz" element={<Quiz/>} />
          <Route path="/sheets" element={<Sheets/>} />
          <Route path="/practice" element={<Practice/>} />
          <Route path='/allstudents' element={<ProtectedRoute><AllStudents/></ProtectedRoute>}/>
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      </Routes>
    </Router>
    </UserProvider>
  )
}

export default App
