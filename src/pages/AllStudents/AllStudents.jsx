import React from 'react';
import { createClient } from "@supabase/supabase-js";
import "./allstudents.css";
import { useState } from 'react';
import { useEffect } from 'react';
import { Flex, Tag , Input , Button } from 'antd';

const supabase = createClient(import.meta.env.VITE_PROJECT_KEY, import.meta.env.VITE_ANON_KEY);
const tagsData = ['Guitar', 'Keyboard', 'Drums', 'Vocals'];

function AllStudents() {

    const[studentsData,setStudentsData] = useState([]);
    const [selectedTags, setSelectedTags] = React.useState([]);
    // const [filteredStudents, setFilteredStudents] = useState([]);
    // const [searchText, setSearchText] = useState(""); 
    // Handle tag selection
    const handleChange = (tag, checked) => {
      const nextSelectedTags = checked
        ? [...selectedTags, tag]
        : selectedTags.filter((t) => t !== tag);
      // console.log('You are interested in: ', nextSelectedTags);
      setSelectedTags(nextSelectedTags);
    };

    const filteredStudents = selectedTags.length
        ? studentsData.filter((student) =>
              student.courses.some((course) => selectedTags.includes(course))
          )
        : studentsData;

 

    useEffect(()=>{
        const fetchStudents = async ()=>{
          try {
            // Step 1: Fetch data from `students_details`
            const { data: studentsData, error: studentsError } = await supabase
                .from('student_details')
                .select('*'); // Ensure `user_id` is included

            if (studentsError) {
                throw studentsError;
            }

            // Step 2: Fetch user data using `auth.admin.listUsers()` (requires service role key)
            const { data: authUsers, error: usersError } = await supabase.auth.admin.listUsers();

            if (usersError) {
                throw usersError;
            }

            // Step 3: Combine the `students_details` data with the `auth.users` data
            const combinedData = studentsData.map(student => {
                const userDetails = authUsers.users.find(user => user.id === student.user_id);
                return { ...student, user: userDetails };
            });

            setStudentsData(combinedData);
            console.log(combinedData);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching data:', err);
        }
        }
        fetchStudents();
    },[]);

    

  return (
    <div>
        <div className="sthead">
            <p>Welcome Simjo V Geroge</p>
            <h2>Student Data</h2>
        </div>
        <div className="stsearch">
            <label>Search Data
                <Input size='10px' type='text'></Input>
            </label>
            <Button>Submit</Button>
        </div>
        <div className="stfilter">
            <Flex gap={4} wrap align="center">
                 <span>Categories:</span>
                {tagsData.map((tag) => (
            <Tag.CheckableTag
            key={tag}
            checked={selectedTags.includes(tag)}
            onChange={(checked) => handleChange(tag, checked)}
            >
            {tag}
            </Tag.CheckableTag>
                ))}
                 </Flex>
        </div>
        <div className="sttemplate">
            {/*All about the template and here we should work for mapping */}
            {filteredStudents.map((student, index) => (
            <div key={index} className="stinduvidual">
                <p>Since</p>
                <h5>{student.user?.user_metadata?.username || 'Unknown'}</h5>
                <p>{Array.isArray(student.courses) 
                    ? student.courses.join(', ') 
                    : 'No courses available'} Student</p>
                <div className="stlearning">
                    <p>Grade {student.lessons}</p>
                    <h5>Sky Boat Song</h5>
                    <p>In Progress</p>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default AllStudents