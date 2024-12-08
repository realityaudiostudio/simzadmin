import React from 'react';
import { createClient } from "@supabase/supabase-js";
import "./allstudents.css";
import { useState } from 'react';
import { useEffect } from 'react';
import { Flex, Tag , Input , Button } from 'antd';
import { useUser } from '../../context/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(import.meta.env.VITE_PROJECT_KEY, import.meta.env.VITE_ANON_KEY);
const tagsData = ['Guitar', 'Keyboard', 'Drums', 'Vocals'];

function AllStudents() {

    const[studentsData,setStudentsData] = useState([]);
    const [selectedTags, setSelectedTags] = React.useState([]);
    const[loading,setLoading] = useState(false);
    // const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchText, setSearchText] = useState(""); 
    const {user} = useUser();
    const navigate = useNavigate();
    // Handle tag selection
    const handleChange = (tag, checked) => {
      const nextSelectedTags = checked
        ? [...selectedTags, tag]
        : selectedTags.filter((t) => t !== tag);
      // console.log('You are interested in: ', nextSelectedTags);
      setSelectedTags(nextSelectedTags);
    };
    const handleSearch = (e) =>
    {
      setSearchText(e.target.value);
      
    }
    // const searchStudents = searchText.length
    // ? studentsData.filter((student) =>
    //   student.user.user_metadata.username.some((username) => searchText.includes(username))
    //       )
    //       : studentsData;


    // const filteredStudents = selectedTags.length
    //     ? studentsData.filter((student) =>
    //           student.courses.some((course) => selectedTags.includes(course))
    //       )
    //     : studentsData;

    const combinedFilteredStudents = studentsData.filter((student) => {
      // Check if the student matches the search text (if searchText is provided)
      const matchesSearch = searchText.length
          ? student.user?.user_metadata?.username.toLowerCase().includes(searchText.toLowerCase())
          : true;  // If no search text, consider all students as a match
  
      // Check if the student matches the selected course tags (if selectedTags are selected)
      const matchesCourses = selectedTags.length
          ? student.courses.some((course) => selectedTags.includes(course))
          : true;  // If no selected tags, consider all students as a match
  
      return matchesSearch && matchesCourses;  // Only include students who match both criteria
  });
 
  
    

    useEffect(()=>{
      if(!user)
        {
          navigate('/');
        }
        const fetchStudents = async ()=>{
          try {
            setLoading(true);
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
        setLoading(false);
        }
        fetchStudents();
    },[]);

    

  return (
    <div>
        <div className="sthead">
        <p>Welcome {user?.email || 'Guest'}</p>
            <h2>Student Data</h2>
        </div>
        <div className="stsearch">
            <label>Search Data
                <Input style={{margin:"10px" , width : "250px",height : "40px"}} onChange={handleSearch} size='10px' type='text'></Input>
            </label>
            {/* <Button onClick={handleSearch}>Submit</Button> */}
        </div>
        <div  className="stfilter">
            <Flex gap={4} wrap align="center">
                 
                {tagsData.map((tag) => (
            <Tag.CheckableTag
            key={tag}
            checked={selectedTags.includes(tag)}
            onChange={(checked) => handleChange(tag, checked)}
            style={{
              backgroundColor: selectedTags.includes(tag) ? 'violet' : '',  // Set violet color when checked
              color: selectedTags.includes(tag) ? 'white' : '',
              margin:"10px"  // Change text color to white when checked
            }}
            >
            {tag}
            </Tag.CheckableTag>
                ))}
                 </Flex>
        </div>
        {loading ? (<div className="loader-container"><div className='loaderAllST'></div></div>) : (
          <div className="sttemplate">
          {/*All about the template and here we should work for mapping */}
          {combinedFilteredStudents.map((student, index) => (
          <div key={index} className="stinduvidual">
              <p>Since {student.year_adm}</p>
              <h5>{student.user?.user_metadata?.username || 'Unknown'}</h5>
              <p>{Array.isArray(student.courses) 
                  ? student.courses.join(', ') 
                  : 'No courses available'} Student</p>
              <div className="stlearning">
                  <p>Grade {student.lessons}</p>
                  <h5>{Array.isArray(student.curr_learn) 
                    ?student.curr_learn[0] : "Not Learning Now !"}</h5>
                  <p>{Array.isArray(student.curr_learn) 
                    ?student.curr_learn[1] : "No Progress !"}</p>
              </div>
          </div>
          ))}
      </div>
        )}
        
    </div>
  )
}

export default AllStudents