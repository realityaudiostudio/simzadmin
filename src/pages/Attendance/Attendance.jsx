import React, { useEffect, useState } from 'react';
import './attendance.css';
import { createClient } from "@supabase/supabase-js";
import { useUser } from '../../context/UserContext/UserContext';
import { useNavigate, useParams } from 'react-router-dom';

const supabase = createClient(import.meta.env.VITE_PROJECT_KEY, import.meta.env.VITE_ANON_KEY);

function Attendance() {
    const {id} = useParams();
    const [stAtt, setStAtt] = useState([]);
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAtt = async () => {
            const { data, error } = await supabase
                .from('attendance')
                .select('*')
                .eq('user_id', id);
    
            // Log the data and error to confirm what's returned
            if (error) {
                console.error("Error fetching attendance:", error);
            } else {
                console.log("Fetched data:", data);
                setStAtt(data);
            }
        };
        fetchAtt();
    }, [id, user, navigate]);
    

    return (
        <div>
            <div className="atthead">
                <p>Welcome {user?.email || 'Guest'}</p>
            </div>
            
            {/* Render Attendance Data */}
            <div className="attendance-list">
                {stAtt.length > 0 ? (
                    stAtt.map((attendance) => (
                        <div key={attendance.id} className="attendance-item">
                            <p>Date: {attendance.date}</p>
                            <p>Status : {attendance.is_present ? (<p>Present</p>) : (<p>Absent</p>) }</p>
                        </div>
                    ))
                ) : (
                    <p>No attendance records found.</p>
                )}
            </div>
        </div>
    );
}

export default Attendance;
