import React from 'react';
import './recordedclass.css';
import { createClient } from "@supabase/supabase-js";
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'antd';
import { Input } from 'antd';
import { message } from 'antd';

const supabase = createClient(import.meta.env.VITE_PROJECT_KEY, import.meta.env.VITE_ANON_KEY);


function RecordedClass() {
    const [recData,setRecData] = useState([]);
    const [isEditing,setIsEditing] = useState(false);
    const [videoName,setVideoName]  = useState('');
    const [videoDesc,setVideoDesc]  = useState('');
    const [videoUrl,setVideoUrl]  = useState('');
    const [videoCourse,setVideoCourse]  = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    

    const hname = (e) => {
        setVideoName(e.target.value);
    }

    const hdesc = (e) => {
        setVideoDesc(e.target.value);
    }
    const hurl = (e) => {
        setVideoUrl(e.target.value);
    }
    const hcourse = (e) => {
        setVideoCourse(e.target.value);
    }
    function openEdit(){
        setIsEditing(true);
    };

    const handleFormData = async (e) => {
        e.preventDefault();
    
        try {
            const { data, error } = await supabase.from('test_video_player').insert({
                video_name: videoName,
                video_url: videoUrl.toLowerCase(),
                video_description: videoDesc,
                video_course: videoCourse.toLowerCase(),
            });
    
            if (error) {
                throw error;
            }
    
            message.success("Added Successfully!");
            alert("Data added!");
            setRecData((prevData) => [...prevData, data]); // Update local state
        } catch (error) {
            // message.error(`Error: ${error.message}`);
            alert("Failed");
            console.error("Submit Error:", error);
        } finally {
            setIsEditing(false);
        }
    };
    


    useEffect(()=>
    {
        const fetchData = async ()=>
        {
            const {data,error} = await supabase.from('test_video_player').select('*');

            if(error)
            {
                console.log("Something issues",error);
            }
            else
            {
                // console.log("data arrived",data);
                setRecData(data);
            }
        }
        fetchData();
    },[recData])

  return (

    <div>
        <h3>Recorded Classes</h3>
        {recData.map((recdat,index)=>
        (<div key={index} className="listrec">
            <h3>{recdat.video_name}</h3>
            <p>{recdat.video_description}</p>
            <a href={recdat.video_url}>Play</a>
        </div>)
        )}
        <Button onClick={openEdit}>Add video</Button>
        {isEditing && (
            <div className="editer">
                <Input name='video_name' onChange={hname} type='text' placeholder='Video name'></Input>
                <Input name='video_description' onChange={hdesc} type='text' placeholder='Video Description'></Input>
                <Input name='video_url' onChange={hurl} type='text' placeholder='Video link'></Input>
                <Input name='video_course' onChange={hcourse} type='text' placeholder='Video course'></Input>
                <Button onClick={handleFormData}>Add</Button>
            </div>
        )}
    </div>
  )
}

export default RecordedClass