import React from 'react';
import './feepage.css';
import { useState,useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useUser } from '../../context/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button } from 'antd';
import { Input } from 'antd';

const supabase = createClient(import.meta.env.VITE_PROJECT_KEY, import.meta.env.VITE_ANON_KEY);


function FeePage() {
    const [feeData,setFeeData] = useState([]);
    const [formData,setFormData]  = useState([]);
    const [isEditing,setIsEditing]  = useState(false);

    useEffect(()=> {
        const fetchFee = async () => {
            const {data,error}  = await supabase.from('fee').select('*');
            // console.log(data);
            setFeeData(data);
        }
        fetchFee();
        // console.log(feeData);
    });
    const handleAdd = () => {
        setIsEditing(true);
    }
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value, // Keep `courses` as a string during editing
        }));
    };
    const handleForm = async (e) => {
        e.preventDefault();

        const [data,error ] = await supabase.from('fee').insert({  name: 'Denmark' })
    }

  return (
    <div>
        <h3>Fee Details</h3>
        {feeData.map((feed,index) =>(
            <div key={index} className="feedata">
            <p>{feed.email}</p>
            <p>{feed.Course}</p>
            <p>{dayjs(feed.created_at).format('DD-MM-YYYY HH:mm A')}</p>
            <p>{feed.amount}</p>
        </div>
        ))}
        <Button onClick={handleAdd}>Add Fee</Button>
        {isEditing && (
            <div className="edit">
                <Input name="email" type="text" onChange={handleInput} placeholder='email'></Input>
                <Input name='Course' type='text' onChange={handleInput} placeholder='Course'></Input>
                <Input name='amount' type='text' onChange={handleInput} placeholder='amount'></Input>
                <Button >Add</Button>
            </div>
        )}
    </div>
  )
}

export default FeePage