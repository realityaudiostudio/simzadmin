import React from 'react';
import './allattendance.css';
import { Select, Space } from 'antd';
import { createClient } from "@supabase/supabase-js";
import { useState } from 'react';
import { useEffect } from 'react';
import { useUser } from '../../context/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';

const supabase = createClient(import.meta.env.VITE_PROJECT_KEY, import.meta.env.VITE_ANON_KEY);



function AllAttendance() {

    const [courseList,setCourseList] = useState([]);
    const [attendanceList,setAttendanceList] = useState({});
    const [filteredStudent, setFilteredStudent] = useState(null);
    const [studentData,setStudentData] = useState([]);
    const [eduthath,setEduthath] = useState('');
    const [cuid,setCuid] = useState([]);
    const [auid,setAuid] = useState([]);
    const {user} = useUser();
    const navigate = useNavigate();
    useEffect(() => {
      
      if (!user) {
        navigate('/');
    }
    const fetchData = async () => {
      try {
        // Fetching student details from the 'student_details' table
        const { data: courseD, error: courseE } = await supabase.from('student_details').select('*');
        if (courseE) throw courseE;
    
        // Creating a consolidated list for course user IDs and course details
        const courseData = courseD.map(item => ({
          userId: item.user_id || null,
          courses: item.courses || []
        }));
        setCourseList(courseData); // State to hold course-related data
    
        // Fetching user details from Supabase Auth
        const { data: studentD, error: studentE } = await supabase.auth.admin.listUsers();
        if (studentE) throw studentE;
    
        // Creating a consolidated list for usernames and user IDs
        const userData = studentD.users.map(user => ({
          userId: user.id, // Adjust if `id` is not the correct field
          username: user.user_metadata.username || null
        }));
        setStudentData(userData); // State to hold user-related data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    
    fetchData();
    console.log("user list",studentData);
    console.log("COurse list" ,courseList);
    },[filteredStudent]);

    const handleChange = (value) => {
      setEduthath(value);
      console.log("Selected Value:", value);
    
      // Find all students whose courses include the selected value
      const matchingCourses = courseList.filter((course) =>
        Array.isArray(course.courses) &&
        course.courses.some(
          (courseName) => courseName.toLowerCase() === value.toLowerCase()
        )
      );
    
      if (matchingCourses.length > 0) {
        console.log("Matching Course Data:", matchingCourses);
    
        // Map the user IDs of matching courses to find the corresponding students
        const matchingStudents = matchingCourses.map((course) =>
          studentData.find((student) => student.userId === course.userId)
        ).filter(Boolean); // Remove undefined entries
    
        if (matchingStudents.length > 0) {
          console.log("Matching Students:", matchingStudents);
          setFilteredStudent(matchingStudents); // Update filteredStudent with an array of matching students
        } else {
          console.warn("No matching students found for the selected course.");
          setFilteredStudent([]); // Clear filtered data
        }
      } else {
        console.warn(`The selected course "${value}" does not exist in the course list.`);
        setFilteredStudent([]); // Clear filtered data
      }
    };
    
    
    

      
  return (
    <div>
        <Select
      defaultValue="keyboard"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: 'keyboard',
          label: 'Keyboard',
        },
        {
          value: 'guitar',
          label: 'Guitar',
        },
        {
          value: 'drums',
          label: 'Drums',
        },
        {
          value: 'vocals',
          label: 'Vocals',
        }
      ]}
    />
    <div className="studentsList">
  {filteredStudent && filteredStudent.length > 0 ? (
    <div style={{ marginTop: "20px" }}>
      <h3>Matched Students</h3>
      {filteredStudent.map((student) => (
        <div key={student.userId}>
          
          <p>
            <strong></strong> {student.username || "N/A"}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <div style={{ marginTop: "20px" }}>
      <h3>All Students</h3>
      {studentData.map((user) => (
        <p key={user.userId}>
          {user.username}
          {/* Uncomment if you want to show the User ID */}
          {/* ID: {user.userId} */}
        </p>
      ))}
    </div>
  )}
</div>

    </div>
  )
}

export default AllAttendance