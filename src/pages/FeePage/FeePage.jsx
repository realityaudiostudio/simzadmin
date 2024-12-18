import React, { useState, useEffect } from 'react';
import './feepage.css';
import { createClient } from '@supabase/supabase-js';
import { Button, Input, AutoComplete, message } from 'antd';
import dayjs from 'dayjs';

const supabase = createClient(import.meta.env.VITE_PROJECT_KEY, import.meta.env.VITE_ANON_KEY);

function FeePage() {
  const [feeData, setFeeData] = useState([]);
  const [formData, setFormData] = useState({});
  const [options, setOptions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch fee data
  useEffect(() => {
    const fetchFee = async () => {
      const { data, error } = await supabase.from('fee').select('*');
      if (error) {
        console.error('Error fetching fee data:', error);
        return;
      }
      setFeeData(data);
    };

    fetchFee();
  }, [feeData]);

  // Fetch users for AutoComplete
  useEffect(() => {
    const fetchEmails = async () => {
      const { data, error } = await supabase.from('users_with_id').select('email');
      if (error) {
        console.error('Error fetching user emails:', error);
        return;
      }
      setOptions(data.map((item) => ({ value: item.email })));
    };

    fetchEmails();
  }, []);

  const handleAdd = () => {
    setIsEditing(true);
  };

  const handleInput = (value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');

    // Fetch user ID based on selected email
    const { data: authData, error: authError } = await supabase
      .from('users_with_id')
      .select('id')
      .eq('email', formData.email);

    if (authError) {
      console.error('Error fetching user ID:', authError);
      return;
    }

    const userUid = authData?.[0]?.id || null;
    if (!userUid) {
      message.error('User not found');
      return;
    }

    // Insert fee data
    const { error } = await supabase.from('fee').insert({
      user_id: userUid,
      email: formData.email,
      course: formData.Course,
      amount: formData.amount,
      created_at: currentDate,
    });

    if (error) {
      console.error('Error inserting fee data:', error);
      message.error('Failed to add fee details');
    } else {
      message.success('Fee details added successfully!');
      setIsEditing(false);
    }
  };

  return (
    <div>
      <h3>Fee Details</h3>
      {feeData.map((feed, index) => (
        <div key={index} className="feedata">
          <p>{feed.email}</p>
          <p>{feed.course}</p>
          <p>{dayjs(feed.created_at).format('DD-MM-YYYY HH:mm A')}</p>
          <p>{feed.amount}</p>
        </div>
      ))}
      <Button onClick={handleAdd}>Add Fee</Button>
      {isEditing && (
        <div className="edit">
          <AutoComplete
            style={{ width: 200 }}
            options={options}
            placeholder="Enter or select an email"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            onChange={(value) => handleInput(value, 'email')}
          />
          <Input
            name="Course"
            type="text"
            onChange={(e) => handleInput(e.target.value, 'Course')}
            placeholder="Course"
          />
          <Input
            name="amount"
            type="number"
            onChange={(e) => handleInput(e.target.value, 'amount')}
            placeholder="Amount"
          />
          <Button onClick={handleForm}>Add</Button>
        </div>
      )}
    </div>
  );
}

export default FeePage;
