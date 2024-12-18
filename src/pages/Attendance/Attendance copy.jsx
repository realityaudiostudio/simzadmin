import React, { useEffect } from 'react';
import './attendance.css';
import { createClient } from "@supabase/supabase-js";
import { useUser } from '../../context/UserContext/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
// import { useStudent } from '../../context/StudentContext/StudentContext';
import { useState } from 'react';

const supabase = createClient(import.meta.env.VITE_PROJECT_KEY, import.meta.env.VITE_ANON_KEY);

function Attendance() {
    const {id} = useParams();
    const [stAtt,setStAtt] = useState([]);
    const [attendanceStatus, setAttendanceStatus] = useState([]);
    const [lessonsStatus, setLessonsStatus] = useState([]);
    const { user } = useUser();
    // const { students } = useStudent(); // students should be passed via context
    const navigate = useNavigate();

    useEffect(() => {
        // console.log("Attendance Page - Students Context:", students);
        // // Check if user is logged in
        // if (!user) {
        //   navigate('/'); // Redirect to home if user is not logged in
        // }
    
        // // Log the students context to verify the data
        // console.log("the incoming data ",students);
        // console.log("students attendance", students?.attendance);

        const fetchAtt = async () => {
            const {data,error} = await supabase.from('attendance')
            .select('*')
            .eq('user_id', id)

            if(error)
            {
                console.log("Somehtin gisseue",error);
            }
            else {
                setStAtt(data);
                console.log(data);
                // const aalkar = data;

                // Set attendanceStatus based on fetched data
                // const attStatus = Array.isArray(aalkar.attendance_details?.data)
                //     ? aalkar.attendance_details.data.map(record => ({
                //         attDate: new Date(parseInt(record.date) * 1000).toLocaleDateString(),
                //         attStatus: record.is_present ? "Present" : record.is_absent ? "Absent" : "Unknown",
                //     }))
                //     : [];

                // setAttendanceStatus(attStatus);

                // Use prev_learn field for lessons
                // const lessons = aalkar.prev_learn || [];
                // setLessonsStatus(lessons);
            }
            
    // console.log("Combined Data:", combinedData);
    
                // Use prev_learn field for lessons
        };
        fetchAtt();
        console.log("ntharu",stAtt);
      }, [id, user, navigate]);

    return (
        <div>
            <div className="atthead">
                <p>Welcome {user?.email || 'Guest'}</p>
            </div>
            {attendanceStatus.length > 0 ?(<div className="attbod">
      <h3>Attendance</h3>
      <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceStatus.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.attStatus}</td>
                                    <td>{record.attDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    </div>):(<div>No attendance records found.</div>)}
            {/* Check if students and students.attendance exist */}
            {/* {students?.attendance?.length > 0 ? (
  students.attendance.map((record, index) => (
    <div key={index} className="attbod">
      <h3>Attendance</h3>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{record.attStatus}</td>
            <td>{record.attDate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ))
) : (
  <div>No attendance records found.</div>
)} */}


            {/* Example static fallback table */}
                {/* <div className="attbod">
                    <h3>Attendance</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Present</td>
                                <td>12/12/2024</td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}
        </div>
    );
}

export default Attendance;
