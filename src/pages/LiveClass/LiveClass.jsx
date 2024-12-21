import React from 'react';
import './liveclass.css';
import { createClient } from "@supabase/supabase-js";
import { useState } from 'react';
import { useEffect } from 'react';
import { message } from 'antd';

const supabase = createClient(import.meta.env.VITE_PROJECT_KEY, import.meta.env.VITE_ANON_KEY);


function LiveClass() {
    const [liveData,setLiveData] = useState([]);
    const [isEditing,setIsEditing] = useState(false);
    const [lClass,setLClass] = useState('');
    const [lTeahcer,setLTeacher] = useState('');
    const [lUrl,setLUrl] = useState('');
    const [lCourse,setLCourse] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const fetchData = async () => {
            const {data,error} = await supabase.from('live').select('*');
            if(error)
            {
                messageApi.open({
                    type: 'success',
                    content: 'Attendance Added!',
                  });
            }
            else
            {
                setLiveData(data);
            }
        }
        fetchData();
        
    },[liveData]);

    function handleClassname(e){
        setLClass(e.target.value);
    };

    function handleTeacher(e){
        setLTeacher(e.target.value);
    }

  return (
    <div>
        {contextHolder}
        LiveClass</div>
  )
}

export default LiveClass