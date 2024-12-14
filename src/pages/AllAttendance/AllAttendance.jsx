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
    const [studentData,setStudentData] = useState([]);
    const [eduthath,setEduthath] = useState('');
    const [cuid,setCuid] = useState([]);
    const [auid,setAuid] = useState([]);
    const {user} = useUser();
    const navigate = useNavigate();
    useEffect(() => {
      
    //   if (!user) {
    //     navigate('/');
    // }
    const fetchData = async () => {
      const {data : courseD,error : courseE} = await supabase.from('student_details').select('*');
      const courseDetails = courseD.flatMap(item => item.courses || []);
      const cuserid = courseD.flatMap(item=>item.user_id || []);
      setCourseList(courseDetails);
      setCuid(cuserid);

      const { data: studentD, error: studentE } = await supabase.auth.admin.listUsers();
      console.log(studentD.users.map(user => user.user_metadata.username));
      const userNames = studentD.users.map(user => user.user_metadata.username);
      const allIds = studentD.aud;
      setStudentData(userNames);
      setAuid(allIds);
      
    }
    
    fetchData();
    console.log("user list",auid);
    },[]);

    const handleChange = (value) => {
        // console.log(`selected ${value}`);
        setEduthath(value);
        console.log(eduthath);
        const isMatch = courseList.some((course) => course.toLowerCase() === value.toLowerCase());

  if (isMatch) {
    console.log(`The selected course "${value}" exists in the course list.`);
  } else {
    console.log(`The selected course "${value}" does not exist in the course list.`);
    return isMatch;
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
      
    {studentData.length > 0 ? (
                    studentData.map((username, index) => (
                        <div className="aalukal" key={index}>
                            <p>{username}</p>
                        </div>
                    ))
                ) : (
                    <p>No students found.</p>
                )}
=
    </div>
    </div>
  )
}

export default AllAttendance