import React, { useState, useEffect } from "react";
import "./allattendance.css";
import { Button, Select, message } from "antd";
import { createClient } from "@supabase/supabase-js";
import { useUser } from "../../context/UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ava from "../../assets/ava.svg";
import thoppi from "../../assets/thoppi.svg";

const supabase = createClient(
  import.meta.env.VITE_PROJECT_KEY,
  import.meta.env.VITE_ANON_KEY
);

function AllAttendance() {
  const [courseList, setCourseList] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [filteredStudent, setFilteredStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [currentTime, setCurrentTime] = useState(null);
  const [clockInterval, setClockInterval] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const { user } = useUser();
  const navigate = useNavigate();

  const truncate = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // Format to human-readable date/time
  const formatDateTime = (date) =>
    new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }).format(date);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const { data: courseD, error: courseE } = await supabase
          .from("student_details")
          .select("*");
        if (courseE) throw courseE;

        const courseData = courseD.map((item) => ({
          userId: item.user_id || null,
          courses: item.courses || [],
        }));
        setCourseList(courseData);

        const { data: studentD, error: studentE } =
          await supabase.auth.admin.listUsers();
        if (studentE) throw studentE;

        const userData = studentD.users.map((user) => ({
          userId: user.id,
          username: user.user_metadata.username || null,
        }));
        setStudentData(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Cleanup on component unmount
    return () => {
      if (clockInterval) clearInterval(clockInterval);
    };
  }, [user]);

  const handleChange = (value) => {
    setSelectedCourse(value);

    // Start live clock
    if (clockInterval) clearInterval(clockInterval);
    const interval = setInterval(() => {
      setCurrentTime(formatDateTime(new Date()));
    }, 1000);
    setClockInterval(interval);

    // Filter students based on selected course
    const matchingCourses = courseList.filter(
      (course) =>
        Array.isArray(course.courses) &&
        course.courses.some(
          (courseName) => courseName.toLowerCase() === value.toLowerCase()
        )
    );

    if (matchingCourses.length > 0) {
      const matchingStudents = matchingCourses
        .map((course) =>
          studentData.find((student) => student.userId === course.userId)
        )
        .filter(Boolean);
      setFilteredStudent(matchingStudents);
    } else {
      setFilteredStudent([]);
    }
  };

  const handleChangeS = async (attends, student) => {
    const now = new Date();
    const formattedDate = formatDateTime(now);

    const attendanceData = {
      user_id: student.userId,
      user_name: student.username,
      course: selectedCourse,
      is_present: attends === "present",
      is_absent: attends === "absent",
      date: formattedDate,
    };

    try {
      const { data, error } = await supabase
        .from("attendance")
        .insert([attendanceData]);

      if (error) {
        message.error("Error inserting attendance");
      } else {
        messageApi.open({
          type: "success",
          content: "Attendance Added!",
        });
      }
    } catch (error) {
      console.error("Error inserting attendance:", error);
      messageApi.open({
        type: "error",
        content: "Unable to add attendance",
      });
    }
  };

  return (
    <div className="allAttend">
      {contextHolder}
      <Header title={"Attendance Sheet"} />
      <div className="selector">
        <img src={thoppi} alt="Class Hat" />
        <h2>Class:</h2>
        <Select
          defaultValue="select"
          style={{ width: 150 }}
          onChange={handleChange}
          options={[
            { value: "keyboard", label: "Keyboard" },
            { value: "guitar", label: "Guitar" },
            { value: "drums", label: "Drums" },
            { value: "vocals", label: "Vocals" },
          ]}
        />
        
      </div>
      {currentTime && (
          <div style={{ marginTop: "10px" }}>
            <p style={{ fontWeight: "bold" }}>⏰ Live Time: {currentTime}</p>
          </div>
        )}

      <div className="studentsList">
        {filteredStudent && filteredStudent.length > 0 ? (
          <div style={{ marginTop: "20px" }}>
            <h3>Students</h3>
            {filteredStudent
              .sort((a, b) => a.username.localeCompare(b.username))
              .map((student) => (
                <div className="student" key={student.userId}>
                  <div className="nameava">
                    <img className="ava" src={ava} alt="Avatar" />
                    <p className="stuname">
                      {truncate(student.username || "N/A", 18)}
                    </p>
                  </div>
                  <div className="buttons">
                    <Button onClick={() => handleChangeS("present", student)}>
                      Present
                    </Button>
                    <Button onClick={() => handleChangeS("absent", student)}>
                      Absent
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div style={{ marginTop: "20px" }}>
            <h3 className="sel">Select any Course</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllAttendance;
