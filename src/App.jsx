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
import StudentInd from './pages/StudentInd/StudentInd';
import Attendance from './pages/Attendance/Attendance';
import { StudentProvider } from './context/StudentContext/StudentContext';
import Lessons from './pages/Lessons/Lessons';

import AllAttendance from './pages/AllAttendance/AllAttendance';
import FeePage from './pages/FeePage/FeePage';


function App() {
  return (
    <UserProvider>
      <StudentProvider>
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/syllabus" element={<Syllabus/>} />
          <Route path="/quiz" element={<Quiz/>} />
          <Route path="/sheets" element={<Sheets/>} />
          <Route path="/practice" element={<Practice/>} />
          <Route path="/allattendance" element={<AllAttendance/>} />
          <Route path="/feedetails" element={<FeePage/>} />
          <Route path='/allstudents' element={<ProtectedRoute><AllStudents/></ProtectedRoute>}/>
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path='/eachstudent/:id' element={<ProtectedRoute><StudentInd/></ProtectedRoute>}/>
          <Route path='/attendance/:id' element={<ProtectedRoute><Attendance/></ProtectedRoute>}/>
          <Route path='/lessons/:id' element={<ProtectedRoute><Lessons/></ProtectedRoute>}/>

      </Routes>
    </Router>
    </StudentProvider>
    </UserProvider>
  )
}

export default App
