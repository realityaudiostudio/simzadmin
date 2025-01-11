import React, { useState, useEffect } from 'react';
import './allattendance.css';
import { Button, Select, Space, Switch } from 'antd';
import { createClient } from "@supabase/supabase-js";
import { useUser } from '../../context/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import Header from '../../components/Header/Header';

const supabase = createClient(import.meta.env.VITE_PROJECT_KEY, import.meta.env.VITE_ANON_KEY);

function AllAttendance() {
  const [courseList, setCourseList] = useState([]);
  const [attendanceList, setAttendanceList] = useState({});
  const [filteredStudent, setFilteredStudent] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [eduthath, setEduthath] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useUser();
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
          userId: user.id, // Adjusted field name to match Supabase Auth
          username: user.user_metadata.username || null
        }));
        setStudentData(userData); // State to hold user-related data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    console.log("User list:", studentData);
    console.log("Course list:", courseList);
  }, [user, filteredStudent]);

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

  const handleChangeS = async (attends, student) => {
    console.log(`Switch to ${attends}`);
    const getFormattedDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Add leading zero
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const currentDate = getFormattedDate();
    const attendanceData = {
      user_id: student.userId, // Use userId here to match the correct field
      user_name: student.username,
      course: eduthath,
      is_present: attends === 'present',
      is_absent: attends === 'absent',
      date: currentDate
    };

    try {
      // Insert attendance into the 'attendance' table
      const { data, error } = await supabase.from('attendance').insert([attendanceData]);

      if (error) {
        console.log("Issues in inserting attendance:", error);
        message.error("Error inserting attendance");
      } else {
        messageApi.open({
          type: 'success',
          content: 'Attendance Added!',
        });
        console.log("Data inserted:", attendanceData);
      }
    } catch (error) {
      console.error("Error during attendance insertion:", error);
      messageApi.open({
        type: 'error',
        content: 'Unable to add',
      });
    }
  };

  return (
    <div className='allAttend'>
      {contextHolder}
      <Header title={"Attendance Sheet"}/>
      <Select
        defaultValue="select"
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
            <h3>Students</h3>
            {filteredStudent
              .sort((a, b) => a.username.localeCompare(b.username)) // Sort students alphabetically
              .map((student) => (
                <div key={student.userId}>
                  <p><strong>{student.username || "N/A"}</strong></p>
                  <Button onClick={() => handleChangeS('present', student)}>Present</Button>
                  <Button onClick={() => handleChangeS('absent', student)}>Absent</Button>
                </div>
              ))}
          </div>
        ) : (
          <div style={{ marginTop: "20px" }}>
            <h3>Select any Course</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllAttendance;
