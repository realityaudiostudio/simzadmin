
import React from 'react';
import './lessons.css';
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useUser } from '../../context/UserContext/UserContext';
import { EditOutlined } from '@ant-design/icons';
import { Button, Input,message } from 'antd';

const supabase = createClient(import.meta.env.VITE_PROJECT_KEY, import.meta.env.VITE_ANON_KEY);


function Lessons() {
    const {id} = useParams();
    const[lessonData,setLessonData] = useState({});
    const {user} = useUser();
    const navigate = useNavigate();
    const [formData ,setFormData] = useState('');
    const [isEditing,setIsEditing] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [gradeInfo,setGradeInfo] = useState('');
    const [currInfo,setCurrInfo] = useState('');


    useEffect (() => {
        // console.log("paadam 1",lessonData.lessons);

        if(!user)
        {
            navigate('/');
        }
        const fetchLesson = async () =>
        {
            const {data,error} = await supabase.from('student_details')
            .select('prev_learn,grade_completed,curr_learn')
            .eq('user_id', id)
            .single();

            if (error)
            {
                console.log("Somehtng happend !",error);
            }
            else
            {
                console.log("Nthokke ind",data);
                const aalkar = data;
                const lessons = aalkar.prev_learn || [];
                const gradeOver = aalkar.grade_completed;
                const curr_less = aalkar.curr_learn?aalkar.curr_learn[0] : " ";
                setLessonData(lessons);
                setGradeInfo(gradeOver);
                setCurrInfo(curr_less);
                console.log(lessons);
                console.log("ippo ntha vecha",curr_less);
            }
        }
        fetchLesson();
        console.log("Lesson mang",lessonData);
    },[id, user, navigate]);

    const handleAdd = () => {
        
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setFormData(e.target.value);
    };

    const handleForm = async (e) => {
        e.preventDefault();
        if(e ===null)
        {
            setIsEditing(false);
        }
        else{

            const currentLessons = lessonData;
        const updatedLessons = [...currentLessons,formData];

        const {data,error} = await supabase.from('student_details').update({
            prev_learn: updatedLessons,
        }).eq('user_id',id);
        if(error)
        {
            console.log("Supabase error" ,error);
        }
        else
        {
            messageApi.open({
                type: 'success',
                content: 'Lesson Added!',
              });
            console.log(data);
        }
        // setLessonData([...lessonData, FormData]);
        setLessonData(prevLessonData => [...prevLessonData, formData]);
        console.log("Nthapindaye",lessonData);
setIsEditing(false);
        }
        
        
        
    }

  return (
    <div>
    {contextHolder}
        <div className="lshead">
            <p>Welcome {user?.email || 'Guest'}</p>
        </div>
        <h3>Lesson Tracking</h3>
        <p>Your Current Grade :{gradeInfo}</p>
        <p>Your Current Lesson :{currInfo}</p>
        {lessonData.length > 0 ? (
                <div>
                    {lessonData.map((record, index) => {
                        return ( // Add return here to render the JSX properly
                            <div key={index} className="paadam">
                                <p>Lesson {index+1}</p>
                                <h5>{record}</h5>
                                <p>Completed</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div>No lesson records found.</div>
            )}
        <EditOutlined onClick={handleAdd} />
        {isEditing && (
            <div className="addLesson">
                <Input name="prev_learn" type='text' onChange={handleInputChange} placeholder='Add Lesson'></Input>
                <Button onClick={handleForm}>Add Lesson</Button>
            </div>
        )}
    </div>
  )
}

export default Lessons