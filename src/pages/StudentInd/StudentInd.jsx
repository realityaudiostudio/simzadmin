import React from 'react';
import './studentind.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext/UserContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import { useStudent } from '../../context/StudentContext/StudentContext';
import { EditOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

const supabase = createClient(import.meta.env.VITE_PROJECT_KEY, import.meta.env.VITE_ANON_KEY);


function StudentInd() {
    const { id } = useParams();
    const [studentInd,setStudentInd] = useState(null);
    const {user} = useUser();
    const {students,studentOnly} = useStudent();
    const [isEditing,setIsEditing] = useState(false);
    const [formData ,setFormData] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        
        if (!user) {
            navigate('/');
        }
    
        const fetchData = async () => {
            try {
                // Fetch single student details
                const { data: studentDetails, error: studentError } = await supabase
                    .from('student_details')
                    .select('*')
                    .eq('user_id', id)
                    .single();
    
                if (studentError) {
                    console.log('Error fetching student details:', studentError);
                    return;
                }
    
                // Fetch all users from auth
                const { data: authUsers, error: usersError } = await supabase.auth.admin.listUsers();
    
                if (usersError) {
                    console.log('Error fetching users:', usersError);
                    return;
                }
    
                // Combine the single student data with the corresponding auth user data
                const userDetails = authUsers.users.find(user => user.id === studentDetails.user_id);
    
                // Add user details to the student object
                const combinedData = { ...studentDetails, user: userDetails };
    
                // Ensure attendance_details is an array
                const attendance = Array.isArray(combinedData.attendance_details?.data)
    ? combinedData.attendance_details.data.map(record => ({
        attDate: new Date(parseInt(record.date) * 1000).toLocaleDateString(),
        attStatus: record.is_present ? "Present" : record.is_absent ? "Absent" : "Unknown",
    }))
    : []; // Default to an empty array if `attendance_details.data` is not an array

    // console.log("Combined Data:", combinedData);
    
                // Use prev_learn field for lessons
                const lessons = combinedData.prev_learn || [];
    
                // Set state
                setStudentInd(combinedData);
                studentOnly(attendance, lessons);
                // console.log("Setting Data",attendance,lessons);
            } catch (error) {
                console.error('Unexpected error:', error);
            }
        };
    
        fetchData();
    }, [id, user, studentOnly, navigate,studentInd]);

    const handleEdit = () => {
        setFormData({
            username: studentInd.user?.user_metadata?.username || "",
            fee_due: studentInd.fee_due || "",
            grade_completed: studentInd.grade_completed || "",
            courses: studentInd.courses ? studentInd.courses.join(', ') : "", // Convert array to string
        });
        setIsEditing(true);
    };
    
    
    const handleForm = async (e) => {
        e.preventDefault();
    
        // Convert `courses` back to an array before saving
        const updatedCourses = formData.courses.split(',').map(course => course.trim());
    
        try {
            // Update the user metadata
            const { error: stError } = await supabase.auth.admin.updateUserById(studentInd.user_id, {
                user_metadata: {
                    ...studentInd.user.user_metadata,
                    username: formData.username || studentInd.user.user_metadata.username,
                },
            });
    
            if (stError) {
                console.error("Error updating username:", stError);
                return;
            }
    
            // Update student details in the database
            const { error: errBakki } = await supabase
                .from("student_details")
                .update({
                    fee_due: formData.fee_due,
                    grade_completed: formData.grade_completed,
                    courses: updatedCourses, // Save as an array
                })
                .eq('user_id', studentInd.user_id);
    
            if (errBakki) {
                console.error("Error updating student details:", errBakki);
                return;
            }
    
            // Update local state after a successful save
            setStudentInd((prevState) => ({
                ...prevState,
                fee_due: formData.fee_due,
                grade_completed: formData.grade_completed,
                courses: updatedCourses, // Update local state with array
            }));
    
            setIsEditing(false); // Exit editing mode
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };
    
    
    


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value, // Keep `courses` as a string during editing
        }));
    };
    
    
    
    

  return (
    <div>
        {studentInd ? (
            <div key={studentInd.user_id}>
            <div className="stindhead">
    <h3>{studentInd.user?.user_metadata?.username || 'Unknown'}</h3>
    <p>{Array.isArray(studentInd.courses) 
              ? studentInd.courses.join(', ') 
              : 'No courses available'} Student</p>
    <Link to={`/attendance/${studentInd.user_id}`}>Attendance </Link>
    <Link to={`/lessons/${studentInd.user_id}`}>Lessons</Link>
    <p>Grade Covered : {studentInd.grade_completed}</p>
    <p>Fee due : Rs.{studentInd.fee_due}</p>
    <EditOutlined onClick={handleEdit} />
    </div>
    <div className="stindbadge">
        <h5>Badges Gained</h5>
        <ul>
            <li>Red Badge</li>
            <li>Green badge</li>
        </ul>
    </div>
    <div className="stindcertificate">
    <h5>Certificates Earned</h5>
        <ul>
            <li>Initial </li>
            <li>1</li>
        </ul>
    </div>
        </div>
        ) : (<div className="loader-container"><div className='loaderAllSTI'></div></div>)}
        {/* <div className="stindhead">
        <h3>Alan Jose Santo</h3>
        <p>Keyboard Student</p>
        <Link to='/attendance'>Attendance </Link>
        <Link to='/lessons'>Lessons</Link>
        <p>Grade Covered : GRADE 2</p>
        <p>Fee due : Rs.2000</p>
        </div>
        <div className="stindbadge">
            <h5>Badges Gained</h5>
            <ul>
                <li>Red Badge</li>
                <li>Green badge</li>
            </ul>
        </div>
        <div className="stindcertificate">
        <h5>Certificates Earned</h5>
            <ul>
                <li>Initial </li>
                <li>1</li>
            </ul>
        </div> */}
        {/* editing space */}

        {isEditing && (
    <div className="editingspace">
        <Input name="username" type="text" onChange={handleInputChange} placeholder="Update Name" value={formData.username || ""} />
        <Input name="fee_due" type="text" onChange={handleInputChange} placeholder="Enter Fee Due" value={formData.fee_due || ""} />
        <Input name="grade_completed" type="text" onChange={handleInputChange} placeholder="Enter Grade" value={formData.grade_completed || ""} />
        <Input name="courses" type="text" onChange={handleInputChange} placeholder="Enrolled Courses" value={formData.courses || ""} />
        <Button onClick={handleForm}>Save</Button>
    </div>
)}

        {/* Editing space end */}
    </div>
  )
}

export default StudentInd