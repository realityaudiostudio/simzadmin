
import React from 'react';
import './lessons.css';
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useUser } from '../../context/UserContext/UserContext';

const supabase = createClient(import.meta.env.VITE_PROJECT_KEY, import.meta.env.VITE_ANON_KEY);


function Lessons() {
    const {id} = useParams();
    const[lessonData,setLessonData] = useState([]);
    const {user} = useUser();
    const navigate = useNavigate();

    useEffect (() => {
        if(!user)
        {
            navigate('/');
        }
        const fetchLesson = async () =>
        {
            const {data,error} = await supabase.from('student_details')
            .select('prev_learn')
            .eq('user_id', id)
            .single();

            if (error)
            {
                console.log("Somehtng happend !",error);
            }
            else
            {
                console.log(data);
                const aalkar = data;
                const lessons = aalkar.prev_learn || [];
                setLessonData(lessons);
            }
        }
        fetchLesson();
    },[id, user, navigate])
  return (
    <div>
        <div className="lshead">
            <p>Welcome {user?.email || 'Guest'}</p>
        </div>
        <h3>Lesson Tracking</h3>
        {lessonData.length > 0 ? (
                <div>
                    {lessonData.map((record, index) => {
                        return ( // Add return here to render the JSX properly
                            <div key={index} className="paadam">
                                <p>Grade</p>
                                <h5>{record}</h5>
                                <p>Completed</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div>No lesson records found.</div>
            )}
        
    </div>
  )
}

export default Lessons